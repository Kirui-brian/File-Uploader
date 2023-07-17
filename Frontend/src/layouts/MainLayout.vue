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
            to="/"
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

export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
