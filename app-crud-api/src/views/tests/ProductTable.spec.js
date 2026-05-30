import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductTable from '@/components/ProductTable.vue'

describe('ProductTable.vue', () => {
  // Datos de prueba simulados (Mock data)
  const mockProducts = [
    { id: 1, name: 'Laptop Asus', price: 800, category: 'Tecnología' },
    { id: 2, name: 'Teclado Mecánico', price: 50, category: 'Accesorios' },
    { id: 3, name: 'Monitor LG', price: 200, category: 'Tecnología' }
  ]

  it('debería renderizar la lista de productos correctamente', () => {
    const wrapper = mount(ProductTable, {
      props: { products: mockProducts }
    })

    // Verificamos que se creen las filas correspondientes en la tabla
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(3)
    expect(wrapper.text()).toContain('Laptop Asus')
    expect(wrapper.text()).toContain('Teclado Mecánico')
  })

  it('debería filtrar los productos por nombre usando el buscador', async () => {
    const wrapper = mount(ProductTable, {
      props: { products: mockProducts }
    })

    // Buscamos el input de texto e ingresamos "Laptop"
    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('Laptop')

    // Verificamos que ahora solo quede una fila visible y coincida con el filtro
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(wrapper.text()).toContain('Laptop Asus')
    expect(wrapper.text()).not.toContain('Teclado Mecánico')
  })

  it('debería mostrar un mensaje si no se encuentran coincidencias', async () => {
    const wrapper = mount(ProductTable, {
      props: { products: mockProducts }
    })

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('ProductoInexistente')

    // Verifica que muestre el texto de estado de "No se encontraron productos"
    expect(wrapper.text()).toContain('No se encontraron productos con ese nombre.')
  })
})