<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="6" lg="9">
      <FavoriteCoins :hideSearchBar="true" :showTableTitle="false" />
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
