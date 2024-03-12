import Cookie from 'js-cookie'
export const state = () => ({
  permissions: []
})

export const getters = {
  permissions(state) {
    return state.permissions
  }
}

export const mutations = {
  setPermissions(state, permissions) {
    return (state.permissions = permissions)
  },
  clearPermissions(state) {
    state.permissions = []
  }
}

export const actions = {
  async userPermissions({ commit }, context) {
    try {
      const { data: user } = await this.$axios.$get('/user')
      commit('setPermissions', user.permissions)
      Cookie.set('userPermissions', user.permissions)
    } catch (e) {}
  },
  initAuth({ commit }, req) {
    let permissions = []
    if (req) {
      if (!req.headers.cookie) return
      const permissionsCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('userPermissions='))
      if (!permissionsCookie) return
      permissions = decodeURIComponent(permissionsCookie.split('=')[1])
    } else {
      permissions = localStorage.getItem('userPermissions').split(',')
    }
    commit('setPermissions', permissions)
  }
}
