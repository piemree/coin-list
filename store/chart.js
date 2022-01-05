import Vue from "vue";
export const state = () => ({
  chartValues: [],
});

export const mutations = {
  MUTATE_COINS(state, coins) {
    Vue.set(state, "coins", [...coins]);
  },
  CHANGE_FAV_VALUE(state, { coin, value }) {
    const index = state.coins.findIndex((c) => c.id == coin.id);
    //Vue.set(object, propertyName, value)
    Vue.set(state.coins[index], "favorite", value);
  },
  ADD_CHART_VALUE(state, value) {
    state.chartValues.push(value);
  },
  CLEAN_CHARTS(state) {
    state.chartValues = [];
  },
};

export const actions = {
  async getFavoriteCoinChart({ commit, rootState }, id) {
    if (!id) return;
    this.$axios
      .get(`/api/v3/coins/${id}/market_chart?vs_currency=usd&days=24`)
      .then((result) => {
        const priceVolumes = result.data.prices.map((price) => price[1]);
        commit("ADD_CHART_VALUE", { id, volumes: priceVolumes });
      })
      .catch((err) => {});
  },
  getAllCharts({ rootState, commit, dispatch }) {
    commit("CLEAN_CHARTS");
    rootState.favorites.favs.forEach(({ id }) => {
      dispatch("getFavoriteCoinChart", id);
    });
  },
};
