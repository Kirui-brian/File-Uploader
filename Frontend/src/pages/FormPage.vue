<template>
  <div>
    <q-page>
      <q-container class="q-pa-md">
        <q-card>
          <q-card-section>
            <q-form @submit="submitForm">
              <q-input outlined v-model="formData.name" label="Name" required></q-input>
              <q-input outlined v-model="formData.email" label="Email" type="email" required></q-input>
              <q-input outlined v-model="formData.phoneNumber" label="Phone Number" required></q-input>
              <q-uploader outlined v-model="file" label="ID Photo Upload" accept=".jpg,.png,.jpeg"
                @input="onFileInput"></q-uploader>
              <div class="q-mt-md">
                <q-btn type="submit" label="Submit" color="primary" :disable="isSubmitting"></q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-container>
    </q-page>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'FormPage',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phoneNumber: '',
      },
      file: null,
      isSubmitting: false,
    };
  },
  methods: {
    onFileInput(file) {
      this.file = file;
    },
    async submitForm() {
      this.isSubmitting = true;
      try {
        const formData = new FormData();
        formData.append('name', this.formData.name);
        formData.append('email', this.formData.email);
        formData.append('phoneNumber', this.formData.phoneNumber);
        formData.append('file', this.file);

        await axios.post('/submit-form', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Reset form data and file after successful submission
        this.formData.name = '';
        this.formData.email = '';
        this.formData.phoneNumber = '';
        this.file = null;
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error message display or other error handling logic
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
</script>
