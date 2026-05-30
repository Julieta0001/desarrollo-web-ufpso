import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductForm from '@/components/ProductForm.vue'

describe('ProductForm.vue', () => {
  it('debería cargar con los campos vacíos de forma predeterminada (Creación)', () => {
    const wrapper = mount(ProductForm, {
      props: { product: null, saving: false }
    })

    // Buscamos las cajas de texto
    const nameInput = wrapper.find('input[required]') // Buscando por el atributo que vimos en tu captura
    expect(nameInput.element.value).toBe('')
  })

  it('debería pre-rellenar los campos si se le pasa un producto (Edición)', async () => {
    const existingProduct = {
      name: 'Mouse Gamer',
      price: 35,
      category: 'Accesorios',
      description: 'Mouse ergonómico RGB'
    }

    const wrapper = mount(ProductForm, {
      props: { product: existingProduct, saving: false }
    })

    // Verificamos que los inputs adopten las propiedades reactivas del producto inyectado
    const nameInput = wrapper.find('input')
    expect(nameInput.element.value).toBe('Mouse Gamer')
  })

  it('debería emitir el evento "submit" con los datos del formulario al enviar', async () => {
    const wrapper = mount(ProductForm, {
      props: { product: null, saving: false }
    })

    // Simulamos la escritura del usuario modificando el estado local reactivo
    await wrapper.find('input[required]').setValue('Impresora HP')
    // El segundo input en tu formulario es el precio (type="number")
    await wrapper.findAll('input')[1].setValue(150) 

    // Simulamos el envío del formulario disparando el submit
    await wrapper.find('form').trigger('submit.prevent')

    // Verificamos que el evento personalizado se haya disparado con éxito hacia el padre
    expect(wrapper.emitted().submit).toBeTruthy()
    expect(wrapper.emitted().submit[0][0]).toMatchObject({
      name: 'Impresora HP',
      price: 150
    })
  })
})