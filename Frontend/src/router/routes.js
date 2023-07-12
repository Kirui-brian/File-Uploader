
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'form-page', component: () => import('pages/FormPage.vue'), name: 'FormPage' },
      { path: 'form-data-list', component: () => import('pages/FormDataList.vue'), name: 'FormDataList' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
