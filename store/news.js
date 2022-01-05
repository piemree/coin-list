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
      .get("http://localhost:3000/myapi/news")
      .then((result) => {
        commit("MUTATE_NEWS", result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getNewsByCoin({ commit, rootState }, symbol) {
    this.$axios
      .get(`http://localhost:3000/myapi/news/${symbol}`)
      .then((result) => {
        console.log(result)
        commit("MUTATE_SINGLE_COIN_NEWS", result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
