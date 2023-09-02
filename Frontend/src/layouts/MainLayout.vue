<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated class="bg-cyan-8 text-white" height-hint="98">
      <q-toolbar>

        <q-toolbar-title>
          File Uploader App
        </q-toolbar-title>

      </q-toolbar>

        <q-tabs align="center">
          <q-route-tab
            to="/form-page"
            exact
            clickable
            label="Form Page" />
          <q-route-tab
            to="form-data-list"
            exact
            clickable
            label="Form Data List" />
        </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const authStore = useAuthStore();

    const leftDrawerOpen = ref(false);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      isAuthenticated: authStore.isLoggedIn,
    };
  },
});
</script>
