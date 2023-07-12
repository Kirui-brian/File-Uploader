<template>
  <div>
    <q-page>
      <q-container class="q-pa-md">
        <q-card>
          <q-card-section>
            <q-table :rows="formDataList" :columns="columns" row-key="id" :loading="isLoading">
              <template v-slot:top-right>
                <q-btn label="Refresh" color="primary" @click="fetchFormDataList"></q-btn>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name">{{ props.row.name }}</q-td>
                  <q-td key="email">{{ props.row.email }}</q-td>
                  <q-td key="phoneNumber">{{ props.row.phoneNumber }}</q-td>
                  <q-td key="filePath">
                    <a :href="props.row.filePath" target="_blank">Download</a>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-container>
    </q-page>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios';

export default defineComponent({
  name: 'FormDataList',
  data() {
    return {
      formDataList: [],
      isLoading: false,
      columns: [
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'phoneNumber', required: true, label: 'Phone Number', align: 'left', field: 'phoneNumber', sortable: true },
        { name: 'filePath', required: true, label: 'ID Photo', align: 'left', field: 'filePath', sortable: false },
      ],
    };
  },
  created() {
    this.fetchFormDataList();
  },
  methods: {
    async fetchFormDataList() {
      this.isLoading = true;
      try {
        const response = await axios.get('/form-data');
        this.formDataList = response.data;
      } catch (error) {
        console.error('Error fetching form data:', error);
        // Handle error message display or other error handling logic
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
