<template>
  <h4 class="mb-5 aparecer">Porfafolio</h4>
  <form @submit.prevent="actualizarAcciones" class="aparecer container-sm d-flex flex-column align-items-center">
    <input type="text" placeholder="Símbolo" pattern="[A-Za-z]+" class="form-control input-form" v-model="simboloPortafolio" required>
    <input type="number" placeholder="Precio" class="form-control input-form" v-model.number="precioPortafolio"  step="any" required>
    <input type="number" placeholder="Cantidad" class="form-control input-form" v-model.number="cantidadPortafolio" required>
    <span class="success" v-if="correcto">Añadido con éxito</span>
    <button class="btn btn-primary">Añadir</button>
   </form>
</template>
<script setup>
import { ref } from 'vue'
import useAdmin from '@/composables/useAdmin'
import bus from './eventBus';
import useServices from '@/composables/useServices'

let simboloPortafolio = ref('')
let precioPortafolio = ref('')
let cantidadPortafolio = ref('')
let correcto = ref(false)

const actualizarAcciones = async () => {  
  const { añadirAcciones } = useAdmin()
  const { obtenerDatos, responseAcciones, porcentajesAcciones, accionesSimbolo } = useServices();

  await añadirAcciones('acciones', simboloPortafolio.value, precioPortafolio.value, cantidadPortafolio.value)
   // mostrando mensaje de exito
  correcto.value = true
  await obtenerDatos()
   // Variables para conectarse con las tablas de forma reactiva
  const getPorcentaje = porcentajesAcciones
  const getSimbolo = accionesSimbolo
  const getUpdate = responseAcciones
  // Si las variables son true es porque hubo una modificacion en el json
  if (getUpdate, getPorcentaje, getSimbolo) {
    bus.getUpdate = getUpdate[0];
    bus.getPorcentaje = getPorcentaje;
    bus.getSimbolo = getSimbolo;
    //console.log(getUpdate[0])
  }
  // Reiniciando los valores
  bus.datosEnviados = true;
  setTimeout(() => {
    correcto.value = false
    bus.getUpdate = undefined
    bus.getPorcentaje = undefined
    bus.getSimbolo = undefined
    //console.log(bus.getUpdate)
  }, 1500);
  // reseteando valores del input
  simboloPortafolio.value = ""
  precioPortafolio.value = ""
  cantidadPortafolio.value = ""
}

</script>
<style scoped lang="scss">
template{
  transition: all 2s ease;
}
.btn-primary{
  background-color: $color-secundario-1;
  border:$color-secundario-2;
}
.btn-primary:hover{
  background-color: $color-principal-1;
}
.input-form{
  width: 100%;
  margin-bottom: 1rem;
  padding: .8rem;
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