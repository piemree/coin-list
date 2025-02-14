<template>
  <v-card class="elevation-0">
    <v-card-title>
      Coins
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      class="row-pointer"
      :headers="headers"
      :items="coins"
      :search="search"
      :loading="isloading"
      :items-per-page="50"
      loading-text="Loading... Please wait"
      item-key="id"
    >
      <template v-slot:[`item.favorite`]="{ item }">
        <v-icon @click="addCoinToFavorites(item)" v-if="!item.favorite">
          mdi-star-outline
        </v-icon>
        <v-icon
          @click="removeCoinFromFavorites(item)"
          v-else
          color="yellow darken-2"
        >
          mdi-star
        </v-icon>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <div
          @click="details(item.id)"
          class="d-flex"
          style="cursor: pointer"
        >
          <img
            style="width: 20px; height: 20px"
            :src="item.image"
            alt="coinImange"
          />
          <span class="ml-3">{{ item.name }}</span>
        </div>
      </template>
      <template v-slot:[`item.price_change_percentage_24h`]="{ item }">
        <span
          :style="{
            color: item.price_change_percentage_24h < 0 ? 'red' : 'green',
          }"
          >{{ item.price_change_percentage_24h }}%
        </span>
      </template>
      <template v-slot:[`item.current_price`]="{ item }">
        {{ formatToCurrency(item.current_price) }}
      </template>
      <template v-slot:[`item.total_volume`]="{ item }">
        {{ formatToCurrency(item.total_volume) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      isloading: true,
      headers: [
        {
          text: " ",
          align: "start",
          sortable: false,
          value: "favorite",
        },
        {
          text: "Coin",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Price", sortable: true, value: "current_price" },
        {
          text: "24h",
          sortable: true,
          value: "price_change_percentage_24h",
        },
        {
          text: "24h volume",
          sortable: true,
          value: "total_volume",
        },
      ],
    };
  },
  methods: {
    formatToCurrency(num) {
      const { format } = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return format(num);
    },
    addCoinToFavorites(coin) {
      this.$store.dispatch("favorites/addCoinToFavorites", coin);
      this.$store.commit("coins/CHANGE_FAV_VALUE", { coin, value: true });
    },
    removeCoinFromFavorites(coin) {
      this.$store.dispatch("favorites/removeCoinFromFavorites", coin);
      this.$store.commit("coins/CHANGE_FAV_VALUE", { coin, value: false });
    },
    details(id) {
      this.$router.push(`coins/${id}`);
    },
  },
  computed: mapState({
    coins: (state) => state.coins.coins,
  }),

  async created() {
    if (process.client) {
      this.$store.dispatch("favorites/initFavorites");
      this.$store
        .dispatch("coins/fetchCoins")
        .then(() => (this.isloading = false));
    }
  },
};
</script>
