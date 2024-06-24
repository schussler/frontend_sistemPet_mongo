<template>
  <v-app>
  <router-view></router-view>
    <bottom_bar/>
  </v-app>
</template>

<script>
import bottom_bar from './components/bottomBar.vue'
export default {
  name: 'App',
  components:{
    bottom_bar
  }
};
</script>
