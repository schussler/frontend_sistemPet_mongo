<template>
  <v-layout class="overflow-visible d-block">
    <v-bottom-navigation v-model="value" :bg-color="color" mode="shift">
      <v-btn>
        <v-icon>mdi-calendar-month  </v-icon>
        <span>Agenda</span>
      </v-btn>

      <v-btn :to="{ path: '/dashboard' }">
        <v-icon>mdi-finance</v-icon>
        <span>DashBoard</span>
      </v-btn>

        <v-btn :to="{ path: '/clients' }">
          <v-icon>mdi-account-group</v-icon>
            <router-link to="/clients">
            </router-link>
            <span>Clientes</span>

        </v-btn>

      <v-btn>
        <v-icon>mdi-cog</v-icon>
        <span>Configs</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({ value: 1 }),

    computed: {
      color() {
        switch (this.value) {
          case 0:
            return 'blue-grey'
          case 1:
            return 'teal'
          case 2:
            return 'brown'
          case 3:
            return 'indigo'
          default:
            return 'blue-grey'
        }
      },
    },
  }
</script>
