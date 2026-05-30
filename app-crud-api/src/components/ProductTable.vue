<template>
  <div>
    <div class="mb-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar producto por nombre..."
        class="form-control"
      />
    </div>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Nombre</th><th>Precio</th><th>Categoría</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filteredProducts" :key="p.id">
          <td>{{p.name}}</td>
          <td>{{p.price}}</td>
          <td>{{p.category}}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="$emit('edit', p.id)">Editar</button>
            <button class="btn btn-danger btn-sm ms-2" @click="$emit('delete', p.id)">Eliminar</button>
          </td>
        </tr>

        <tr v-if="filteredProducts.length === 0">
          <td colspan="4" class="text-center text-muted">
            No se encontraron productos con ese nombre.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default { 
  props: ['products'],
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery) {
        return this.products;
      }
      const query = this.searchQuery.toLowerCase();
      return this.products.filter(p => {
        return p.name && p.name.toLowerCase().includes(query);
      });
    }
  }
}
</script>