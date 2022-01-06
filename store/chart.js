import Vue from "vue";
export const state = () => ({
  chartValues: [],
  singeCoinChartValues: {},
});

export const mutations = {
  MUTATE_SINGLE_COIN_CHART_VALUES(state, values) {
    Vue.set(state, "singeCoinChartValues", {...values});
  },
  ADD_CHART_VALUE(state, value) {
    state.chartValues.push(value);
  },
  CLEAR_CHARTS(state) {
    state.chartValues = [];
  },
  CLEAR_SINGLE_CHARTS(state) {
    state.singeCoinChartValues = [];
  },  
};

export const actions = {
  async fetchFavoriteCoinChart({ commit, rootState }, id) {
    if (!id) return;
    this.$axios
      .get(`/coinapi/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
      .then((result) => {
        const priceVolumes = result.data.prices.map((price) => price[1]);
        commit("ADD_CHART_VALUE", { id, volumes: priceVolumes });
      })
      .catch((err) => {});
  },
  fetchAllCharts({ rootState, commit, dispatch }) {
    commit("CLEAR_CHARTS");
    rootState.favorites.favs.forEach(({ id }) => {
      dispatch("fetchFavoriteCoinChart", id);
    });
  },
  fetchCoinChartByTime({ commit }, { time, id }) {
    commit("CLEAR_SINGLE_CHARTS")
   return this.$axios
      .get(`/coinapi/v3/coins/${id}/market_chart?vs_currency=usd&days=${time}`)
      .then((result) => {
        const priceVolumes = result.data.prices.map((price) => price[1]);
        commit("MUTATE_SINGLE_COIN_CHART_VALUES", {
          id,
          volumes: priceVolumes,
        });
      })
      .catch((err) => {console.log(err);});
  },
};
