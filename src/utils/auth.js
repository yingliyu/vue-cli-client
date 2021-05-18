// 对Cookie的操作
// 这里没有写过期时间，所以Cookie的有效期都是Session，一旦关闭浏览器就过期

import Cookies from 'js-cookie'

const TokenKey = process.env.VUE_APP_TOKEN_KEY

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expire) {
  if (!expire) {
    return Cookies.set(TokenKey, token)
  } else {
    return Cookies.set(TokenKey, token, { expires: expire })
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 登录进来设置logined
export function getCookie(key) {
  return Cookies.get(key)
}

export function setCookie(key, val) {
  return Cookies.set(key, val)
}

export function removeCookie(key) {
  return Cookies.remove(key)
}
