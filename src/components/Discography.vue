<template>
  <v-card>
    <v-card-text>
      <v-btn absolute fab top right small color="success" @click="showAddDialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-data-table :headers="headers" :items="$store.getters.currentArtist.discography"
                    hide-default-footer :items-per-page="-1" sort-by="releaseDate" sort-desc height="400">
        <template v-slot:body="{ items }">
          <tbody>
          <tr v-for="(item, index) in items" :key="index" style="cursor: pointer" @click="openAlbum(item)"
              :style="checkType(item.type)">
            <td style="font-size: inherit">{{ item.title }}</td>
            <td>{{ item.type }}</td>
            <td>{{ new Date(item.releaseDate).getFullYear() }}</td>
            <td>{{ item.label }}</td>
            <td><v-btn icon @click.stop="showEditDialog(item)"><v-icon color="blue">mdi-pencil</v-icon></v-btn></td>
          </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-dialog v-model="editDialog" persistent max-width="50%">
        <v-card>
          <v-card-title class="headline">Edit album "{{ editableAlbum.payload.title}}"</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field v-model="editableAlbum.payload.title" label="Title"/>
              </v-col>
              <v-col>
                <v-select :items="['Full-Length', 'EP', 'Demo', 'Single', 'Split', 'Compilation', 'Live album']"
                          v-model="editableAlbum.payload.type" label="Type"/>
              </v-col>
              <v-col>
                <v-text-field type="date" v-model="editableAlbum.payload.releaseDate" label="Release date"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="editableAlbum.payload.label" label="Label"/>
              </v-col>
              <v-col>
                <v-text-field v-model="editableAlbum.payload.format" label="Format"/>
              </v-col>
              <v-col>
                <v-text-field v-model="editableAlbum.payload.duration" label="Duration"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="editableAlbum.payload.cover" label="Cover"/>
              </v-col>
              <v-col>
                <v-text-field v-model="editableAlbum.payload.comment" label="Comment"/>
              </v-col>
            </v-row>
            <h4>Songs<v-btn color="success" small icon @click="addSong"><v-icon>mdi-plus</v-icon></v-btn></h4>
            <v-row justify="center">
              <v-data-table :items="editableAlbum.payload.songs" :headers="songHeaders" hide-default-footer>
                <template v-slot:body="{ items, headers }">
                  <tbody>
                  <tr v-for="(item,idx) in items" :key="idx">
                    <td v-for="(header,key) in headers" :key="key">
                      <template v-if="header.text === 'Actions'">
                        <v-btn icon small color="red" @click="removeSong(idx)"><v-icon>mdi-minus</v-icon></v-btn>
                      </template>
                      <template v-else>
                        <v-edit-dialog
                            :return-value.sync="item[header.value]"
                            @save="save"
                            large v-if="header.text !== 'Actions'"
                        > {{item[header.value]}}
                          <template v-slot:input>
                            <v-text-field
                                v-model="item[header.value]"
                                label="Edit"
                                single-line
                            ></v-text-field>
                          </template>
                        </v-edit-dialog>
                      </template>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="editDialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="editAlbum">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Discography',
  data: () => ({
    max25chars: v => v.length <= 25 || 'Input too long!',
    editDialog: false,
    editableAlbum: {
      type: 'album',
      payload: {
        songs: [],
        lineUp: []
      }
    },
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'title',
      },
      { text: 'Type', value: 'type' },
      { text: 'Year', value: 'releaseDate' },
      { text: 'Label', value: 'label' },
      { text: 'Actions', sortable: false},
    ],
    songHeaders: [
      {text: 'Number', value: 'number'},
      {text: 'Title', sortable: true, value: 'title'},
      {text: 'Duration', value: 'duration', sortable: false},
      {text: 'Actions', sortable: false}
    ]
  }),
  methods: {
    checkType(type) {
      switch (type) {
        case 'Full-length':
          return 'font-weight:bold';
        case 'Single':
          return 'font-size:10pt';
        case 'Demo':
          return 'font-size:11pt';
        case 'EP':
          return 'font-size:12pt';
      }
    },
    save() {
      this.$store.dispatch('saveCurrentArtist', this.editableAlbum);
    },
    showEditDialog(album) {
      this.editableAlbum = {
        type: 'album',
        payload: {
          songs: [],
          lineUp: []
        }
      };
      Object.assign(this.editableAlbum.payload, album);
      this.editDialog = true;
    },
    showAddDialog() {
      this.editableAlbum = {
        type: 'album',
        payload: {
          songs: [],
          lineUp: []
        }
      };
      this.editDialog = true;
    },
    openAlbum(album) {
      this.$store.commit('setCurrentAlbum', album);
      this.$router.push(`./${this.$store.state.currentBand.title}/${album.title}`);
    },
    editAlbum() {
      this.$store.dispatch('saveCurrentArtist', this.editableAlbum);
      this.editDialog = false;
    },
    addSong() {
      this.editableAlbum.payload.songs.push({
        title: '',
        number: this.editableAlbum.payload.songs.length+1,
        duration: ''
      });
    },
    removeSong(index) {
      this.editableAlbum.payload.songs.splice(index, 1);
    }
  }
}
</script>

<style scoped>

</style>