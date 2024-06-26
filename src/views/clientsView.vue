<template>
  <v-container fluid class="view">
    <bottom_bar />

    <createClient ref="createClient" />
    <datailsClient ref="datailsClient" />
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-btn text color="primary" @click="openDialogCreate">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>

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

        <template v-slot:[`item.pets`]="{ item }">
          <span class="nowrap">
            {{
              item.pets.length > 0
                ? item.pets.map((pet) => pet.name).join(" - ")
                : "sem pets cadastrados"
            }}
          </span>
        </template>

        <!-- Coluna Contato -->
        <template v-slot:[`item.phone`]="{ item }">
          <span class="nowrap"
            >{{ formatarTelefone(item.phone)
            }}<v-icon class="pl-3 icon_whats" @click="sendWhatsapp(item.phone)"
              >mdi-whatsapp</v-icon
            ></span
          >
        </template>

        <!-- Coluna endereço -->
        <template v-slot:[`item.address`]="{ item }">
          <span class="text-center nowrap">{{ item.address }}</span>
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
import createClient from "../components/clients/createClient.vue";
import datailsClient from "../components/clients/datailsClient.vue";
import bottom_bar from "../components/bottomBar.vue";

export default {
  components: {
    createClient,
    datailsClient,
    bottom_bar,
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      search: "",
      loading: false,
      items: [],
      headers: [
        { title: "Nome", align: "start", sortable: true, value: "name" },
        { title: "Pets", align: "start", sortable: true, value: "pets" },
        { title: "Contato", align: "start", sortable: true, value: "phone" },
        { title: "Endereço", align: "start", sortable: true, value: "address" },
        { title: "Ações", align: "center", sortable: false, value: "actions" },
      ],
    };
  },
  methods: {
    openDialogCreate() {
      this.$refs.createClient.dialog = true; // Altera o valor de dialog para true no componente createClient.vue
    },
    openDialogDatails(item) {
      this.$refs.datailsClient.dialog = true;
      this.$refs.datailsClient.item = item;
    },

    formatarTelefone(telefone) {
      if (!telefone) return "telefone nao cadastrado";
      // Verifica se telefone é uma string
      if (typeof telefone !== "string") {
        // Converte telefone para string (se possível)
        telefone = String(telefone);
      }
      // Formatação específica para (21) 98181-0650
      if (telefone.length === 11) {
        return `(${telefone.substring(0, 2)}) ${telefone.substring(
          2,
          7
        )}-${telefone.substring(7, 11)}`;
      }
      // Outros formatos podem ser tratados aqui conforme necessário
      return telefone; // Retorna telefone sem formatação se não atender ao critério
    },
    sendWhatsapp(phone) {
      // Remover todos os caracteres que não sejam dígitos

      // Montar o link do WhatsApp
      const linkWhatsapp = `https://web.whatsapp.com/send?phone=55${phone}`;

      // Abrir o link em uma nova aba
      window.open(linkWhatsapp, "_blank");
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
      .get("https://backend-sistem-pet-mongo.vercel.app/clients", axiosConfig)
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
</style>
