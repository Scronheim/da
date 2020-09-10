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
    bandsCount: 0,
    currentBand: {},
    currentAlbum: {
      lineUp: []
    },
    countries: [],
    genres: [],
    statuses: ['Active', 'Split-up', 'Hold on', 'Changed name', 'Unknown'],
    years: [],
    albumTypes: ['Demo', 'Split', 'Full length', 'EP', 'Single', 'Compilation', 'Video', 'Live album'],
    search: '',
    itemsPerRow: 4,
    itemsPerPage: 8,
    pageCount: 0
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
    setGenres(state, payload) {
      state.genres = payload;
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
      let index = _.findIndex(state.currentBand.discography, {title: payload.title});
      if (index > -1) {
        state.currentBand.discography[index] = payload;
      } else {
        state.currentBand.discography.push(payload);
      }
    },
    setItemsPerPage(state, payload) {
      state.itemsPerPage = payload;
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
        context.state.pageCount = response.data.pageCount;
        context.state.bandsCount = response.data.itemCount;
      });
    },
    searchBandByCountry(context, payload) {
      axios.get(`${context.state.apiUrl}/band/search?country=${payload}`).then((response) => {
        context.commit('setBands', response.data.data);
        context.state.pageCount = response.data.pageCount;
        context.state.bandsCount = response.data.itemCount;
      });
    },
    searchBandByGenre(context, payload) {
      axios.get(`${context.state.apiUrl}/band/search?genre=${payload}`).then((response) => {
        context.commit('setBands', response.data.data);
        context.state.pageCount = response.data.pageCount;
        context.state.bandsCount = response.data.itemCount;
      });
    },
    getBands(context) {
      axios.get(`${context.state.apiUrl}/all?limit=1000000`).then((response) => {
        context.commit('setBands', response.data.data);
        context.state.pageCount = response.data.pageCount;
        context.state.bandsCount = response.data.itemCount;
      });
    },
    getLastBandsPage(context) {
      axios.get(`${context.state.apiUrl}/all?page=1&limit=${context.state.itemsPerPage}`).then((response) => {
        context.commit('setBands', response.data.data);
        context.state.pageCount = response.data.pageCount;
        context.state.bandsCount = response.data.itemCount;
      });
    },
    getCountries(context) {
      axios.get(`${context.state.apiUrl}/countries`).then((response) => {
        context.commit('setCountries', response.data.data);
      })
    },
    getGenres(context) {
      axios.get(`${context.state.apiUrl}/genres`).then((response) => {
        context.commit('setGenres', response.data.data);
      })
    },
    getSpecificPage(context, payload) {
      axios.get(`${context.state.apiUrl}/all?page=${payload.page}&limit=${context.state.itemsPerPage}`).then((response) => {
        context.commit('setBands', response.data.data);
        context.state.pageCount = response.data.pageCount;
        context.state.bandsCount = response.data.itemCount;
      });
    },
    getLast8Bands(context) {
      axios.get(`${context.state.apiUrl}/band/last8Bands`).then((response) => {
        context.commit('setBands', response.data.data);
      });
    },
    updateCurrentBand(context) {
      axios.get(`${context.state.apiUrl}/band/${context.state.currentBand.title}`).then((response) => {
        context.commit('setCurrentBand', response.data.data[0]);
      });
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
    genres(state) {
      return state.genres;
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
