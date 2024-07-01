<template>
  <div class="text-center">
    <v-dialog
      class="v-dialog"
      v-model="dialog"
      max-width="600"
      style="overflow: initial; z-index: initial"
    >
      <v-card prepend-icon="mdi-account" title="Cadastrar Usuario">
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="nameUser"
                  label="Nome do usuario*"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  :rules="emailRules"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password*"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-radio-group inline v-model="role" :mandatory="true">
                  <v-radio label="Admin" value="1"></v-radio>
                  <v-radio label="Funcionario" value="2"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >* Campos obrigatórios</small
            >

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Fechar</v-btn>
              <v-btn color="primary" :disabled="!valid" @click="createUser()"
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
      valid: false,

      dialog: false,
      nameUser: "",
      email: "",
      password: "",
      role: "2",
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      passwordRules: [
        (v) => !!v || "Senha é obrigatória",
        (v) => v.length >= 6 || "Senha deve ter pelo menos 6 caracteres",
      ],
    };
  },
  methods: {
    async createUser() {
      // Lógica de confirmação aqui
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        if (!this.nameUser || this.nameUser.trim() === "") {
          return window.Toast.fire({
            icon: "error",
            title: "Nome é obrigatorio",
          });
        }
        if (!this.email || this.email.trim() === "") {
          return window.Toast.fire({
            icon: "error",
            title: "Email é obrigatorio",
          });
        }
        if (!this.password || this.password.trim() === "") {
          return window.Toast.fire({
            icon: "error",
            title: "Senha é obrigatorio",
          });
        }

        const newUser = {
          name: this.nameUser,
          email: this.email,
          password: this.password,
          role: this.role,
        };
        console.log(newUser);
        await axios.post(
          `${process.env.VUE_APP_API_URL}/users`,
          newUser,
          axiosConfig
        );
        this.dialog = false;
        this.$swal
          .fire({
            title: "Eba",
            text: "Usuario cadastrado com sucesso",
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
          title: `${err.response.data.message}`,
        });
      }
    },
  },
};
</script>
<style></style>
