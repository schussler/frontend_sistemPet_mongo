<template>
  <v-container fluid class="view">
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-btn text color="primary" @click="ola()">
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
        <!-- Coluna Contato -->
        <template v-slot:[`item.phone`]="{ item }">
          <span class="nowrap">{{ formatarTelefone(item.phone) }}</span>
            <v-icon class="pl-3 icon_whats" @click="sendWhatsapp(item.phone)">mdi-whatsapp</v-icon>
            
        </template>
        <!-- Coluna cargo -->
        <template v-slot:[`item.address`]="{ item }">
          <span class="text-center nowrap">{{ item.address }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="view(item._id)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
        <template v-slot:bottom>
          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="5">
                  <v-container class="max-width">
                    <v-pagination v-model="page" :length="pageCount" rounded="circle"></v-pagination>
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

export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      search: '',
      loading: false,
      items: [],
      headers: [
        { title: 'Nome', align: 'start', sortable: true, value: 'name' },
        { title: 'Contato', align: 'start', sortable: true, value: 'phone' },
        { title: 'Endereço', align: 'start', sortable: true, value: 'address' },
        { title: 'Ações', align: 'center', sortable: false, value: 'actions' },
      ],
    }
  },
  methods: {
    ola(i) {
      alert("Olá " + i);
      console.log(this.items);
    },
    view(id) {
      alert("Visualizando item com ID: " + id);
    },
    formatarTelefone(telefone) {
      if (!telefone) return 'telefone nao cadastrado';
      // Verifica se telefone é uma string
      if (typeof telefone !== 'string') {
        // Converte telefone para string (se possível)
        telefone = String(telefone);
      }
      // Formatação específica para (21) 98181-0650
      if (telefone.length === 11) {
        return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7, 11)}`;
      }
      // Outros formatos podem ser tratados aqui conforme necessário
      return telefone; // Retorna telefone sem formatação se não atender ao critério
    },
    sendWhatsapp(phone){
         // Remover todos os caracteres que não sejam dígitos
    
    // Montar o link do WhatsApp
    const linkWhatsapp = `https://web.whatsapp.com/send?phone=55${phone}`;
    
    // Abrir o link em uma nova aba
    window.open(linkWhatsapp, '_blank');
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.items.length / this.itemsPerPage)
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
      .get("http://localhost:3000/clients", axiosConfig)
      .then((response) => {
        this.items = response.data;
        this.loading = false; // Marca o loading como falso após os dados serem carregados
      })
      .catch((err) => {
        alert(err.response);
        this.loading = false; // Marca o loading como falso após os dados serem carregados
      });
  },
}
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
.icon_whats:hover{
  color: green;
}
</style>
