<template>
  <v-card class="mx-auto elevation-0">
    <v-card-title primary-title> Cryptocurrency News </v-card-title>
    <v-list three-line>
      <div v-for="(item, index) in news" :key="item.title">
        <v-list-item :ripple="false" background-color="white">
          <template>
            <v-list-item-content class="d-flex">
              <div>
                <v-list-item-subtitle
                  class="text--grey mt-2 text-right"
                  v-text="formatTime(item.created_at)"
                ></v-list-item-subtitle>
                <v-list-item-title class="text-wrap font-weight-medium">
                  <a style="color: black;text-decoration: none" :href="item.url"  target="_blank">{{ item.title }}</a></v-list-item-title
                >
              </div>

              <div class="d-flex">
                <a
                  v-for="(currency, i) in item.currencies"
                  :key="i"
                  class="ml-2 mt-1 font-weight-bold"
                  style="text-decoration: none"
                  :href="currency.url"
                  target="_blank"
                >
                  {{ currency.code }}
                </a>
              </div>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-divider v-if="index < news.length - 1" :key="index"></v-divider>
      </div>
    </v-list>
  </v-card>
</template>
<script>

import moment from "moment";
export default {
  data() {
    return {};
  },
  props:{
    news:Array
  },
  // computed: mapState({
  //   news: (state) => state.news.news,
  // }),
  methods: {
    formatTime(time) {
      return moment(time).fromNow();
    },
  },
  created() {
    if (process.client) {
      this.$store.dispatch("news/getNews");
    }
  },
};
</script>
