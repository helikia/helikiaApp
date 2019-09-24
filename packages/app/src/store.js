import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      establishementSelectedId: {}
    }
  },
  mutations: {
    establishementSelected (state, payload) {
      state.establishementSelectedId = payload.id;
    }
  },
  actions: {

  },
});
