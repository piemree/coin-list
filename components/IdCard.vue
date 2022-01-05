<template>
  <v-card v-if="coin" class="mx-auto elevation-0" outlined>
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
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:{
        coin:{
            type:Object,
            required:true,
        },
        coinId:{
            type:String,
            required:true,
        }
    },
  methods: {
    addCoinToFavorites(coin) {
      this.$store.dispatch("favorites/addCoinToFavorites", coin);
      this.$store.commit("coins/CHANGE_FAV_VALUE", { coin, value: true });
    },
    removeCoinFromFavorites(coin) {
      this.$store.dispatch("favorites/removeCoinFromFavorites", coin);
      this.$store.commit("coins/CHANGE_FAV_VALUE", { coin, value: false });
    },
    formatToCurrency(num) {
      const { format } = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return format(num);
    },
  },
};
</script>

<style></style>
