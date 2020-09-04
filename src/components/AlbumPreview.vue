<template>
  <v-card max-width="420">
    <v-card-title><a @click="openBand(band)">{{ band.title }} ({{ band.country }})</a></v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="10" class="pr-0">
          <v-img :src="band.pictures.bandPic" width="400" height="200" @click="openBand(band)" style="cursor: pointer">
            <template v-slot:placeholder>
              <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col>
          <v-btn v-if="band.socials.facebook" icon link @click="openLink(band.socials.facebook)"><v-icon>mdi-facebook</v-icon></v-btn>
          <v-btn v-if="band.socials.instagram" icon link @click="openLink(band.socials.instagram)"><v-icon>mdi-instagram</v-icon></v-btn>
          <v-btn v-if="band.socials.youtube" icon link @click="openLink(band.socials.youtube)"><v-icon>mdi-youtube</v-icon></v-btn>
          <v-btn v-if="band.socials.twitter" icon link @click="openLink(band.socials.twitter)"><v-icon>mdi-twitter</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Formed in: {{ band.formedIn }} | Genre(s): {{ band.genre }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AlbumPreview',
  props: ['band'],
  methods: {
    openLink(link) {
      window.open(link);
    },
    openBand(band) {
      this.$store.commit('setCurrentBand', band);
      this.$router.push(`/bands/${band.title}`);
    }
  }
}
</script>

<style scoped>

</style>