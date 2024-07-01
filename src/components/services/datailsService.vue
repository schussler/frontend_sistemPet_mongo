<template>
  <div class="text-center">
    <createPet ref="createPet" />

    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi mdi-dog-service" title="Editar Serviços">
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.name"
                  label="Nome do serviço*"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-number-input
                  v-model="item.value"
                  required
                  label="Valor do Serviço*"
                  variant="outlined"
                  control-variant="split"
                ></v-number-input>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Fechar</v-btn>
              <v-btn color="primary" @click="updateService(item)">Editar</v-btn>
              <v-btn color="red" @click="deleteService(item._id)"
                >Deletar</v-btn
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
import { VNumberInput } from "vuetify/labs/VNumberInput";

export default {
  components: {
    VNumberInput,
  },
  data() {
    return {
      show: false,
      dialog: false,
      item: {},
    };
  },
  methods: {
    async deleteService(_id) {
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
          title: "Deseja excluir o Service?",
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
                `${process.env.VUE_APP_API_URL}/services/${_id}`,
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
    async updateService(item) {
      // Lógica de confirmação aqui
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const updateService = {
        name: item.name,
        value: String(item.value),
      };
      this.dialog = false;
      this.$swal
        .fire({
          title: "Deseja Editar o Serviço?",
          showDenyButton: true,
          denyButtonText: `Cancelar`,
          confirmButtonText: "Editar",
        })

        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            try {
              axios
                .put(
                  `${process.env.VUE_APP_API_URL}/services/${item._id}`,
                  updateService,
                  axiosConfig
                )
                .then(() => {
                  location.reload();
                  return;
                });
              this.$swal.fire("Editado!", "", "success").then(() => {
                location.reload();
              });
            } catch (err) {
              this.$swal.fire(`${err}`, "", "error");
            }
          } else if (result.isDenied) {
            location.reload();
          }
        });
    },
  },
};
</script>
<style></style>
