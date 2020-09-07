<template>
  <v-container>
    <BreadcrumbsMenu/>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ $store.getters.currentBand.title }}<v-spacer/>Last update: {{ $store.getters.lastUpdateDateFormat }}</v-card-title>
          <v-card-text>
            <v-btn absolute fab top right small color="info" @click="showEditDialog">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
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
    <v-dialog v-model="editDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>Edit band "{{ band.title }}"</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="Band name" v-model="band.title"/>
            </v-col>
            <v-col>
              <v-select label="Country" :items="$store.getters.getCountries" v-model="band.country"/>
            </v-col>
            <v-col>
              <v-text-field label="Location" v-model="band.location"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-select label="Status" :items="$store.getters.getStatuses" v-model="band.status"/>
            </v-col>
            <v-col cols="2">
              <v-select label="Formed in" :items="$store.getters.getYears" v-model="band.formedIn"/>
            </v-col>
            <v-col>
              <v-text-field label="Genre(s)" v-model="band.genre"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Lyric themes" v-model="band.lyricThemes"/>
            </v-col>
            <v-col>
              <v-text-field label="Current label" v-model="band.label"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Logo pic" v-model="band.pictures.logo"/>
            </v-col>
            <v-col>
              <v-text-field label="Band pic" v-model="band.pictures.bandPic"/>
            </v-col>
          </v-row>
          <h4>Socials</h4>
          <v-row>
            <v-col>
              <v-text-field label="Facebook" v-model="band.socials.facebook"/>
            </v-col>
            <v-col>
              <v-text-field label="Twitter" v-model="band.socials.twitter"/>
            </v-col>
            <v-col>
              <v-text-field label="Instagram" v-model="band.socials.instagram"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="YouTube" v-model="band.socials.youtube"/>
            </v-col>
            <v-col>
              <v-text-field label="Bandcamp" v-model="band.socials.bandcamp"/>
            </v-col>
            <v-col>
              <v-text-field label="Official site" v-model="band.socials.officialSite"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field label="Vk" v-model="band.socials.vk"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="editDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="saveBand" :loading="savingBand">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Discography from "@/components/Discography";
import Members from "@/components/Members";
import BreadcrumbsMenu from "@/components/BreadcrumbsMenu";

export default {
  name: 'BandInfo',
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
    editDialog: false,
    savingBand: false,
    band: {
      pictures: {},
      socials: {}
    }
  }),
  methods: {
    showEditDialog() {
      Object.assign(this.band, this.$store.getters.currentBand);
      this.editDialog = true;
    },
    saveBand() {
      this.savingBand = true;
      let payload = {
        type: '',
        payload: this.band
      };
      this.$store.commit('setCurrentBand', this.band);
      this.$store.dispatch('saveCurrentBand', payload).then(() => {
        this.savingBand = false;
        this.editDialog = false;
      });
    }
  }
}
</script>

<style scoped>

</style>