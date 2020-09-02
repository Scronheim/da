<template>
  <v-container>
    <template v-slot:extension>
      <v-fab-transition>
        <v-btn
            color="pink"
            fab
            dark
            small
            absolute
            bottom
            left
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
    <v-row>
      <v-col v-for="artist in $store.getters.artists" :key="artist.id">
        <v-card max-width="400">
          <v-card-title>{{ artist.title }} ({{ artist.country }})</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="10" class="pr-0">
                <v-img :src="artist.pictures.bandPic" @click="openArtist(artist)"/>
              </v-col>
              <v-col>
                <v-btn icon link @click="openLink(artist.socials.facebook)"><v-icon>mdi-facebook</v-icon></v-btn>
                <v-btn icon link @click="openLink(artist.socials.instagram)"><v-icon>mdi-instagram</v-icon></v-btn>
                <v-btn icon link @click="openLink(artist.socials.youtube)"><v-icon>mdi-youtube</v-icon></v-btn>
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
  </v-container>
</template>

<script>
export default {
  name: 'Artists',
  mounted() {
    this.$axios.get(`${this.$store.state.apiUrl}/all`).then((response) => {
      this.$store.commit('setArtists', response.data.data);
    })
  },
  methods: {
    openLink(link) {
      window.open(link);
    },
    openArtist(artist) {
      this.$store.commit('setCurrentArtist', artist);
      this.$router.push(`/artists/${artist.title}`);
    }
  }
}
</script>

<style scoped>

</style>
