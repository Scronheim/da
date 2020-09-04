<template>
  <v-container>
    <breadcrumbs-menu/>
    <v-row>
      <v-col cols="3">
        <v-img :src="$store.state.currentAlbum.cover" width="400px">
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
        <v-row>
          <v-col>
            <v-text-field label="Album" v-model="$store.getters.currentAlbum.title" dense readonly/>
          </v-col>
          <v-col>
            <v-text-field label="Release date" v-model="$store.getters.releaseDateDateFormat" dense readonly/>
          </v-col>
          <v-col>
            <v-text-field label="Label" v-model="$store.getters.currentAlbum.label" dense readonly/>
          </v-col>
          <v-col>
            <v-text-field label="Format" v-model="$store.getters.currentAlbum.format" dense readonly/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4>Lineup:</h4>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Instruments</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in $store.getters.currentAlbum.lineUp" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.actions }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
            <h4>Tracklist:</h4>
            <v-data-table :headers="headers" :items="$store.getters.currentAlbum.songs" hide-default-footer
            sort-by="number" dense>
              <template v-slot:body="{ items }">
                <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td width="94">{{ item.number }}</td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.duration }}</td>
                  <td><v-btn icon @click="editAlbum(item)"><v-icon color="blue">mdi-pencil</v-icon></v-btn></td>
                </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="editDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline">Edit song "{{ editableSong.title}}"</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field v-model="editableSong.title" label="Title"/>
            </v-col>
            <v-col>
              <v-text-field v-model="editableSong.duration" label="Duration"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="editDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="editDialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import BreadcrumbsMenu from "@/components/BreadcrumbsMenu";
export default {
  name: 'AlbumInfo',
  components: {BreadcrumbsMenu},
  mounted() {
    if (this.$store.getters.currentArtist.title === undefined) {
      this.$axios.get(`${this.$store.state.apiUrl}/band/${this.$route.params.title}`).then((response) => {
        this.$store.commit('setCurrentArtist', response.data.data[0]);
        this.$store.commit('setCurrentAlbum', this.$_.find(this.$store.getters.currentArtist.discography, {title: this.$route.params.album}));
      });
    }
  },
  data: () => ({
    editDialog: false,
    editableSong: {},
    headers: [
      { text: 'Number', value: 'number' },
      { text: 'Title', value: 'title' },
      { text: 'Duration', value: 'duration' },
      { text: 'Actions', sortable: false },
    ]
  }),
  methods: {
    editAlbum(album) {
      this.editableSong = {};
      Object.assign(this.editableSong, album);
      this.editDialog = true;
    }
  }
}
</script>

<style scoped>

</style>