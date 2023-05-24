import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlistId: localStorage.getItem("playlistId") || 0,
    playSongId: localStorage.getItem("playSongId") || 0,
    playIndex: localStorage.getItem("playIndex") || 0,
    subscribeTime: 0,
    infoChangeTime: 0,
  },
  getters: {
    getPlaylistId(state) {
      return state.playlistId;
    },
    getPlaySongId(state) {
      return state.playSongId;
    },
    getPlayIndex(state) {
      return state.playIndex;
    },
    getSubscribeTime(state) {
      return state.subscribeTime;
    },
    getInfoChangeTime(state) {
      return state.infoChangeTime;
    },
  },
  mutations: {
    setPlayListId(state, binding) {
      localStorage.setItem("playlistId", binding);
      state.playlistId = binding;
    },
    setPlaySongId(state, binding) {
      localStorage.setItem("playSongId", binding);
      state.playSongId = binding;
    },
    setPlayIndex(state, binding) {
      localStorage.setItem("playIndex", binding);
      state.playIndex = binding;
    },
    setSubscribeTime(state, binding) {
      state.subscribeTime = binding;
    },
    setInfoChangeTime(state, binding) {
      state.infoChangeTime = binding;
    },
  },
  actions: {},
  modules: {},
});
