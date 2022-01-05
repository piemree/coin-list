<template>
  <v-sparkline
    style="min-width: 100px"
    :value="volumes"
    :smooth="1"
    :padding="8"
    :line-width="0.5"
    stroke-linecap="round"
    gradient-direction="top"
    :fill="false"
    type="trend"
    :auto-line-width="false"
    auto-draw
  ></v-sparkline>
</template>

<script>
export default {
  props: {
    volumes: Array,
  },
};
</script>

<style></style>
