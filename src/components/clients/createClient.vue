<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-account" title="Cadastrar Cliente">
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="nomeCliente"
                  label="Nome do Cliente*"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="contato"
                  label="Contato*"
                  required
                  variant="outlined"
                  hint="Não colocar zero na frente do número"
                  @input="formatarTelefone"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="endereco"
                  label="Endereço"
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
              <v-btn color="primary" @click="createClient">Criar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      nomeCliente: "",
      contato: "",
      endereco: "",
    };
  },
  methods: {
    async createClient() {
      // Lógica de confirmação aqui
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      if (!this.nomeCliente || this.nomeCliente.trim() === "") {
        return alert("nome obrigatorio");
      }
      if (!this.contato || this.contato.trim() === "") {
        return alert("contato obrigatorio");
      }
      const newClient = {
        name: this.nomeCliente,
        phone: this.contato,
        address: this.endereco,
      };
      await axios
        .post("http://localhost:3000/clients", newClient, axiosConfig)
        .then(() => {
          location.reload();
          return;
        })
        .catch((err) => {
          alert(err.message);
        });
    },

    formatarTelefone() {
      // Remover todos os caracteres que não são dígitos
      let phoneNumber = this.contato.replace(/\D/g, "");

      // Aplicar a formatação (00) 99999-9999 em tempo real
      let formattedPhoneNumber = phoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3"
      );

      // Atualizar o modelo com o número formatado
      this.contato = formattedPhoneNumber;
    },
  },
};
</script>
