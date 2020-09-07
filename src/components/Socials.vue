<template>
  <v-card>
    <v-card-text>
      <p v-for="(s, key) in socials" :key="key"><a :href="s" target="_blank">{{ key }}</a></p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Socials',
  props: ['socials']
}
</script>

<style scoped>

</style>