<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn text to="/artists">Artists</v-btn>
        <v-icon>mdi-arrow-right</v-icon>
        <template v-if="$route.params.title">
          <v-btn text :to="`/artists/${$route.params.title}`" :disabled="!$route.params.album">{{ $route.params.title }}</v-btn>
        </template>
        <template v-if="$route.path === '/artists/add'">
          <v-btn text disabled>Add artist</v-btn>
        </template>
        <template v-if="$route.params.album">
          <v-icon>mdi-arrow-right</v-icon>
          <v-btn disabled>{{ $route.params.album }} ({{ new Date($store.getters.currentAlbum.releaseDate).getFullYear() }})</v-btn>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BreadcrumbsMenu'
}
</script>

<style scoped>

</style>