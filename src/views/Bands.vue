<template>
  <v-container>
    <v-row v-for="(chunk, index) in chunks" :key="index">
      <v-col v-for="artist in chunk" :key="artist.id">
        <v-card max-width="420">
          <v-card-title><a @click="openArtist(artist)">{{ artist.title }} ({{ artist.country }})</a></v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="10" class="pr-0">
                <v-img :src="artist.pictures.bandPic" width="400" height="200" @click="openArtist(artist)" style="cursor: pointer"/>
              </v-col>
              <v-col>
                <v-btn v-if="artist.socials.facebook" icon link @click="openLink(artist.socials.facebook)"><v-icon>mdi-facebook</v-icon></v-btn>
                <v-btn v-if="artist.socials.instagram" icon link @click="openLink(artist.socials.instagram)"><v-icon>mdi-instagram</v-icon></v-btn>
                <v-btn v-if="artist.socials.youtube" icon link @click="openLink(artist.socials.youtube)"><v-icon>mdi-youtube</v-icon></v-btn>
                <v-btn v-if="artist.socials.twitter" icon link @click="openLink(artist.socials.twitter)"><v-icon>mdi-twitter</v-icon></v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Formed in: {{ artist.formedIn }} | Genre(s): {{ artist.genre }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn fab dark large color="success" fixed right bottom class="mt-13" to="/artists/add">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Artists',
  mounted() {
    if (this.$store.state.bands.length === 0) {
      this.$store.dispatch('getBands');
    }
  },
  computed: {
    chunks() {
      return this.$_.chunk(Object.values(this.$store.getters.artists), this.itemsPerRow);
    },
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
      this.$store.commit('setCurrentArtist', artist);
      this.$router.push(`/bands/${artist.title}`);
    }
  }
}
</script>

<style scoped>

</style>
