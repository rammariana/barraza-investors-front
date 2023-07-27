<template>
<table>
  <tr>
    <th>Total invertido</th>
    <th>Total invertido + Ganancia reinvertida</th>
    <th>Efectivo</th>
    <th>Valor Estimado del fondo</th>
  </tr>
  <tr>
    <td v-for="(valor, index) in responseTotales" :key="index">COP<br>{{ valor }}</td>
  </tr>
</table>
</template>
<script setup>
import {onMounted} from 'vue'
import {useServices} from '@/composables/useServices';

onMounted(async () => {
  await obtenerDatos();
   //console.log(responseTotales[0])
});
const { obtenerDatos, responseTotales } = useServices();
</script>
<style scoped>
.rojo{
    color: green;
}
td{
  vertical-align: bottom;
}
.verde{
  color: red;
}
</style>