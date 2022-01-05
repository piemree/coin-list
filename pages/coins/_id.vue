<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="6" lg="9">
      <!-- <v-card v-if="coin" class="mx-auto elevation-0" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline">{{ coin.symbol }}</div>
            <div class="mb-4 ml-1">
              <v-icon @click="addCoinToFavorites(coin)" v-if="!coin.favorite">
                mdi-star-outline
              </v-icon>
              <v-icon
                @click="removeCoinFromFavorites(coin)"
                v-else
                color="yellow darken-2"
              >
                mdi-star
              </v-icon>
            </div>
            <v-list-item-title class="text-h5 mb-1">
              {{ coin.name }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar :src="coin.image" tile size="80">
            <img
              style="width: 80px; height: 80px"
              :src="coin.image"
              alt="coinImange"
            />
          </v-list-item-avatar>
        </v-list-item>
        <div class="my-3 ml-4">
          <b>Price: </b> {{ formatToCurrency(coin.current_price) }}
        </div>
        <v-divider></v-divider>
        <div class="my-3 ml-4">
          <b>Market Cap: </b> {{ formatToCurrency(coin.market_cap) }}
        </div>
        <v-divider></v-divider>
        <div class="my-3 ml-4">
          <b>High 24h: </b> {{ formatToCurrency(coin.high_24h) }}
        </div>
        <v-divider></v-divider>
        <div class="my-3 ml-4">
          <b>Low 24h: </b> {{ formatToCurrency(coin.low_24h) }}
        </div>
      </v-card> -->

      <IdCard :coin="coin" :coinId="$route.params.id" />
      <v-card class="my-4" elevation="0" outlined>
        <div>
          <Chart v-if="chartVolumes" :volumes="chartVolumes" />
        </div>
        <v-card-actions>
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn> 24h </v-btn>

            <v-btn> 7d </v-btn>

            <v-btn> 1m </v-btn>

            <v-btn> 1y </v-btn>
          </v-btn-toggle>
        </v-card-actions>
      </v-card>

      <News :news="news" />
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
    chartVolumes: (state) => state.chart.singeCoinChartValues.volumes,
  }),
  methods: {
    fetchChartValues(time) {
      this.$store.dispatch("chart/fetchCoinChartByTime", {
        time,
        id: this.coin.id,
      });
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
