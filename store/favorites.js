import Vue from "vue";
export const state = () => ({
  favs: [],
});

export const mutations = {
  ADD_FAV(state, fav) {
    state.favs.push(fav);
  },
  REMOVE_FAV(state, fav) {
    const index = state.favs.findIndex((c) => c.id == fav.id);
    state.favs.splice(index, 1);
  },
  MUTATE_FAVS(state, favs) {
    Vue.set(state, "favs", favs);
  },
  ADD_FAVS_TO_LOCAL_STORAGE(state, fav) {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const isSaved = favs.some((f) => f.id == fav);
    if (isSaved) return;
    localStorage.setItem("favorites", JSON.stringify([...favs, fav]));
  },
  REMOVE_FAVS_FROM_LOCAL_STORAGE(state, fav) {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favs.findIndex((id) => id == fav);
    favs.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify([...favs]));
  },
};

export const actions = {
  initFavorites({ commit, rootState }) {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const favorites = rootState.coins.coins.filter((coin) => {
      return favs.some((f) => f == coin.id);
    });
    commit("MUTATE_FAVS", favorites);
  },
  addCoinToFavorites({ commit }, coin) {
    // commit("ADD_FAV", { ...coin, favorite: true });
    // commit("ADD_FAVS_TO_LOCAL_STORAGE", { ...coin, favorite: true });
    commit("ADD_FAV", coin.id);
    commit("ADD_FAVS_TO_LOCAL_STORAGE", coin.id);
  },
  removeCoinFromFavorites({ commit }, coin) {
    commit("REMOVE_FAV", coin);
    commit("REMOVE_FAVS_FROM_LOCAL_STORAGE", coin.id);
  },
};
