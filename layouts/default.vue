<template>
  <v-app>
    <v-app-bar fixed app :elevation="0">
      <NuxtLink style="text-decoration: none" class="black--text" to="/">
        <v-toolbar-title v-text="title"
      /></NuxtLink>
      <NuxtLink
        style="text-decoration: none"
        class="black--text ml-4 mt-1"
        to="/coins"
      >
        Coin List</NuxtLink
      >
      <NuxtLink
        style="text-decoration: none"
        class="black--text ml-4 mt-1"
        to="/favorites"
      >
        Favorites</NuxtLink
      >

      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      fixed: false,
      title: "Crypto App",
    };
  },
};
</script>
