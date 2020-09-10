<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-select label="Sort by country" :items="$store.getters.getCountries" item-text="name" @change="searchByCountry" dense clearable/>
      </v-col>
      <v-col cols="2">
        <v-select label="Sort by genre" :items="$store.getters.genres" item-text="title" @change="searchByGenre" dense clearable/>
      </v-col>
      <v-col align="right">
        Total bands: {{ $store.state.bandsCount }}
      </v-col>
      <v-col cols="1">
        <v-select label="Bands per page" :items="[8, 16, 24]" v-model.number="itemsPerPage" @change="changeItemPerPage" dense/>
      </v-col>
    </v-row>
    <template v-if="$store.getters.chunks.length > 0">
      <v-row v-for="(chunk, index) in $store.getters.chunks" :key="index">
        <v-col v-for="band in chunk" :key="band._id">
          <album-preview :band="band"/>
        </v-col>
      </v-row>
    </template>
    <v-row>
      <v-col align="center">
        <v-pagination v-model="page" @input="setPage" :length="$store.state.pageCount" :total-visible="7"/>
      </v-col>
    </v-row>
    <v-btn fab dark large color="success" fixed right bottom class="mt-13" to="/bands/add">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import AlbumPreview from "@/components/AlbumPreview";

export default {
  name: 'Artists',
  components: {AlbumPreview},
  mounted() {
    this.$store.dispatch('getLastBandsPage');
    this.itemsPerPage = this.$store.state.itemsPerPage;
  },
  data: () => ({
    fab: false,
    page: 1,
    itemsPerPage: 8
  }),
  methods: {
    openLink(link) {
      window.open(link);
    },
    setPage(page) {
      this.page = page;
      this.$store.dispatch('getSpecificPage', {page: this.page});
    },
    changeItemPerPage() {
      this.$store.commit('setItemsPerPage', this.itemsPerPage);
      this.$store.dispatch('getSpecificPage', {page: this.page});
    },
    searchByCountry(country) {
      if (country !== undefined) {
        this.$store.dispatch('searchBandByCountry', country);
      } else {
        this.$store.dispatch('getSpecificPage', {page: this.page});
      }
    },
    searchByGenre(genre) {
      if (genre) {
        this.$store.dispatch('searchBandByGenre', genre);
      } else {
        this.$store.dispatch('getSpecificPage', {page: this.page});
      }
    }
  }
}
</script>

<style scoped>

</style>
