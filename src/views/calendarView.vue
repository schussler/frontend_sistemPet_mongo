<template>
  <bottom_bar />

  <v-container fluid class="view">
    <calendar />
  </v-container>
</template>

<script>
import calendar from "../components/appointments/fullCalendar.vue";
import bottom_bar from "../components/bottomBar.vue";

export default {
  components: {
    calendar,
    bottom_bar,
  },
};
</script>

<style></style>
