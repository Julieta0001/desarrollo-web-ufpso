<template>
  <SidebarComponent />
  <div class="flex-grow-1 p-4 bg-light">
    <h2>Productos</h2>
    
    <button class="btn btn-success mb-3" @click="openModalForCreate">Nuevo Producto</button>
    
    <div v-if="loading" class="alert alert-info text-center mb-3">
      <span class="spinner-border spinner-border-sm me-2" role="status"></span>Cargando productos...
    </div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>

    <ProductTable
      v-if="!loading"
      :products="products"
      @edit="openModalForEdit"
      @delete="handleDelete"
    />

    <div class="mt-3">
      <button class="btn btn-success" @click="openModalForCreate">Agregar producto</button>
    </div>

    <div class="modal fade" id="productModal" ref="modalRef" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              {{ selectedProduct ? 'Editar Producto' : 'Nuevo Producto' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ProductForm 
              :product="selectedProduct" 
              :saving="saving"
              @submit="handleFormSubmit" 
              @cancel="closeModal" 
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';
import ProductTable from '@/components/ProductTable.vue'
import ProductForm from '@/components/ProductForm.vue' // <-- Importamos tu formulario original/validado
import productService from '@/services/productService'
import { ref, onMounted } from 'vue'

export default {
  components: { ProductTable, ProductForm, SidebarComponent },
  setup() {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)
    const success = ref(null)
    const saving = ref(false) // Rastrea el spinner interno del botón Guardar

    // Variables de control del Modal Bootstrap
    const modalRef = ref(null)
    const selectedProduct = ref(null)
    let bootstrapModal = null

    const load = async () => {
      loading.value = true
      error.value = null
      try {
        const res = await productService.getAllProducts()
        products.value = res.data
      } catch (err) {
        error.value = 'Error cargando productos'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    // Instanciamos el modal nativo usando la referencia del DOM de Vue 3
    onMounted(() => {
      load()
      if (window.bootstrap && window.bootstrap.Modal) {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value)
      }
    })

    const openModalForCreate = () => {
      selectedProduct.value = null // Resetea el formulario (Modo Crear)
      if (bootstrapModal) bootstrapModal.show()
    }

    const openModalForEdit = async (id) => {
      error.value = null
      try {
        // Obtenemos los datos frescos de la API antes de pintar la edición
        const res = await productService.getProductById(id)
        selectedProduct.value = res.data // Pasa el producto por prop (Modo Editar)
        if (bootstrapModal) bootstrapModal.show()
      } catch (err) {
        error.value = 'Error al obtener la información del producto'
        console.error(err)
      }
    }

    const closeModal = () => {
      if (bootstrapModal) bootstrapModal.hide()
    }

    // Centraliza la lógica de Guardado/Actualización (Reutilización al 100%)
    const handleFormSubmit = async (payload) => {
      saving.value = true
      error.value = null
      try {
        if (selectedProduct.value) {
          // Si selectedProduct contiene algo, estamos editando un registro existente
          await productService.updateProduct(selectedProduct.value.id, payload)
          success.value = 'Producto actualizado correctamente'
        } else {
          // Si está vacío, registramos uno nuevo en el backend
          await productService.createProduct(payload)
          success.value = 'Producto creado correctamente'
        }
        
        closeModal()
        await load() // Refresca la tabla automáticamente con los nuevos datos
        
        setTimeout(() => { success.value = null }, 3500)
      } catch (err) {
        error.value = 'Error al procesar la solicitud del producto'
        console.error(err)
      } finally {
        saving.value = false
      }
    }

    const handleDelete = async (id) => {
      if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return
      error.value = null
      success.value = null
      try {
        await productService.deleteProduct(id)
        success.value = 'Producto eliminado correctamente'
        setTimeout(() => { success.value = null }, 3500)
        await load()
      } catch (err) {
        error.value = 'Error eliminando producto'
        console.error(err)
      }
    }

    return { 
      products, loading, error, success, saving,
      modalRef, selectedProduct,
      openModalForCreate, openModalForEdit, closeModal, handleFormSubmit, handleDelete 
    }
  }
}
</script>