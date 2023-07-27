<template>
  <small class="mb-4">(Valores en dólares)</small>
  <table v-if="response" class="aparecer">
    <tr>
      <th>Símbolo</th>
      <th>Precio <br> compra</th>
      <th>Precio <br> venta</th>
      <th>Cantidad</th>
      <th>Gan<br>/Pérd</th>
      <th>Rent. anual</th>
      <th>Fecha <br> compra</th>
      <th>Fecha <br> venta</th>
    </tr>
    <tr v-for="(accion, index) in response.value" :key="index">
      <td>{{ accion.simbolo }}</td>
      <td>{{ accion.precio_compra }}</td>
      <td>{{ accion.precio_venta }}</td>
      <td>{{ accion.cantidad }}</td>
      <td :class="{'verde': accion.ganancia_perdida > 0, 'rojo': accion.ganancia_perdida < 0}">{{ accion.ganancia_perdida }}</td>
      <td>{{ accion.rentabilidad_anualizada }} %</td>
      <td class="small">{{ accion.fecha_compra }}</td>
      <td class="small">{{ accion.fecha_venta }}</td>

    </tr>
  </table>

</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useServices } from '@/composables/useServices';
import { watchEffect } from 'vue';
import bus from './eventBus';

let response = reactive([]);

const actualizarTabla = async () => {
  await obtenerDatos();
  // Lógica para actualizar la tabla
  const [firstResponse] = responseVentas;
  response.value = firstResponse
 
  //console.log(response.value)
}

onMounted(async () => {
  actualizarTabla()
});

watchEffect(() => { // Vigilando cambios
  if (bus.getUpdate) {
    response.value = bus.getUpdate;
  }
 
});

const { obtenerDatos, responseVentas } = useServices();

</script>

<style scoped lang="scss">
small{
  color: $color-placeholder;
}
.small{
  font-size: 0.55rem;
}
table{
  margin-bottom: 5.5rem;
}
.verde{
  color: $color-success;
}
.rojo{
  color: $color-error;
}

@media screen and (min-width: 600px) {
  .small{
    font-size: 0.9rem;
  }
}
@media screen and (min-width: 800px) {

.small{
  font-size: 1rem;
}

}

</style>
