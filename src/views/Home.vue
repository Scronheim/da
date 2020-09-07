<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card-title>Recently added</v-card-title>
        <v-row v-for="(chunk, index) in $store.getters.chunks" :key="index">
          <v-col v-for="band in chunk" :key="band._id">
            <album-preview :band="band"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import AlbumPreview from "@/components/AlbumPreview";
export default {
  name: 'Home',
  components: {AlbumPreview},
  mounted() {
    this.$store.dispatch('getLast8Bands');
  }
}
</script>
