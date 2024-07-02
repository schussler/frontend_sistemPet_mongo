<template>
  <div class="text-center">
    <createPet ref="createPet" />

    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-account" title="Cadastrar Cliente">
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.name"
                  label="Nome do Cliente*"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.phone"
                  label="Contato*"
                  required
                  variant="outlined"
                  hint="Não colocar zero na frente do número"
                  @input="formatarTelefone"
                ></v-text-field>
              </v-col>

              <!-- coluna endereço -->
              <v-col cols="12">
                <v-textarea
                  v-model="item.address"
                  label="Endereço"
                  variant="outlined"
                ></v-textarea>
              </v-col>

              <!-- coluna pets -->
              <v-col cols="12">
                <v-row justify="center" class="py-6">
                  <p>Pets</p>
                </v-row>
                <v-card
                  v-for="(pet, index) in item.pets"
                  :key="index"
                  class="mx-auto mb-3"
                >
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        {{ pet.name }}
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-col cols="12">
                          <v-text-field
                            v-model="pet.name"
                            label="Namo"
                            required
                            variant="outlined"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="pet.race"
                            label="Raça"
                            required
                            variant="outlined"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="pet.obs"
                            label="Observaçoes"
                            required
                            variant="outlined"
                          ></v-text-field>
                        </v-col>
                      </v-expansion-panel-text>

                      <v-expansion-panel-text>
                        <v-row justify="center" class="py-2">
                          <v-btn
                            text
                            color="warning"
                            class="mr-2"
                            @click="updatePet(pet)"
                            ><v-icon>mdi mdi-pencil</v-icon></v-btn
                          >
                          <v-btn text color="red" @click="deletePet(pet._id)"
                            ><v-icon>mdi mdi-trash-can</v-icon></v-btn
                          >
                        </v-row>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
                <v-row justify="center" class="py-5">
                  <v-btn text color="primary" @click="openCreatePet(item._id)">
                    <v-icon>mdi mdi-paw </v-icon> Adicionar Pet
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Fechar</v-btn>
              <v-btn color="primary" @click="updateClient(item)">Editar</v-btn>
              <v-btn color="red" @click="deleteClient(item._id)">Deletar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import createPet from "../pets/createPet.vue";
export default {
  components: {
    createPet,
  },
  data() {
    return {
      show: false,
      dialog: false,
      item: {},
      nomeCliente: "",
      contato: "",
      endereco: "",
    };
  },
  methods: {
    openCreatePet(_id) {
      this.$refs.createPet.dialog = true;
      this.$refs.createPet.id = _id;
      this.dialog = false;
    },
    async deletePet(_id) {
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
          title: "Deseja excluir o Pet?",
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
                `${process.env.VUE_APP_API_URL}/pets/${_id}`,
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
    async updatePet(pet) {
      // Lógica de confirmação aqui
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const updatePet = {
        clientId: this.id,
        name: pet.name,
        race: pet.race,
        obs: pet.obs,
      };
      if (!pet._id) {
        return window.Toast.fire({
          icon: "error",
          title: "id nao pode ser nulo",
        });
      }
      this.dialog = false;
      this.$swal
        .fire({
          title: "Deseja Editar o Pet?",
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
                  `${process.env.VUE_APP_API_URL}/pets/${pet._id}`,
                  updatePet,
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
              this.$swal.fire(`${err.response.data}`, "", "error");
            }
          } else if (result.isDenied) {
            location.reload();
          }
        });
    },
    async deleteClient(_id) {
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
                `${process.env.VUE_APP_API_URL}/clients/${_id}`,
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
    async updateClient(item) {
      // Lógica de confirmação aqui
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const updateClient = {
        name: item.name,
        phone: item.phone,
        address: item.address,
      };
      if (!item._id) {
        return window.Toast.fire({
          icon: "error",
          title: "id nao pode ser nulo",
        });
      }
      this.dialog = false;
      this.$swal
        .fire({
          title: "Deseja Editar o Cliente?",
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
                  `${process.env.VUE_APP_API_URL}/clients/${item._id}`,
                  updateClient,
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
<style>
.pointer {
  cursor: pointer;
}
</style>
