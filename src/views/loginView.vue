<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="mx-auto" width="400">
      <v-card-title>
        <span class="font-weight-black">Login</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
            prepend-icon="mdi-email"
            autocomplete="username"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
            prepend-icon="mdi-lock"
            autocomplete="current-password"
          ></v-text-field>

          <v-btn
            :disabled="!valid || loading"
            color="primary"
            class="mr-4"
            @click="login"
          >
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <span v-else>Login</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "@/router"; // Importe o router

export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      loading: false,
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
    async login() {
      this.loading = true;
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/login`,
          {
            email: this.email,
            password: this.password,
          }
        );
        localStorage.setItem("token", response.data.token);

        // Redirecionar o usuário para a página desejada
        router.push("/clients");
      } catch (err) {
        if (err.response) {
          // Se houver uma resposta de erro do servidor
          window.Toast.fire({
            icon: "error",
            title: err.response.data,
          });
        } else {
          // Se ocorrer um erro que não seja relacionado à resposta do servidor
          window.Toast.fire({
            icon: "error",
            title: err,
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
