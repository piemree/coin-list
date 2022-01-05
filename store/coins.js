import Vue from "vue";
export const state = () => ({
  coins: [],
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
};

export const actions = {
  async getCoins({ commit, rootState }) {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];

    return this.$axios
      .get("/api/v3/coins/markets?vs_currency=usd")
      .then((result) => {

        //add favorite propertyName to coins
        const modifiedCoins = result.data.map((item) => {
          item.favorite = false;
          favs.forEach((fav) =>
            item.id == fav ? (item.favorite = true) : false
          );
          return item;
        });

        //get coin ids from modifiedCoins
        const favCoinIds = modifiedCoins
          .filter((item) => favs.some((fav) => fav == item.id))
          .map((c) => c.id);

        localStorage.setItem("favorites", JSON.stringify(favCoinIds));
        commit("MUTATE_COINS", modifiedCoins);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
