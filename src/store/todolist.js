const state = {
  weatherData: null
};

const mutations = {
  setName(state, val) {
    state.user.name = val;
  },
  setUID(state, val) {
    state.user.uid = val;
  },
  setAccountType(state, val) {
    state.user.accountType = val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
