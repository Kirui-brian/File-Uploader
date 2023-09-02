const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/signup',
        component: () => import('components/SignUpForm.vue'),
        name: 'SignUpForm',
        meta: { requiresAuth: false }, // Set requiresAuth to false as this page is accessible without authentication
      },
      {
        path: 'login',
        component: () => import('components/LoginForm.vue'),
        name: 'LoginForm',
        meta: { requiresAuth: false }, // Set requiresAuth to false as this page is accessible without authentication
      },
      { path: 'form-page',
      component: () => import('pages/FormPage.vue'),
      meta: { requiresAuth: true }, // Set requiresAuth to true as this page requires authentication
      // beforeEnter: (to, from, next) => {
      //   const authStore = useAuthStore();
      //   if (authStore.isLoggedIn) {
      //     next();
      //   } else {
      //     next('/');
      //   }
      // },
    },
      { path: 'form-data-list',
      component: () => import('pages/FormDataList.vue'),
      name: 'FormDataList',
      meta: { requiresAuth: true},
      // beforeEnter: (to, from, next) => {
      //   const authStore = useAuthStore();
      //   if (authStore.isLoggedIn) {
      //     next();
      //   } else {
      //     next('/');
      //   }
      // },
    }
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
