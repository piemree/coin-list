<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="9" lg="9">
      <LazyIdCard :coin="coin" :coinId="$route.params.id" />
      <v-card :loading="loading" class="my-4" elevation="0" outlined>
        <v-card-actions class="mb-5">
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn height="25"> 24h </v-btn>

            <v-btn height="25"> 7d </v-btn>

            <v-btn height="25"> 1m </v-btn>

            <v-btn height="25"> 1y </v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <div>
          <LazyChart v-if="chartVolumes" :volumes="chartVolumes" />
        </div>
      </v-card>

      <LazyNews :news="news" />
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import News from "~/components/News.vue";
import Chart from "~/components/Chart.vue";
import IdCard from "~/components/IdCard.vue";
export default {
  data() {
    return {
      toggle_exclusive: 0,
      loading: false,
    };
  },
  computed: mapState({
    news: (state) => state.news.singleCoinNews,
    coin: function (state) {
      let coin = this.$route.params.id;
      return (
        state.coins.coins.filter(function (c) {
          return c.id == coin;
        })[0] || {}
      );
    },
    chartVolumes: (state)=>state.chart.singeCoinChartValues.volumes,
  }),
  methods: {
    async fetchChartValues(time) {
      this.loading = true;
      await this.$store.dispatch("chart/fetchCoinChartByTime", {
        time,
        id: this.coin.id,
      });
      this.loading = false;
    },
  },
  watch: {
    toggle_exclusive() {
      if (this.toggle_exclusive == 0) this.fetchChartValues(1);
      if (this.toggle_exclusive == 1) this.fetchChartValues(7);
      if (this.toggle_exclusive == 2) this.fetchChartValues(30);
      if (this.toggle_exclusive == 3) this.fetchChartValues(365);
    },
  },
  async created() {
    if (process.client) {
      await this.$store.dispatch("coins/fetchCoins");
      this.$store.dispatch("news/getNewsByCoin", this.$route.params.id);
      this.$store.dispatch("chart/fetchCoinChartByTime", {
        time: 1,
        id: this.$route.params.id,
      });
    }
  },
  components: { News, Chart, IdCard },
};
</script>
