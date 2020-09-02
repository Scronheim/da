<template>
  <v-container>
    <BreadcrumbsMenu/>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ $store.getters.currentArtist.title }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-carousel cycle show-arrows-on-hover vertical>
                  <v-carousel-item v-for="(link, i) in $store.getters.currentArtist.pictures" :key="i" :src="link"/>
                </v-carousel>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                About: {{ $store.getters.currentArtist.bio }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Country" v-model="$store.getters.currentArtist.country" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Location" v-model="$store.getters.currentArtist.location" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Status" v-model="$store.getters.currentArtist.status" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Formed in" v-model="$store.getters.currentArtist.formedIn" dense readonly/>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-text-field label="Genre(s)" v-model="$store.getters.currentArtist.genre" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Lyric Themes" v-model="$store.getters.currentArtist.lyricThemes" dense readonly/>
              </v-col>
              <v-col>
                <v-text-field label="Current Label" v-model="$store.getters.currentArtist.label" dense readonly/>
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
                    <Discography :artist="$store.getters.currentArtist"/>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card>
                      <v-card-text>
                        <Members :artist="$store.getters.currentArtist"/>
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
    if (this.$store.getters.currentArtist) {
      this.$axios.get(`${this.$store.state.apiUrl}/artist/${this.$route.params.title}`).then((response) => {
        this.$store.commit('setCurrentArtist', response.data.data[0]);
      })
    } else {
      console.log(2)
    }
  },
  data: () => ({

  }),

}
</script>

<style scoped>

</style>