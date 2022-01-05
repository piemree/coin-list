<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <FavoriteCoins :hideSearchBar="true" :hideTableFooter="true" />
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
  }),
  components: { News },
};
</script>
