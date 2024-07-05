<template>
  <create_appointment ref="createAppointment" />

  <v-btn text color="success" @click="openDialogCreate">
    <v-icon>mdi mdi-plus</v-icon><span>Agendar Atendimento</span>
  </v-btn>
  <Calender />
  <bottom_bar />
</template>

<script>
import Calender from "../components/calendar/calendarComponent.vue";
import bottom_bar from "../components/bottomBar.vue";
import create_appointment from "../components/appointments/createAppintments.vue";

export default {
  name: "App",
  components: {
    Calender,
    bottom_bar,
    create_appointment,
  },
  methods: {
    openDialogCreate() {
      this.$refs.createAppointment.dialog = true; // Altera o valor de dialog para true no componente createClient.vue
    },
  },
};
</script>

<style scoped>
.z-10 {
  z-index: 1000 !important;
}
</style>
