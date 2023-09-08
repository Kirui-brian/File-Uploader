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
              required
              class="q-mb-md"
            ></q-input>
            <q-input
              v-model="formData.email"
              label="Email"
              type="email"
              outlined
              required
              class="q-mb-md"
              autocomplete="current email"
            ></q-input>
            <q-input
              v-model="formData.password"
              label="Password"
              type="password"
              outlined
              required
              class="q-mb-md"
              autocomplete="current password"
            ></q-input>
            <div class="q-mt-md">
              <q-btn
                type="submit"
                label="Sign Up"
                color="primary"
                :disable="isSubmitting || !isFormValid"
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
import router from 'src/router';

export default defineComponent({
  name: 'SignUpForm',
  setup() {
    const authStore = useAuthStore();

    // Define formData as a ref to make it reactive
    const formData = ref({
      name: '',
      email: '',
      password: '',
    });

    // Define isSubmitting as a ref
    const isSubmitting = ref(false);

    // Define a function for form validation
    const isFormValid = () => {
      const { name, email, password } = formData.value;
      return name.trim() !== '' && email.trim() !== '' && password.trim() !== '';
    };

    // Define the signup function
    async function signup() {
      if (!isFormValid()) {
        return;
      }

      isSubmitting.value = true;
      try {
        const response = await api.post('/signup', formData.value, {}); // Use formData as the request body

        const data = response.data;
        this.$q.notify(data.message);

        // Reset form data and file after successful submission
        this.$refs.form.resetValidation();
        this.file = null;

        for (let [key, value] of Object.entries(this.formData)) {
          console.log(key, value);

          this.formData[key] = '';
        }

        // Assuming you have defined the api object elsewhere in your code
        // Replace 'Kirui-token' with the actual token received from the backend
        const token = 'Kirui-token';

        // Store the JWT token in Pinia
        authStore.setToken(token);

        // Set the JWT token as a cookie (ensure you have the $cookies plugin set up)
        this.$cookies.set('Kirui-token', token, '7d');

        // Redirect to the user's logged-in page
        router.push('/form-page');
      } catch (error) {
        console.error('An error occurred during signup:', error);
        // Handle the error gracefully (show a message, log it, etc.)
      } finally {
        isSubmitting.value = false;
      }
    }

    return {
      formData,
      isSubmitting,
      isFormValid,
      signup,
    };
  },
});
</script>
