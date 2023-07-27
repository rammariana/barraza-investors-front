<template>
  <h4 class="mb-5 aparecer">Accionistas</h4>
 <form @submit.prevent="actualizarInversionista" class="aparecer container-sm d-flex flex-column align-items-center">
          <select class="form-select" id="nombreInversionista" v-model="nombreInversionista" required>
          <option value="" placeholder-select disabled selected hidden>Nombre</option>
          <option v-for="el in nombres" :key="el" :value="el">{{ el }}</option>
        </select>
        <input type="number" placeholder="Aporte" class="form-control input-form" v-model.number="aporteInversionista">
        <input type="number" placeholder="Reinversión" class="form-control input-form" v-model.number="reinversionInversionista" step="0.01">
        <span class="success" v-if="correcto">Añadido con éxito</span>
        <button class="btn btn-primary">Añadir</button>
      </form>
</template>

<script setup>
import {ref} from 'vue'
import useAdmin from '@/composables/useAdmin'
import bus from './eventBus';
import useServices from '@/composables/useServices'

let nombreInversionista = ref('')
let aporteInversionista = ref('')
let reinversionInversionista = ref('')
let correcto = ref(false)
let nombres = ['Inversionista1', 'Inversionista2', 'Inversionista3', 'Inversionista4', 'Inversionista5', 'Inversionista6', 'Inversionista7', 'Inversionista8', 'Inversionista9', 'Inversionista10', 'Inversionista11', 'Inversionista12', 'Inversionista13', 'Inversionista14', 'Inversionista15']

const actualizarInversionista = async () => {  
  const { añadirInversionista } = useAdmin()
  const { obtenerDatos, responseInversionistas, inversionistaNombre, porcentajeParticipacion } = useServices();
   
  await añadirInversionista('inversionistas', nombreInversionista.value, aporteInversionista.value, reinversionInversionista.value)

  correcto.value = true
  await obtenerDatos()
  const getUpdate = responseInversionistas
  const getNombre = inversionistaNombre
  const getPorcentaje = porcentajeParticipacion
   // Si las variables son true es porque hubo una modificacion en el json
  if (getUpdate, getNombre, getPorcentaje) {
    bus.getUpdate = getUpdate[0];
    bus.getNombre = getNombre;
    bus.getPorcentaje = getPorcentaje;
    // console.log(getUpdate[0], getNombre, getPorcentaje)
   }
  bus.datosEnviados = true;
  // Reiniciando los valores
  setTimeout(() => {
      correcto.value = false
      bus.getUpdate = undefined
      bus.getNombre = undefined
      bus.getPorcentaje = undefined
      //console.log(bus.getUpdate)
    }, 1500);
  //Reiniciando campos del formulario
  nombreInversionista.value = ""
  aporteInversionista.value = ""
  reinversionInversionista.value = ""
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