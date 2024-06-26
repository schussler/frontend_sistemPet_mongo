<template>
  <v-app id="app">
    <router-view></router-view>
    <bottom_bar />
  </v-app>
</template>

<script>
import bottom_bar from "./components/bottomBar.vue";
export default {
  components: {
    bottom_bar,
  },
};
</script>

<style></style>
