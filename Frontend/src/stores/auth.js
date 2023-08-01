import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    login() {
      // Implement login logic here using your API or authentication service
      // Example: Call an API to validate credentials
      return api.post('/login', {
        email: this.formData.email,
        password: this.formData.password,
      })
        .then((response) => {
          if (response.success) {
            this.isLoggedIn = true;
            return true; // Login success
          } else {
            return false; // Login failed
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
          return false; // Login failed
        });
    },
  },
});
