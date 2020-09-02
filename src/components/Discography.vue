<template>
  <v-card>
    <v-card-text>
      <v-data-table :headers="headers" :items="artist.discography" hide-default-footer>
        <template v-slot:body="{ items }">
          <tbody>
          <tr v-for="(item, index) in items" :key="index" style="cursor: pointer" @click.prevent="openAlbum(item)">
            <td>{{ item.title }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.releaseDate }}</td>
            <td>{{ item.label }}</td>
            <td><v-btn icon @click="editAlbum(item)"><v-icon color="blue">mdi-pencil</v-icon></v-btn></td>
          </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-dialog v-model="editDialog" persistent max-width="50%">
        <v-card>
          <v-card-title class="headline">Edit album "{{ editableAlbum.title}}"</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field v-model="editableAlbum.title" label="Title"/>
              </v-col>
              <v-col>
                <v-select :items="['Full-Length', 'EP', 'Demo', 'Single', 'Split', 'Compilation', 'Live album']"
                v-model="editableAlbum.type" label="Type"/>
              </v-col>
              <v-col>
                <v-text-field type="date" v-model="editableAlbum.releaseDate" label="Release date"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="editableAlbum.label" label="Label"/>
              </v-col>
              <v-col>
                <v-text-field v-model="editableAlbum.format" label="Format"/>
              </v-col>
              <v-col>
                <v-text-field v-model="editableAlbum.duration" label="Duration"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="editableAlbum.cover" label="Cover"/>
              </v-col>
              <v-col>
                <v-text-field v-model="editableAlbum.comment" label="Comment"/>
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Discography',
  props: ['artist'],
  data: () => ({
    editDialog: false,
    editableAlbum: {},
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'title',
      },
      { text: 'Type', value: 'type' },
      { text: 'Release date', value: 'releaseDate' },
      { text: 'Label', value: 'label' },
      { text: 'Actions', sortable: false},
    ],
  }),
  methods: {
    editAlbum(album) {
      this.editableAlbum = {};
      Object.assign(this.editableAlbum, album);
      this.editDialog = true;
    },
    openAlbum(album) {
      this.$store.commit('setCurrentAlbum', album);
      this.$router.push(`./${this.artist.title}/${album.title}`);
    }
  }
}
</script>

<style scoped>

</style>