import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000',
    artists: [],
    currentArtist: {},
    currentAlbum: {},
    countries: [],
    statuses: ['Active', 'Split-up', 'Hold on', 'Changed name', 'Unknown'],
    years: [],
    albumTypes: ['Demo', 'Split', 'Full length', 'EP', 'Single', 'Compilation', 'Video', 'Live album']
  },
  mutations: {
    fillYears(state) {
      let currentYear = new Date().getFullYear(), years = [];
      let startYear = 1970;
      while ( startYear <= currentYear ) {
        years.push(startYear++);
      }
      years.reverse();
      state.years = years;
    },
    setArtists(state, payload) {
      state.artists = payload;
    },
    setCurrentArtist(state, payload) {
      state.currentArtist = payload;
    },
    setCurrentAlbum(state, payload) {
      state.currentAlbum = payload;
    },
    setCountries(state, payload) {
      state.countries = payload;
    },
    addNewAlbum(state, payload) {
      state.currentArtist.discography.push(payload);
    }
  },
  actions: {
    async saveCurrentArtist(context, payload) {
      context.commit('addNewAlbum', payload);
      await axios.patch(`${context.state.apiUrl}/artist/save`, context.state.currentArtist);
    }
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
    },
    getCountries(state) {
      return state.countries;
    },
    getStatuses(state) {
      return state.statuses;
    },
    getYears(state) {
      return state.years;
    },
    getAlbumTypes(state) {
      return state.albumTypes;
    }
  },
  modules: {
  }
});
