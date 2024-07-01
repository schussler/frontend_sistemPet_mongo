<template>
  <div class="text-center">
    <v-dialog
      class="v-dialog"
      v-model="dialog"
      max-width="600"
      style="overflow: initial; z-index: initial"
    >
      <v-card prepend-icon="mdi mdi-dog-service" title="Cadastrar Serviço">
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="nameService"
                  label="Nome do serviço*"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-number-input
                  v-model="value"
                  required
                  label="Valor do Serviço*"
                  variant="outlined"
                  control-variant="split"
                ></v-number-input>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >* Campos obrigatórios</small
            >

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Fechar</v-btn>
              <v-btn color="primary" @click="createService">Cadastrar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { VNumberInput } from "vuetify/labs/VNumberInput";

export default {
  data() {
    return {
      dialog: false,
      nameService: "",
      value: "",
    };
  },
  components: {
    VNumberInput,
  },
  methods: {
    async createService() {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      if (!this.nameService || this.nameService.trim() === "") {
        return window.Toast.fire({
          icon: "error",
          title: "Nome é obrigatório",
        });
      }
      if (!this.value) {
        return window.Toast.fire({
          icon: "error",
          title: "Valor é obrigatório",
        });
      }
      try {
        const newService = {
          name: this.nameService,
          value: String(this.value),
        };
        console.log(newService);
        await axios.post(
          `${process.env.VUE_APP_API_URL}/services`,
          newService,
          axiosConfig
        );
        this.dialog = false;
        this.$swal
          .fire({
            title: "Eba",
            text: "Serviço cadastrado com sucesso",
            icon: "success",
          })
          .then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
      } catch (err) {
        console.log(err);
        window.Toast.fire({
          icon: "error",
          title: `Erro: ${
            err.response ? err.response.data.message : err.message
          }`,
        });
      }
    },
  },
};
</script>
<style></style>
