<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="9">
      <p v-if="favs.length <= 0">
        It seems you don't have a favorite coin. You can view all coins
        <a @click="$router.push('coins')">here.</a>
      </p>
      <FavoriteCoins
        v-show="favs.length > 0"
        :hideSearchBar="true"
        :showTableTitle="false"
      />
      <News :news="news" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import News from "~/components/News.vue";
export default {
  created() {
    if (process.client) {
      this.$store.dispatch("news/getNews");
    }
  },
  computed: mapState({
    news: (state) => state.news.news,
    favs: (state) => state.favorites.favs,
  }),
  components: { News },
};
</script>
