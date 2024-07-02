<template>
  <div class="text-center">
    <v-dialog
      class="v-dialog"
      v-model="dialog"
      max-width="600"
      style="overflow: initial; z-index: initial"
    >
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
              <v-btn color="primary" @click="createClient(contato)"
                >Criar</v-btn
              >
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
      ctt: "",
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
      try {
        if (!this.nomeCliente || this.nomeCliente.trim() === "") {
          return window.Toast.fire({
            icon: "error",
            title: "Nome é obrigatorio",
          });
        }
        if (!this.contato || this.contato.trim() === "") {
          return window.Toast.fire({
            icon: "error",
            title: "Contato é obrigatorio",
          });
        }

        const newClient = {
          name: this.nomeCliente,
          phone: this.ctt,
          address: this.endereco,
        };

        await axios.post(
          `${process.env.VUE_APP_API_URL}/clients`,
          newClient,
          axiosConfig
        );
        this.dialog = false;
        this.$swal
          .fire({
            title: "Eba",
            text: "Cliente cadastrado com sucesso",
            icon: "success",
          })

          .then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
      } catch (err) {
        window.Toast.fire({
          icon: "error",
          title: `${err}`,
        });
      }
    },

    formatarTelefone() {
      // Remover todos os caracteres que não são dígitos
      let phoneNumber = this.contato.replace(/\D/g, "");
      // Aplicar a formatação (00) 99999-9999 em tempo real
      let formattedPhoneNumber = phoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3"
      );
      let n = this.contato;
      this.ctt = n;

      // Atualizar o modelo com o número formatado
      this.contato = formattedPhoneNumber;
    },
  },
};
</script>
<style></style>
