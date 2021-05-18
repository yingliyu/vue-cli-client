import { userApi } from '@/services'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/routers'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const data = await userApi.login({ username: username.trim(), password: password })
      commit('SET_TOKEN', data.token)
      setToken(data.token)
    } catch (error) {
      console.log(error)
    }
  },

  // get user info
  getInfo({ commit, state }) {
    const data = userApi.getInfo(state.token)
    if (!data) {
      console.log('Verification failed, please Login again.')
    }

    const { roles, name, avatar, introduction } = data

    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      console.log('getInfo: roles must be a non-null array!')
    }
    commit('SET_ROLES', roles)
    commit('SET_NAME', name)
    commit('SET_AVATAR', avatar)
    commit('SET_INTRODUCTION', introduction)
  },

  // user logout
  async logout({ commit, state, dispatch }) {
    try {
      await userApi.logout(state.token)
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
    } catch (error) {
      console.log(error)
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getInfo')
    resetRouter()
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)
    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
