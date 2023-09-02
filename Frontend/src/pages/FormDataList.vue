<template>
  <div>
    <!-- Modal to show the image -->
    <q-dialog v-model="showImageModal">
      <q-card>
        <q-card-section>
          <q-img :src="selectedImagePath" style="max-width: 100%;" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page class="q-pa-lg bg-grey-3 column">
      <q-container class="q-pa-sm">
        <q-card>
          <q-card-section>
            <q-table :rows="formDataList" :columns="columns" row-key="id" :rows-per-page-options="[25, 50, 100]" :rows-per-page="25" :loading="isLoading">
              <template v-slot:top-right>
                <q-btn label="Refresh" color="primary" @click="fetchFormDataList"></q-btn>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name">{{ props.row.name }}</q-td>
                  <q-td key="email">{{ props.row.email }}</q-td>
                  <q-td key="phoneNumber">{{ props.row.phoneNumber }}</q-td>
                  <q-td key="filePath">
                   <!-- Add an @click event to open the modal and set the selected image path -->
                   <a :href="props.row.filePath" @click="openImageModal(props.row.filePath)">Click to Preview</a>
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
import { api } from 'src/boot/axios'
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
      showImageModal: false,
      selectedImagePath: '',
    };
  },
  created() {
    this.fetchFormDataList();
  },
  methods: {
    async fetchFormDataList() {
      this.isLoading = true;
      //console.log(api);
      try {
        const response = await api.get('/form-data');
        this.formDataList = response.data;
        // Update the filePath values to the correct URLs served by your Fastify backend
        this.formDataList = response.data.map((item) => ({
          ...item,
          filePath: `http://127.0.0.1:3000/uploads/${encodeURIComponent(item.filePath.split('/').pop())}`,
        }));
      } catch (error) {
        console.error('Error fetching form data:', error);
      } finally {
        this.isLoading = false;
      }
    },
    openImageModal(imagePath) {
      this.selectedImagePath = imagePath;
      this.showImageModal = true;
    },
  },
});
</script>
