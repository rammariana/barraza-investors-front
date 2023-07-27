<template>
  <small class="mb-4">(Valores en dólares)</small>
  <table v-if="response" class="aparecer">
    <tr>
      <th>Símbolo</th>
      <th>N°</th>
      <th>Precio compra</th>
      <th>Precio actual</th>
      <th>Variación</th>
      <th>V. total de compra</th>
      <th>V. total actual</th>
      <th>G (%)</th>
      <th>G ($)</th>
    </tr>
    <tr v-for="(accion, index) in response.value" :key="index">
      <td>{{ accion.simbolo }}</td>
      <td>{{ accion.cantidad }}</td>
      <td>{{ accion.precio_compra }}</td>
      <td>{{ accion.precio_actual }}</td>
      <td :class="{'verde': accion.variacion > 0, 'rojo': accion.variacion < 0}">{{ accion.variacion }}</td>
      <td>{{ accion.total_compra }}</td>
      <td>{{ accion.total_actual }}</td>
      <td :class="{'verde': accion.ganancia_porcentaje > 0, 'rojo': accion.ganancia_porcentaje < 0}">{{ accion.ganancia_porcentaje }}</td>
      <td :class="{'verde': accion.ganancia_dolares > 0, 'rojo': accion.ganancia_dolares < 0}">{{ accion.ganancia_dolares }}</td>
    </tr>
  </table>
  <div class="container-sm canvas">
    <canvas id="portafolioChart" :options="chartOptions"></canvas>
  </div>

</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useServices } from '@/composables/useServices';
import { watchEffect } from 'vue';
import bus from './eventBus';
import Chart from 'chart.js/auto';


/* Variables que capturan los datos actualizados desde FormPortafolio y se actualizan en en watchEffect */
let response = reactive([]);
let responseSimbolo = reactive([]);
let responsePorcentaje = reactive([]);
let myChart = null;

const actualizarTabla = async () => {
  await obtenerDatos();
  // Lógica para actualizar la tabla
  const [firstResponse] = responseAcciones;

  response.value = firstResponse
  responseSimbolo.value = accionesSimbolo
  responsePorcentaje.value = porcentajesAcciones
  //console.log(response.value)
}

const datosEnviados = ref(false)
const ctx = ref(null);

onMounted(async () => {
  await actualizarTabla();

  ctx.value = document.getElementById('portafolioChart');
  const data = reactive({
    labels: responseSimbolo.value,
    datasets: [{
      label: '',
      data: responsePorcentaje.value,
      backgroundColor: [
        'rgb(79, 247, 71)', // verde manzana
        'rgb(71, 247, 146)', //verde mar
        'rgb(71, 247, 212)', //cian
        'rgb(55, 183, 227)',// celeste
        'rgb(71, 84, 247)',//azul
        'rgb(111, 116, 177)',//morado
        'rgb(247, 87, 249)',// lila
       'rgb(247, 71, 196)', //magenta
       'rgb(255, 99, 132)',//rosado
       'rgb(247, 172, 71)', //naranja
       'rgb(247, 210, 71)',// amarillo
       'rgb(199, 247, 71)', //verde limon
      ],
      hoverOffset: 4,
      borderRadius: 4, 
      hoverBackgroundColor: 'rgb(44, 62, 80)',
      cutout: '70%',

    }],

  })
  const chartOptions = reactive({
    responsive: true,
    legend: {
      position: 'left',
    }
  })
  const chartConfig = {
    type: 'doughnut',
    data: data,
    options:chartOptions,
   }
   
  myChart = new Chart(ctx.value, chartConfig)
  
});


watchEffect(() => { // Vigilando cambios
  if (bus.getUpdate) {
    response.value = bus.getUpdate;
    responseSimbolo.value = bus.getSimbolo
    responsePorcentaje.value = bus.getPorcentaje
    //console.log(response.value);
    datosEnviados.value = false; // Reiniciar el estado de datosEnviados
  }
  if (myChart) {
    myChart.data.labels = responseSimbolo.value
    myChart.data.datasets[0].data = responsePorcentaje.value
    myChart.update()
  }
});
const { obtenerDatos, responseAcciones, porcentajesAcciones, accionesSimbolo } = useServices();

</script>
<style scoped lang="scss">
  canvas{
    width: 300px;
    height: 300px;
  }
  .canvas{
    position: relative; 
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60vh;
    margin-bottom: 5.5rem;
  }

.rojo{
  color: $color-error;
}
small{
  color: $color-placeholder;
}
table{
  margin-bottom: 5.5rem;
}
.verde{
  color: $color-success;
}
</style>
