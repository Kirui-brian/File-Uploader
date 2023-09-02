<template>
  <div class="q-pa-lg bg-grey-3 column">
    <q-container class="q-pa-sm">
      <q-card>
        <q-card-section>
          <q-form ref="form" @submit="signup">
             <q-input
                v-model="formData.name"
                label="Name"
                type="text"
                outlined
                class="q-mb-md"
              ></q-input>
              <q-input
              v-model="formData.email"
              label="Email"
              type="email"
              outlined
              class="q-mb-md"
             autocomplete="current email"
            ></q-input>
            <q-input
              v-model="formData.password"
              label="Password"
              type="password"
              outlined
              class="q-mb-md"
              autocomplete="current password"
            ></q-input>
            <div class="q-mt-md">
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
import { defineComponent } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import router from 'src/router';

export default defineComponent({
  name: 'SignUpForm',
  setup() {
    const authStore = useAuthStore();

    const formData = {
      name: '',
      email: '',
      password: '',
    };

      // Bind the signup function to the current component instance
    async function signup() {
      try {
        console.log("Form data:", formData); // Debugging

        // Received JWT token from the backend
        const token = 'Kirui-token';

        // Store the  JWT token in Pinia
        authStore.setToken(token);

        // Set the JWT token as a cookie
        this.$cookies.set('Kirui-token', token, '7d');

        // Redirect to the user's logged-in page
        // Or use Vue router for navigation
        router.push('/form-page')

      } catch (error) {
        console.error("An error occurred during signup:", error);
        // Handle the error gracefully (show a message, log it, etc.)
      }
    }

    return {
      formData,
      signup: signup.bind(this), // Bind the signup function to the component instance
    };
  },
});
</script>
