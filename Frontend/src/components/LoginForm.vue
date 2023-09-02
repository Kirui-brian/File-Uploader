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
              autocomplete="current-email"
            ></q-input>
            <q-input
              v-model="formData.password"
              label="Password"
              type="password"
              outlined
              class="q-mb-md"
              autocomplete="current-password"
            ></q-input>
            <div class="q-mt-md">
              <q-btn
                type="submit"
                label="Login"
                color="primary"
                class="q-mr-sm"
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  setup() {

    const formData = {
      email: '',
      password: '',
    };

    async function login() {
      // Validate the form data before attempting login
      if (!this.$refs.form.validate()) {
        return;
      }

      if (loginSuccess) {
        // Reset form data and redirect
        formData.email = '';
        formData.password = '';
        this.$router.push('/form-page');
      } else {
        // Handle login failure
        this.$q.notify('Login failed. Please check your credentials.');
      }
    }

    return {
      formData,
      login,
    };
  },
});
</script>
