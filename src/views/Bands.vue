<template>
  <v-container>
    <v-row v-for="(chunk, index) in $store.getters.chunks" :key="index">
      <v-col v-for="band in chunk" :key="band._id">
        <album-preview :band="band"/>
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
    if (this.$store.state.bands.length === 0) {
      this.$store.dispatch('getBands');
    }
  },
  data: () => ({
    fab: false,
    itemsPerRow: 4
  }),
  methods: {
    openLink(link) {
      window.open(link);
    },
    openArtist(artist) {
      this.$store.commit('setCurrentBand', artist);
      this.$router.push(`/bands/${artist.title}`);
    }
  }
}
</script>

<style scoped>

</style>
