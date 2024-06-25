<template>
  <div class="pa-4 text-center">
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
                          <v-btn text color="warning" class="mr-2"
                            ><v-icon>mdi mdi-pencil</v-icon></v-btn
                          >
                          <v-btn text color="red"
                            ><v-icon>mdi mdi-trash-can</v-icon></v-btn
                          >
                        </v-row>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
                <v-row justify="center" class="py-5">
                  <v-btn text color="primary" @click="openDialogCreate">
                    <v-icon>mdi mdi-paw </v-icon> Adicionar Pet
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Fechar</v-btn>
              <v-btn color="primary" @click="createClient">Editar</v-btn>
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
      show: false,
      dialog: false,
      item: {},
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
<style>
.pointer {
  cursor: pointer;
}
</style>
