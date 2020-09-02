<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn text :to="`/artists/${$route.params.title}`">{{ $route.params.title }}</v-btn>
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