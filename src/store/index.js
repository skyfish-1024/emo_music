import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlistId: localStorage.getItem("playlistId") || 0,
  },
  getters: {
    getPlaylistId(state) {
      return state.playlistId;
    },
  },
  mutations: {
    setPlaylistId(state, binding) {
      localStorage.setItem("playlistId", binding);
      state.playlistId = binding;
    },
  },
  actions: {},
  modules: {},
});
