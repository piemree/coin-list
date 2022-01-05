<template>
  <v-card class="elevation-0">
    <v-card-title v-if="showTableTitle">
      Favorite Coins <v-icon color="yellow darken-2"> mdi-star </v-icon>
      <v-spacer></v-spacer>
      <v-text-field
        v-show="!hideSearchBar"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="coins"
      :search="search"
      :loading="isloading"
      loading-text="Loading... Please wait"
      item-key="id"
      :hide-default-footer="hideTableFooter"
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
        <div @click="details(item.id)" class="d-flex" style="cursor: pointer">
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
      <template v-slot:[`item.chartVolumes`]="{ item }">
        <Chart :volumes="item.chartVolumes" />
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
        {
          text: "Last 24h",
          sortable: true,
          value: "chartVolumes",
        },
      ],
    };
  },
  props: {
    hideSearchBar: Boolean,
    hideTableFooter: Boolean,
    showTableTitle:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    formatToCurrency(num) {
      const { format } = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return format(num);
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
    coins: (state) =>
      state.favorites.favs.map((f) => {
        state.chart.chartValues.forEach((c) => {
          if (f.id == c.id) f.chartVolumes = c.volumes;
        });
        return f;
      }),
  }),

  async created() {
    if (process.client) {
      this.$store.dispatch("coins/fetchCoins").then(() => {
        this.isloading = false;
        this.$store.dispatch("favorites/initFavorites");
        this.$store.dispatch("chart/fetchAllCharts");
      });
    }
  },
};
</script>
