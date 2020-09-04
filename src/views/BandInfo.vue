<template>
  <v-container>
    <BreadcrumbsMenu/>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ $store.getters.currentBand.title }}<v-spacer/>Last update: {{ $store.getters.lastUpdateDateFormat }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-carousel cycle show-arrows-on-hover vertical height="300">
                  <v-carousel-item v-for="(link, i) in $store.getters.currentBand.pictures" :key="i" :src="link"/>
                </v-carousel>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                About: {{ $store.getters.currentBand.bio }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Country" v-model="$store.getters.currentBand.country" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Location" v-model="$store.getters.currentBand.location" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Status" v-model="$store.getters.currentBand.status"
                              :color="checkStatus"
                              dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Formed in" v-model="$store.getters.currentBand.formedIn" dense readonly/>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-text-field label="Genre(s)" v-model="$store.getters.currentBand.genre" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Lyric Themes" v-model="$store.getters.currentBand.lyricThemes" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Current Label" v-model="$store.getters.currentBand.label" dense readonly/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-tabs vertical>
                  <v-tab>
                    <v-icon left>mdi-disc</v-icon>
                    Discography
                  </v-tab>
                  <v-tab>
                    <v-icon left>mdi-account-group</v-icon>
                    Members
                  </v-tab>
                  <v-tab>
                    <v-icon left>mdi-pencil</v-icon>
                    Reviews
                  </v-tab>
                  <v-tab-item>
                    <Discography/>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card>
                      <v-card-text>
                        <Members :artist="$store.getters.currentBand"/>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card>
                      <v-card-text>

                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Discography from "@/components/Discography";
import Members from "@/components/Members";
import BreadcrumbsMenu from "@/components/BreadcrumbsMenu";
export default {
  name: 'ArtistInfo',
  components: {Discography, Members, BreadcrumbsMenu},
  mounted() {
    if (this.$store.getters.currentBand.title === undefined) {
      this.$axios.get(`${this.$store.state.apiUrl}/band/${this.$route.params.title}`).then((response) => {
        this.$store.commit('setCurrentBand', response.data.data[0]);
      })
    }
  },
  computed: {
    checkStatus() {
      if (this.$store.getters.currentBand.status === 'Active') {
        return 'success';
      } else if (this.$store.getters.currentBand.status === 'Hold on') {
        return 'yellow';
      } else if (this.$store.getters.currentBand.status === 'Split-up') {
        return 'red';
      } else if (this.$store.getters.currentBand.status === 'Changed name') {
        return 'blue';
      } else if (this.$store.getters.currentBand.status === 'Unknown') {
        return 'orange';
      }
      return 'primary';
    }
  },
  data: () => ({

  }),
}
</script>

<style scoped>

</style>