<template>
  <div class="q-pa-lg bg-grey-3 column">
    <q-container class="q-pa-sm">
      <q-card>
        <q-card-section>
          <q-form ref="form" @submit="login">
            <q-input
              v-model="formData.email"
              label="Email"
              type="email"
              outlined
              class="q-mb-md"
              :rules="emailRules"
              autocomplete="current-email"
            ></q-input>
            <q-input
              v-model="formData.password"
              label="Password"
              type="password"
              outlined
              class="q-mb-md"
              :rules="passwordRules"
              autocomplete="current-password"
            ></q-input>
            <div class="q-mt-md">
              <q-btn
                type="submit"
                label="Login"
                color="primary"
                class="q-mr-sm"
              ></q-btn>
              <q-btn
                type="submit"
                label="Sign Up"
                color="secondary"
                @click="signup"
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-container>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';

export default defineComponent({
  name: 'LoginSignUp',
  setup() {
    const authStore = useAuthStore();

    const formData = {
      email: '',
      password: '',
    };

    const emailRules = [
      (v) => !!v || 'Email is required',
      (v) => /.+@.+/.test(v) || 'Email must be valid',
    ];

    const passwordRules = [(v) => !!v || 'Password is required'];

    async function login() {
      // Validate the form data before attempting login
      if (!this.$refs.form.validate()) {
        return;
      }

      // Call the login action from the Pinia store
      const loginSuccess = await authStore.login(formData.email, formData.password);

      if (loginSuccess) {
        // Redirect to the desired page (e.g., FormPage)
        this.$router.push('/form-page');
      } else {
        // Handle login failure
        this.$q.notify('Login failed. Please check your credentials.');
      }
    }

    function signup() {
      // Implement sign-up functionality here
      this.$q.notify('Signup functionality will be implemented later.');
    }

    return {
      formData,
      emailRules,
      passwordRules,
      login,
      signup,
    };
  },
});
</script>
