import Vue from "vue";
export const state = () => ({
  news: [],
  singleCoinNews: [],
});

export const mutations = {
  MUTATE_NEWS(state, news) {
    Vue.set(state, "news", [...news]);
  },
  MUTATE_SINGLE_COIN_NEWS(state,singleCoinNews) {
    Vue.set(state, "singleCoinNews", [...singleCoinNews]);
  },
};

export const actions = {
  async getNews({ commit, rootState }) {
    this.$axios
      .get("/api/news")
      .then((result) => {
        commit("MUTATE_NEWS", result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getNewsByCoin({ commit, rootState }, id) {
    const {symbol}=rootState.coins.coins.find(c => c.id==id)
    this.$axios
      .get(`/api/news/${symbol}`)
      .then((result) => {
        commit("MUTATE_SINGLE_COIN_NEWS", result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
