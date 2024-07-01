<template>
  <v-container fluid class="view">
    <bottom_bar />

    <createUser ref="createUser" />
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-btn text color="success" @click="openDialogCreate">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        Usuarios
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

        <!-- Coluna email -->
        <template v-slot:[`item.email`]="{ item }">
          <span class="nowrap">{{ item.email }}</span>
        </template>
        <!-- Coluna cargo -->
        <template v-slot:[`item.role`]="{ item }">
          <span class="nowrap text-center">
            <template v-if="item.role === 1">
              <v-chip color="green">
                <v-icon>mdi mdi-cog-outline</v-icon>
              </v-chip>
            </template>
            <template v-else-if="item.role === 2">
              <v-chip color="red"><v-icon>mdi mdi-account</v-icon></v-chip>
            </template>
            <template v-else>
              <v-icon>mdi-help-circle</v-icon> unknown
            </template>
          </span>
        </template>

        <!-- Coluna comissao -->
        <template v-slot:[`item.commissions`]="{}">
          <span class="nowrap"> R$ 10000,00 </span>
        </template>
        <!-- Coluna açoes -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="red" @click="deleteUser(item._id)">
            <v-icon>mdi-trash-can</v-icon>
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
import createUser from "../components/users/createUser.vue";
import bottom_bar from "../components/bottomBar.vue";

export default {
  components: {
    createUser,
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
        { title: "Email", align: "start", sortable: true, value: "email" },
        { title: "Cargo", align: "start", sortable: true, value: "role" },
        {
          title: "Comissoes",
          align: "start",
          sortable: true,
          value: "commissions",
        },
        { title: "Ações", align: "center", sortable: false, value: "actions" },
      ],
    };
  },
  methods: {
    openDialogCreate() {
      this.$refs.createUser.dialog = true; // Altera o valor de dialog para true no componente createClient.vue
    },

    async deleteUser(_id) {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      if (!_id) {
        return window.Toast.fire({
          icon: "error",
          title: "id nao pode ser nulo",
        });
      }
      this.dialog = false;

      this.$swal
        .fire({
          title: "Deseja excluir o Cliente?",
          showDenyButton: true,
          showCancelButton: false,
          denyButtonText: `Excluir`,
          confirmButtonText: "Cancelar",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isDenied) {
            try {
              axios.delete(
                `${process.env.VUE_APP_API_URL}/users/${_id}`,
                axiosConfig
              );
              this.$swal.fire("Excluido!", "", "success").then(() => {
                location.reload();
              });
            } catch (err) {
              this.$swal.fire(`${err}`, "", "error");
            }
          } else if (result.isConfirmed) {
            location.reload();
          }
        });
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
      .get(`${process.env.VUE_APP_API_URL}/users`, axiosConfig)
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
.icon_whats:hover {
  color: green;
}
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
