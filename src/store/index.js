import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000',
    artists: [],
    currentArtist: {},
    currentAlbum: {}
  },
  mutations: {
    setArtists(state, payload) {
      state.artists = payload;
    },
    setCurrentArtist(state, payload) {
      state.currentArtist = payload;
    },
    setCurrentAlbum(state, payload) {
      state.currentAlbum = payload;
    }
  },
  actions: {
  },
  getters: {
    artists(state) {
      return state.artists
    },
    getArtistByTitle: state => title => {
      return state.artists.find(x => x.title === title);
    },
    currentArtist(state) {
      return state.currentArtist;
    },
    currentAlbum(state) {
      return state.currentAlbum;
    }
  },
  modules: {
  }
})
