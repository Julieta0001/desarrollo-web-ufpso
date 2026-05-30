<template>
  <div class="container mt-5" style="max-width: 400px;">
    <div class="card p-4 shadow">
      <h3 class="text-center mb-4">Iniciar Sesión</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Usuario simulado</label>
          <input type="text" class="form-control" v-model="username" required placeholder="admin" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Ingresar al Panel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    const username = ref('')
    const router = useRouter()

    const handleLogin = () => {
      // Simulación de autenticación (Exigencia del Reto)
      localStorage.setItem('logueado', 'true')
      router.push('/') // Te manda a la lista protegida de productos
    }

    return { username, handleLogin }
  }
}
</script>