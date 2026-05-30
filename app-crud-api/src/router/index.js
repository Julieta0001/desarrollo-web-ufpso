import { createRouter, createWebHistory } from 'vue-router'

import ProductListView from '../views/ProductListView.vue';
// Nota: Las vistas Create y Edit ya no se usarán porque todo se resolverá en el Modal, 
// pero las dejamos mapeadas o apuntando a la principal para evitar errores si quedan enlaces sueltos.
import LoginView from '../views/LoginView.vue'; // <-- Necesitaremos crear esta vista sencilla

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  { 
    path: '/', 
    name: 'ProductList', 
    component: ProductListView,
    meta: { requiresAuth: true } // <-- Bloquea esta ruta si no está logueado
  },
  { 
    path: '/products/new', 
    name: 'ProductCreate', 
    component: ProductListView, // Redirige a la lista para que se abra en el modal
    meta: { requiresAuth: true }
  },
  { 
    path: '/products/edit/:id', 
    name: 'ProductEdit', 
    component: ProductListView, // Redirige a la lista para que se abra en el modal
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// GUARDiÁN DE RUTA: Verifica si tienes permiso antes de entrar a cada pantalla
router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem('logueado')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogged) {
      next({ name: 'Login' }) // Si no está logueado, lo manda al Login
    } else {
      next() // Si está logueado, lo deja pasar
    }
  } else {
    next() // Rutas públicas (como el Login)
  }
})

export default router