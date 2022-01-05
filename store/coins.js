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
    const favs = rootState.favorites.favs;

    return this.$axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((result) => {
        const modifiedCoins = result.data.map((item) => {
          item.favorite = false;
          favs.forEach((fav) =>
            item.id == fav.id ? (item.favorite = true) : false
          );
          return item;
        });

        const updatedCoins = modifiedCoins.filter((item) =>favs.some((fav) =>(fav.id == item.id)));
        localStorage.setItem("favorites", JSON.stringify(updatedCoins));
        commit("MUTATE_COINS", modifiedCoins);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
