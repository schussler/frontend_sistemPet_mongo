<template>
  <div class="text-center">
    <v-dialog
      class="v-dialog"
      v-model="dialog"
      max-width="600"
      style="overflow: initial; z-index: 1000"
    >
      <v-card prepend-icon="mdi-dog" title="Agendar Serviço">
        <v-card-text>
          <v-form>
            <v-row>
              <!-- clientes -->
              <v-col cols="12" md="6">
                <v-combobox
                  v-model="clientName"
                  required
                  variant="outlined"
                  label="Nome do Cliente*"
                  :items="clientNames"
                ></v-combobox>
              </v-col>

              <!-- pets -->
              <v-col cols="12" md="6">
                {{ pets }}
                <v-combobox
                  v-model="petName"
                  required
                  :hide-no-data="false"
                  :items="pets"
                  label="Nome do Pet*"
                  hide-selected
                  variant="outlined"
                >
                  <!-- rota de criar cliente -->

                  <!-- <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn color="info">Criar Novo Pet</v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </template> -->
                </v-combobox>
              </v-col>

              <!-- serviços -->
              <v-col cols="12">
                <v-combobox
                  v-model="selectServices"
                  required
                  :hide-no-data="false"
                  :items="servicesNames"
                  label="Adicione Serviços"
                  hide-selected
                  chips
                  variant="outlined"
                  multiple
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn color="info">Cadastrar Novo Serviço</v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>

              <!-- dia de agendamento -->
              <v-col cols="12">
                <v-date-input
                  v-model="date"
                  label="Dia do agendamento"
                  variant="outlined"
                  required
                  prepend-icon=""
                ></v-date-input>
              </v-col>

              <!-- hora de incio -->
              <v-col cols="6">
                <v-select
                  v-model="startTime"
                  required
                  variant="outlined"
                  label="Hora de Inicio"
                  :items="[
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:30',
                    '14:30',
                    '15:30',
                    '16:30',
                    '17:30',
                    '18:30',
                    '19:30',
                  ]"
                ></v-select>
              </v-col>

              <!-- horas necessarias -->
              <v-col cols="6">
                <v-select
                  v-model="endTime"
                  required
                  variant="outlined"
                  label="Hora de Fim"
                  :items="[
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:30',
                    '14:30',
                    '15:30',
                    '16:30',
                    '17:30',
                    '18:30',
                    '19:30',
                    '20:30',
                  ]"
                ></v-select>
              </v-col>
              <!-- funcionario -->
              <v-col cols="12">
                <v-combobox
                  v-model="userName"
                  required
                  variant="outlined"
                  label="Funcionario*"
                  :items="userNames"
                ></v-combobox>
              </v-col>
              <!-- observaçoes -->
              <v-col cols="12">
                <v-textarea
                  v-model="obs"
                  label="Recomendação dos Serviços"
                  variant="outlined"
                ></v-textarea>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >* Campos obrigatórios</small
            >

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Fechar</v-btn>
              <v-btn color="primary" @click="formatDate">Criar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

import { VDateInput } from "vuetify/labs/VDateInput";

export default {
  components: {
    VDateInput,
  },
  data() {
    return {
      date: new Date(),
      dialog: false,
      startTime: "",
      endTime: "",
      // -------- vai pro banco --------------
      clientName: "",
      petName: "",
      selectServices: [],
      start: "",
      end: "",
      userName: "",
      obs: "",

      // -------- chega do banco --------------
      clients: [], // Armazena os dados completos dos clientes
      clientNames: [], // Armazena apenas os nomes dos clientes para o combobox
      pets: [], // Armazena os pets do cliente banco de dadosado
      servicesNames: [], // Armazena os serviços do banco de dados
      userNames: [],
    };
  },
  methods: {
    formatDate() {
      const date = this.date;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês é base 0, então adicionamos 1
      const day = String(date.getDate()).padStart(2, "0");
      this.start = `${year}-${month}-${day} ${this.startTime}`;
      this.end = `${year}-${month}-${day} ${this.endTime}`;
    },
    async fetchClients() {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/clients`,
          axiosConfig
        );
        // Armazena os dados completos dos clientes
        this.clients = response.data;
        // Cria um array apenas com os nomes dos clientes
        this.clientNames = response.data.map((client) => client.name);
      } catch (err) {
        window.Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      }
    },
    async fetchServices() {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/services`,
          axiosConfig
        );
        // Armazena os dados completos dos clientes
        this.services = response.data;
        // Cria um array apenas com os nomes dos clientes
        this.servicesNames = response.data.map((services) => services.name);
      } catch (err) {
        window.Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      }
    },
    async fetchUsers() {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/users`,
          axiosConfig
        );
        console.log();
        // Cria um array apenas com os nomes dos clientes
        this.userNames = response.data.map((user) => user.name);
      } catch (err) {
        window.Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      }
    },
  },
  watch: {
    // Observa mudanças no campo clientName
    clientName(newClientName) {
      // Encontra o cliente selecionado pelos dados completos
      const selectedClient = this.clients.find(
        (client) => client.name === newClientName
      );
      if (selectedClient) {
        // Atualiza o array pets com os nomes dos pets do cliente selecionado
        const pets = selectedClient.pets.map((pet) => ({
          name: pet.name,
        }));
        this.pets = pets.map((pet) => pet.name);
      } else {
        // Limpa o array pets se nenhum cliente for selecionado
        this.pets = [];
      }
    },
  },
  mounted() {
    // Chama a função fetchClients ao montar o componente
    this.fetchClients();
    this.fetchServices();
    this.fetchUsers();
  },
};
</script>

<style scoped></style>
