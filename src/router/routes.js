
const routes = [
  {
    path: '', component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'stations', component: () => import('pages/admin/students.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
