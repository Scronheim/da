import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000',
    bands: [],
    currentBand: {},
    currentAlbum: {},
    countries: [],
    statuses: ['Active', 'Split-up', 'Hold on', 'Changed name', 'Unknown'],
    years: [],
    albumTypes: ['Demo', 'Split', 'Full length', 'EP', 'Single', 'Compilation', 'Video', 'Live album'],
    search: '',
    itemsPerRow: 4
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
    setBands(state, payload) {
      state.bands = payload;
    },
    setCurrentBand(state, payload) {
      state.currentBand = payload;
    },
    setCurrentAlbum(state, payload) {
      state.currentAlbum = payload;
    },
    setCountries(state, payload) {
      state.countries = payload;
    },
    addNewAlbum(state, payload) {
      state.currentBand.discography.push(payload);
    },
    editAlbum(state, payload) {
      let index = _.findIndex(state.currentBand.discography, {title: payload.title, type: payload.type});
      if (index > -1) {
        state.currentBand.discography[index] = payload;
      } else {
        state.currentBand.discography.push(payload);
      }
    }
  },
  actions: {
    async saveCurrentBand(context, payload) {
      /*
        @payload: {
          type: String,
          payload: Object
        }
      */
      if (payload.type === 'album') {
        context.commit('editAlbum', payload.payload);
      }
      context.state.currentBand.updatedAt = new Date();
      return await axios.patch(`${context.state.apiUrl}/band/save`, context.state.currentBand);
    },
    searchBand(context, payload) {
      axios.get(`${context.state.apiUrl}/band/search?q=${payload}`).then((response) => {
        context.commit('setBands', response.data.data);
      })
    },
    getBands(context) {
      axios.get(`${context.state.apiUrl}/all`).then((response) => {
        context.commit('setBands', response.data.data);
      })
    },
    getLastTenBands(context) {
      axios.get(`${context.state.apiUrl}/getLastTenBands`).then((response) => {
        context.commit('setBands', response.data.data);
      })
    },
    updateCurrentBand(context) {
      axios.get(`${context.state.apiUrl}/band/${context.state.currentBand.title}`).then((response) => {
        context.commit('setCurrentBand', response.data.data[0]);
      })
    }
  },
  getters: {
    artists(state) {
      return state.bands;
    },
    getArtistByTitle: state => title => {
      return state.bands.find(x => x.title === title);
    },
    currentBand(state) {
      return state.currentBand;
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
    },
    lastUpdateDateFormat(state) {
      return moment(state.currentBand.updatedAt).format('DD MMM YYYY HH:mm:ss');
    },
    releaseDateDateFormat(state) {
      return moment(state.currentAlbum.releaseDate).format('DD.MM.YYYY');
    },
    chunks(state) {
      return _.chunk(Object.values(state.bands), state.itemsPerRow);
    },
  },
  modules: {
  }
});
