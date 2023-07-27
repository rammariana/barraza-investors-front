<template>
  <h4 class="mb-5 aparecer">Historial</h4>
  <form @submit.prevent="actualizarVentas" class="aparecer container-sm d-flex flex-column align-items-center">
    <select class="form-select" v-model="simboloHistorial" required @change="completarInputs">
      <option value="" placeholder-select disabled selected hidden>Símbolo</option>
      <option v-for="data in simbolos" :key="data" :value="data">{{ data }}</option>
    </select>
 
    <input type="number" placeholder="Cantidad" class="form-control input-form" v-model.number="cantidadHistorial" required>
    <input type="number" placeholder="Precio de compra" class="form-control input-form" v-model.number="precioDeCompraHistorial" step="0.01" required>
    <input type="number" placeholder="Precio de venta" class="form-control input-form" v-model.number="precioDeVentaHistorial" step="0.01" required>    
    <div id="emailHelp" class="form-text">Fecha de compra</div>

    <input type="date" format="yyyy/mm/dd" placeholder="Fecha de Compra" class="form-control input-form"  v-model="fechaCompra" required>
    <div id="emailHelp" class="form-text">Fecha de venta</div>
    <input type="date" format="yyyy/mm/dd" placeholder="Fecha de venta" class="form-control input-form" v-model="fechaVenta" required>
    <span class="success" v-if="correcto">Añadido con éxito</span>
  <button class="btn btn-primary">Añadir</button>
  <br>

</form>

</template>

<script setup>
import {ref, onMounted} from 'vue'
import useAdmin from '@/composables/useAdmin'
import JsonbinService from '@/services/GetService'
import {useServices} from '@/composables/useServices';
import bus from './eventBus';

let simboloHistorial = ref('')
let cantidadHistorial = ref('')
let precioDeCompraHistorial = ref('')
let precioDeVentaHistorial = ref('')
let fechaCompra = ref('')
let fechaVenta = ref('')
let simbolos = ref([])
let jsonbinService
let getJsonbin
let correcto = ref(false)

onMounted(async () => {
  // Obteniendo simbolos para el select de historial
  jsonbinService = new JsonbinService();
  await jsonbinService.fetchJsonbin();
  getJsonbin = jsonbinService.getJsonbin().value.acciones;

  for (let x = 0; x < getJsonbin.length; x++) {
    simbolos.value.push(getJsonbin[x].simbolo)
  }
})
// Rellenando los campos de acuerdo con la seleccion del option
const completarInputs = () => {
  for (let i = 0; i < getJsonbin.length; i++) {
    if (getJsonbin[i].simbolo === simboloHistorial.value) {
      cantidadHistorial.value = getJsonbin[i].cantidad
      precioDeCompraHistorial.value = getJsonbin[i].precio.replace(',', '.')
    }
  }
}

const actualizarVentas = async () => {
  const {añadirVentas} = useAdmin()
  const { obtenerDatos, responseVentas } = useServices();

  await añadirVentas('ventas', simboloHistorial.value.toUpperCase(), cantidadHistorial.value, precioDeCompraHistorial.value, precioDeVentaHistorial.value, fechaCompra.value, fechaVenta.value)
  await obtenerDatos();

  // mostrando mensaje de exito
  correcto.value = true
  // Variables para conectarse con las tablas de forma reactiva
  const getUpdate = responseVentas
  // Si las variables son true es porque hubo una modificacion en el json
  if (getUpdate) {
    bus.getUpdate = getUpdate[0];
  }
  // Reiniciando los valores
  setTimeout(() => {
      correcto.value = false
      bus.getUpdate = undefined
  }, 1500);
  // Reiniciando los valores del formulario
  simboloHistorial.value = ""
  cantidadHistorial.value = ""
  precioDeCompraHistorial.value = ""
  precioDeVentaHistorial.value = ""
  fechaCompra.value = ""
  fechaVenta.value = ""
}
</script>
<style lang="scss" scoped>
.input-form{
  width: 100%;
  margin-bottom: 1rem;
  padding: .8rem;
}
select{
  margin-bottom: 1rem;
}
.success{
  color: $color-success;
}

@media screen and (min-width: 600px) {
  form{
   width: 60%;
  }
} 
</style>