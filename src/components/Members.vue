<template>
  <v-card>
    <v-card-text>
      <v-list>
        <v-list-item v-for="m in band.currentLineUp" :key="m">
          <v-list-item-content>{{ m.name }} ({{ m.actions }})</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Members',
  props: ['band'],
  data: () => ({

  })
}
</script>

<style scoped>

</style>