<template>
  <div>
    <q-page class="q-pa-lg bg-grey-3 column">
      <q-container class="q-pa-sm">
        <q-card>
          <q-card-section>
            <q-form ref="form" @submit="submitForm" enctype="multipart/form-data">
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
                type="tel"
                outlined
                v-model="formData.phoneNumber"
                label="Phone Number"
                required
                class="q-mb-md"
              ></q-input>
              <q-file
                color="teal"
                outlined
                v-model="file"
                label="Upload Your ID Photo"
                required
                clearable
                capture
                autofocus
                accept=".jpg,.png,.jpeg, image/*"
                class="q-mb-md"
                >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
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
      console.log('file:', this.file);
      return name.trim() !== '' && email.trim() !== '' && phoneNumber.trim() !== '' && this.file !== null;
    },
  },
  methods: {
    async submitForm(event) {
      event.preventDefault(); // Prevent the default form submission

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
