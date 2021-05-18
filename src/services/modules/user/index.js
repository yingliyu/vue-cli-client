import { AppGet, AppPost } from '@/utils/request'

// 获取用户信息
export function getUserInfo(data) {
  return AppGet('/xxx/xxx', data)
}
export function login(data) {
  return AppPost('/xxx/xxx', data)
}

// 修改密码
export function changePwd(data) {
  return AppPost('/xxx/xxx', data)
}
