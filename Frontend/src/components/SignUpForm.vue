<template>
  <div class="q-pa-lg bg-grey-3 column">
    <q-container class="q-pa-sm">
      <q-card>
        <q-card-section>
          <q-form ref="form" @submit="signup">
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
  name: 'SignUpComponent',
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

    // Bind the signup function to the current component instance
    async function signup() {
      try {
        if (!this.$refs || !this.$refs.form) {
          console.error("Form ref is not available.");
          return;
        }

        // Validate the form data before attempting signup
        if (!this.$refs.form.validate()) {
          return;
        }

        console.log("Form data:", formData); // Debugging

        // Call the signup action from the pinia store
        const signupSuccess = await authStore.signup(formData.email, formData.password);

        if (signupSuccess) {
          // Reset form data and redirect
          formData.email = '';
          formData.password = '';
          this.$router.push('/form-page');
        } else {
          // Handle signup failure
          this.$q.notify('Signup failed. Please try again.');
        }
      } catch (error) {
        console.error("An error occurred during signup:", error);
        // Handle the error gracefully (show a message, log it, etc.)
      }
    }

    return {
      formData,
      emailRules,
      passwordRules,
      signup: signup.bind(this), // Bind the signup function to the component instance
    };
  },
});
</script>
