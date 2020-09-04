<template>
  <v-container>
    <breadcrumbs-menu/>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Add new artist</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field label="Title" v-model="artist.title"/>
              </v-col>
              <v-col>
                <v-select label="Country" :items="$store.getters.getCountries" v-model="artist.country"/>
              </v-col>
              <v-col>
                <v-text-field label="Location" v-model="artist.location"/>
              </v-col>
              <v-col>
                <v-select label="Status" :items="$store.getters.getStatuses" v-model="artist.status"/>
              </v-col>
              <v-col>
                <v-select label="Formed in" :items="$store.getters.getYears" v-model="artist.formedIn"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Genre(s)" v-model="artist.genre"/>
              </v-col>
              <v-col>
                <v-text-field label="Lyric Themes" v-model="artist.lyricThemes"/>
              </v-col>
              <v-col>
                <v-text-field label="Current label" v-model="artist.label"/>
              </v-col>
              <v-col>
                <v-text-field label="Logo link" v-model="artist.pictures.logo"/>
              </v-col>
              <v-col>
                <v-text-field label="Band photo link" v-model="artist.pictures.bandPic"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Facebook" v-model="artist.socials.facebook"/>
              </v-col>
              <v-col>
                <v-text-field label="Instagram" v-model="artist.socials.instagram"/>
              </v-col>
              <v-col>
                <v-text-field label="Twitter" v-model="artist.socials.twitter"/>
              </v-col>
              <v-col>
                <v-text-field label="YouTube" v-model="artist.socials.youtube"/>
              </v-col>
              <v-col>
                <v-text-field label="Official site" v-model="artist.socials.officialSite"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Url" v-model="url"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-btn color="success" @click="addBand">Add</v-btn>
                <v-btn color="success" @click="parseBand">Parse</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar top right :color="snackColor" v-model="snack">{{ snackMessage }}</v-snackbar>
  </v-container>
</template>

<script>
import BreadcrumbsMenu from "@/components/BreadcrumbsMenu";

export default {
  name: 'AddArtist',
  components: {BreadcrumbsMenu},
  data: () => ({
    url: '',
    artist: {
      bio: '',
      pictures: {
        logo: '',
        bandPic: ''
      },
      createdAt: new Date(),
      updatedAt: '',
      socials: {
        facebook: '',
        twitter: '',
        youtube: '',
        instagram: '',
        officialSite: ''
      },
    },
    snack: false,
    snackColor: '',
    snackMessage: ''
  }),
  methods: {
    parseBand() {
      let payload = {
        url: this.url
      }
      this.$axios.post(`${this.$store.state.apiUrl}/parseBand`, payload);
    },
    addBand() {
      this.$axios.post(`${this.$store.state.apiUrl}/band/add`, this.artist).then((response) => {
        if (response.data.success) {
          this.snackColor = 'success';
        } else {
          this.snackColor = 'warning';
        }
        this.snackMessage = response.data.message;
        this.snack = true;
      })
    }
  }
}
</script>

<style scoped>

</style>