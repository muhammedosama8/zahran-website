export const state = () => ({
  breadcrumb: {
    parent: null,
    title: ''
  }
})

export const getters = {
  breadcrumb: (state) => {
    return state.breadcrumb
  }
}

export const mutations = {
  SET_BREADCRUMB(state, item) {
    state.breadcrumb = item
  }
}

export const actions = {
  async update({ commit }, item) {
    await commit('SET_BREADCRUMB', item)
  }
}
