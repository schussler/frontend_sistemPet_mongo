<template>
  <v-container fluid class="view">
    <bottom_bar />

    <createService ref="createService" />
    <datailsService ref="datailsService" />
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-btn text color="warning" @click="openDialogCreate">
          <v-icon>mdi mdi-dog-service</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        Serviços
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          label="Pesquisar"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        v-model:search="search"
        v-model:page="page"
        :loading="loading"
        :items="items"
        :items-per-page="itemsPerPage"
        :headers="headers"
      >
        <!-- Coluna Pets -->
        <template v-slot:[`item.name`]="{ item }">
          <span class="nowrap">{{ item.name }}</span>
        </template>

        <!-- Coluna comissao -->
        <template v-slot:[`item.value`]="{ item }">
          <span class="nowrap">R$ {{ item.value }}</span>
        </template>
        <!-- Coluna açoes -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="openDialogDatails(item)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>

        <!-- Coluna de paginaçao -->
        <template v-slot:bottom>
          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="5">
                  <v-container class="max-width">
                    <v-pagination
                      v-model="page"
                      :length="pageCount"
                      rounded="circle"
                    ></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import createService from "../components/services/createService.vue";
import datailsService from "../components/services/datailsService.vue";
import bottom_bar from "../components/bottomBar.vue";

export default {
  components: {
    createService,
    datailsService,
    bottom_bar,
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      search: "",
      loading: true,
      items: [],
      headers: [
        { title: "Nome", align: "start", sortable: true, value: "name" },
        { title: "Valor", align: "start", sortable: true, value: "value" },

        { title: "Ações", align: "center", sortable: false, value: "actions" },
      ],
    };
  },
  methods: {
    openDialogCreate() {
      this.$refs.createService.dialog = true; // Altera o valor de dialog para true no componente createClient.vue
    },
    openDialogDatails(item) {
      this.$refs.datailsService.dialog = true;
      this.$refs.datailsService.item = item;
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.VUE_APP_API_URL}/services`, axiosConfig)
      .then((response) => {
        this.items = response.data;
        this.loading = false; // Marca o loading como falso após os dados serem carregados
      })
      .catch((err) => {
        window.Toast.fire({
          icon: "error",
          title: err.response.data,
        });
        this.loading = false; // Marca o loading como falso após os dados serem carregados
      });
  },
};
</script>

<style scoped>
.view {
  margin-bottom: 5px;
}

.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
