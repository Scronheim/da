<template>
  <v-app>
    <v-navigation-drawer v-model="menuVisible" app temporary>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/bands">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Artists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-action>
            <v-icon>mdi-help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-container>
        <v-row>
          <v-app-bar-nav-icon @click.stop="menuVisible = !menuVisible"></v-app-bar-nav-icon>
          <div class="d-flex align-center">
            <v-img alt="Vuetify Logo"
                   class="shrink mr-2"
                   contain
                   src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                   transition="scale-transition"
                   width="40"
            />
          </div>
          <v-text-field solo-inverted hide-details label="Search" prepend-inner-icon="mdi-magnify" v-model="search"
                        @keydown.enter="setSearch" clearable @click:clear="clearSearch"/>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$vuetify.theme.dark = true;
    this.$store.commit('fillYears');
    this.$axios.get(`${this.$store.state.apiUrl}/countries`).then((response) => {
      this.$store.commit('setCountries', response.data.data[0].countries);
    })
  },
  data: () => ({
    menuVisible: false,
    search: ''
  }),
  methods: {
    setSearch() {
      this.$store.dispatch('searchBand', this.search).then(() => {
        if (this.$route.path !== '/bands') {
          this.$router.push('/bands');
        }
      })
    },
    clearSearch() {
      this.$store.dispatch('getBands');
    }
  }
};
</script>
