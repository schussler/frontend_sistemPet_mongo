<template>
  <v-bottom-navigation
    v-model="value"
    :bg-color="color"
    mode="fixed"
    class="z-10 bottom-0 w-full"
  >
    <v-btn :to="{ path: '/calendar' }">
      <v-icon>mdi-calendar-month</v-icon>
      <span>Agenda</span>
    </v-btn>

    <v-btn :to="{ path: '/clients' }">
      <v-icon>mdi-finance</v-icon>
      <span>DashBoard</span>
    </v-btn>

    <v-btn :to="{ path: '/clients' }">
      <v-icon>mdi-account-group</v-icon>
      <span>Clientes</span>
    </v-btn>

    <v-btn>
      <v-icon>mdi-cog</v-icon>
      <span>Configs</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({ value: 1 }),

  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
  },
};
</script>

<style scoped>
/* Estilos adicionais para posicionar o v-bottom-navigation */
/* Z-index para garantir que o componente fique acima de outros conteúdos */
.z-10 {
  z-index: 10;
}
/* Fixar na parte inferior da tela */
.bottom-0 {
  position: fixed;
  bottom: 0;
}
/* Ocupar toda a largura disponível */
.w-full {
  width: 100%;
}
</style>
