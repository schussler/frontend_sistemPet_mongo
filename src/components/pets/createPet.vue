<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      style="overflow: initial; z-index: initial"
      max-width="600"
    >
      <v-card prepend-icon="mdi mdi-paw" title="Cadastrar Pet">
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="nomePet"
                  label="Nome do Pet*"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="race"
                  label="Raça do pet*"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="obs"
                  label="Observaçoes no Pet"
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
              <v-btn color="primary" @click="createPet">Criar</v-btn>
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
      id: "",
      nomePet: "",
      race: "",
      obs: "",
    };
  },
  methods: {
    async createPet() {
      // Lógica de confirmação aqui
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        if (!this.nomePet || this.nomePet.trim() === "") {
          return window.Toast.fire({
            icon: "error",
            title: "Nome é obrigatorio",
            popup: {
              className: "...",
              zIndex: 30000,
            },
          });
        }
        if (!this.race || this.race.trim() === "") {
          return window.Toast.fire({
            icon: "error",
            title: "Raça é obrigatorio",
          });
        }
        const newPet = {
          clientId: this.id,
          name: this.nomePet,
          race: this.race,
          obs: this.obs,
        };
        console.log(newPet);
        await axios.post("http://localhost:3000/pets", newPet, axiosConfig);
        this.dialog = false;
        this.$swal
          .fire({
            title: "Eba",
            text: "Pet cadastrado com sucesso",
            icon: "success",
          })

          .then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
      } catch (err) {
        console.log(err.response.data.message);
        window.Toast.fire({
          icon: "error",
          title: `${err}`,
        });
      }
    },
  },
};
</script>
<style></style>
