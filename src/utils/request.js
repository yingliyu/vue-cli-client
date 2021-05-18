import instance from './axios'
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import { removeToken } from '@/utils/auth'
const CancelToken = axios.CancelToken

let sources = []

export function AppPost(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        // 取消请求
        cancelToken: new CancelToken((c) => {
          // An executor function receives a cancel function as a parameter
          sources.push(c)
        })
      })
      .then((res) => {
        if (res.data.code === '200') {
          resolve(res.data.data)
        } else if (res.data.code === '403') {
          removeToken()
          reject(res.data.msg)
          location.reload()
        } else {
          reject(res.data.msg)
        }
      })
      .catch((err) => {
        Message.error({
          message: err,
          duration: 2000
        })
        reject(err)
      })
  })
}

export function AppGet(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .get(
        url,
        {
          params: {
            ...data
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { indices: false })
          }
        },
        {
          cancelToken: new CancelToken((c) => {
            sources.push(c)
          })
        }
      )
      .then((res) => {
        if (res.data.code === '200') {
          resolve(res.data.data)
        } else if (res.data.code === '403') {
          // alert('删除前token===' + getToken())
          removeToken()
          // alert('after del token===' + getToken())

          reject(res.data.msg)
          location.reload()
        } else {
          reject(res.data.msg)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function AppDownload(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        responseType: 'blob'
      })
      .then((res) => {
        if (res && res.status !== '200') {
          reject(new Error(`下载失败`))
        } else {
          let url = window.URL.createObjectURL(new Blob([res.data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          let filename = data.filename || `${new Date() - 0}.xlsx`
          try {
            filename = decodeURI(
              res.headers['content-disposition'].split(';')[1].split('filename=')[1]
            )
          } catch (e) {}

          link.setAttribute('download', filename)

          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(url.href)
          document.body.removeChild(link)
          resolve()
        }
      })
      .catch(() => {
        Message.error({
          message: 'download failed',
          duration: 2000
        })
      })
  })
}

export function AppGetPic(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        responseType: 'blob'
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function AppPostUpload(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        onUploadProgress: (progressEvent) => {
          // let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
          // 调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
          // uploader.onProgress({ percent: percent })
        },
        // 取消请求
        cancelToken: new CancelToken((c) => {
          // An executor function receives a cancel function as a parameter
          sources.push(c)
        })
      })
      .then((res) => {
        if (res.data.code === '200') {
          resolve(res.data.data)
        } else {
          reject(res.data.msg)
        }
      })
      .catch((err) => {
        Message.error({
          message: err,
          duration: 2000
        })
        reject(err)
      })
  })
}

export { sources }
