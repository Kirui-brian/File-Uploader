<template>
  <div>
    <q-page class="q-pa-lg bg-grey-3 column">
      <q-container class="q-pa-sm">
        <q-card>
          <q-card-section>
            <q-form ref="form" @submit="submitForm">
              <q-input
                outlined
                v-model="formData.name"
                label="Name"
                required
                class="q-mb-md"
              ></q-input>
              <q-input
                outlined
                v-model="formData.email"
                label="Email"
                type="email"
                required
                class="q-mb-md"
              ></q-input>
              <q-input
                outlined
                v-model="formData.phoneNumber"
                label="Phone Number"
                required
                class="q-mb-md"
              ></q-input>
              <q-uploader
                url="http://127.0.0.1:3000/submit-form"
                outlined
                v-model="file"
                label="ID Photo Upload"
                auto-upload
                required
                accept=".jpg,.png,.jpeg, image/*"
                class="q-mb-md"
                @uploaded="onFileInput"
              ></q-uploader>
              <div class="q-mt-md">
                <q-btn
                  type="submit"
                  label="Submit"
                  color="primary"
                  :disable="isSubmitting || !isFormValid"
                  class="q-w-100"
                ></q-btn>
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
  computed: {
    isFormValid() {
      const { name, email, phoneNumber } = this.formData;
      return name.trim() !== '' && email.trim() !== '' && phoneNumber.trim() !== '' && this.file !== null;
    },
  },
  methods: {
    onFileInput(file) {
      this.file = file[0];
    },
    async submitForm() {
      if (!this.isFormValid) {
        return;
      }

      this.isSubmitting = true;
      try {
        const formData = new FormData();
        formData.append('name', this.formData.name);
        formData.append('email', this.formData.email);
        formData.append('phoneNumber', this.formData.phoneNumber);
        formData.append('file', this.file);

        await axios.post('http://127.0.0.1:3000/submit-form', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.$q.notify('Form Submitted Successfully!');

        // Reset form data and file after successful submission
        this.$refs.form.resetValidation();
        this.formData.name = '';
        this.formData.email = '';
        this.formData.phoneNumber = '';
        this.file = '';
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
