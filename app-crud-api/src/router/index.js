import { createRouter, createWebHistory } from 'vue-router'

// Importamos solo las vistas que ya existen en tu carpeta views
import ProductListView from '../views/ProductListView.vue';
import ProductCreateView from '../views/ProductCreateView.vue';
import ProductEditView from '../views/ProductEditView.vue';

const routes = [
  { 
    path: '/', 
    name: 'ProductList', 
    component: ProductListView 
  },
  { 
    path: '/products/new', 
    name: 'ProductCreate', 
    component: ProductCreateView 
  },
  { 
    path: '/products/edit/:id', 
    name: 'ProductEdit', 
    component: ProductEditView,
    props: true 
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})