<template>
  <v-container>
    <breadcrumbs-menu/>
    <v-row>
      <v-col cols="3">
        <v-img :src="$store.state.currentAlbum.cover" width="400px"/>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field label="Album" v-model="$store.getters.currentAlbum.title" dense readonly/>
          </v-col>
          <v-col>
            <v-text-field label="Release date" v-model="$store.getters.currentAlbum.releaseDate" dense readonly/>
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
            Tracklist:
            <v-data-table :headers="headers" :items="$store.getters.currentAlbum.songs" hide-default-footer>
              <template v-slot:body="{ items }">
                <tbody>
                <tr v-for="(item, index) in items" :key="index">
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
  data: () => ({
    editDialog: false,
    editableSong: {},
    headers: [
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