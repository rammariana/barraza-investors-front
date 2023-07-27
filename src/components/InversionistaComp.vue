<template>
  <small class="mb-4">(Valores en pesos)</small>
  <table v-if="response" class="aparecer">
    <tr>
      <th>Accionista</th>
      <th>Total aportado</th>
      <th>Aporte + reinversión</th>
      <th>Participación (%)</th>
      <th>Valor Actual</th>
    </tr>
    <tr v-for="(inversionista, index) in response.value" :key="index">
      <td>{{ inversionista.nombre }}</td>
      <td>{{ inversionista.aporte }}</td>
      <td>{{ inversionista.aporte_mas_reinversion }}</td>
      <td>{{ inversionista.porcentaje_participacion }}</td>
      <td :class="{'verde': inversionista.valor_actual > inversionista.aporte_mas_reinversion, 'rojo': inversionista.valor_actual < inversionista.aporte_mas_reinversion}">{{ inversionista.valor_actual }}</td>
    </tr>
  </table>
  <div class="container-sm canvas">
        <canvas id="accionistaChart" :options="chartOptions"></canvas>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import {useServices} from '@/composables/useServices';
import { watchEffect } from 'vue';
import bus from './eventBus';
import Chart from 'chart.js/auto';

/* Variables que capturan los datos actualizados desde FormPortafolio y se actualizan en en watchEffect */
let response = reactive([]);
let responseNombre = reactive([]);
let responsePorcentaje = reactive([]);
let myChart = null;

const actualizarTabla = async () => {
  await obtenerDatos();
  // Lógica para actualizar la tabla
  const [firstResponse] = responseInversionistas;
  response.value = firstResponse
  responseNombre.value = inversionistaNombre
  responsePorcentaje.value = porcentajeParticipacion
  //console.log(response.value)
}

const datosEnviados = ref(false)
const ctx = ref(null);

onMounted(async () => {
  await actualizarTabla();
  //console.log(responseNombre, responsePorcentaje)

  ctx.value = document.getElementById('accionistaChart');
  const data = reactive({
    labels: responseNombre.value,
    datasets: [{
      label: '',
      data: responsePorcentaje.value,
      backgroundColor: [
        'rgb(79, 247, 71)',// verde manzana
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
    responseNombre.value = bus.getNombre
    responsePorcentaje.value = bus.getPorcentaje
    //console.log(response.value);
    datosEnviados.value = false; // Reiniciar el estado de datosEnviados, esto es para 

  }
  if (myChart) {
    myChart.data.labels = responseNombre.value
    myChart.data.datasets[0].data = responsePorcentaje.value
    myChart.update()
  }
})

    const { obtenerDatos, responseInversionistas, inversionistaNombre, porcentajeParticipacion } = useServices();

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