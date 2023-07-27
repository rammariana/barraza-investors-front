import { reactive, ref, toRef } from "vue";
import JsonbinService from "@/services/GetService";
/** En este composable hago las operaciones necesarias para obtener los porcentajes, variaciones, etc. de cada accion y para obtener tambien los datos que necesitaré para crearlos graficos */
/* toRef */

export function useServices() {
  //array de valores de jsonbin
  let accionesPrecio = reactive([]),
    accionesCantidad = reactive([]),
    accionesTotal = reactive([]),
    accionesSimbolo = reactive([]),
    inversionistaNombre = reactive([]),
    inversionistasAporte = reactive([]),
    inversionistasReinversion = reactive([]),
    ventasPrecioCompra = reactive([]),
    ventasPrecioVenta = reactive([]),
    ventasCantidad = reactive([]),
    fechaCompra = reactive([]),
    fechaVenta = reactive([]),
    fechaInicio = reactive([]),
    fechaFin = reactive([]),
    diferencia = reactive([]),
    valorTotalActual = reactive([]);
  //array de valores computados
  let variacion = reactive([]),
    ganaciaPerdida = reactive([]),
    gananciaPorcentaje = reactive([]),
    gananciaDolares = reactive([]),
    aporteMasReinversion = reactive([]),
    totalAporteMasReinversion = ref(0),
    totalDeTotal = ref(0),
    porcentajeParticipacion = reactive([]),
    valorEstimadoFondo = ref(0),
    sumaDeValorTotalActual = ref(0),
    valorTotalActualCop = ref(0),
    valorTotalCompraCop = ref(0),
    totalAporte = ref(0),
    accionistasValorActual = reactive([]),
    rentabilidadTotal = reactive([]),
    porcentajesAcciones = reactive([]),
    rentabilidadAnualizada = reactive([]);
  // Array de datos de acciones, inversionistas, ventas

  let responseAcciones = reactive([]),
    responseInversionistas = reactive([]),
    responseVentas = reactive([]),
    responseTotales = reactive([]);
  let finnhubValue = reactive({}),
    socket;
  //
  const obtenerDatos = async () => {
    const jsonbinService = new JsonbinService();
    await jsonbinService.fetchJsonbin();
    const getJsonbin = jsonbinService.getJsonbin();
    await jsonbinService.fetchFinnhub(await getJsonbin.value.acciones);
    const getFinn = jsonbinService.getFinn();
    await jsonbinService.fetchExchange();
    const getExchange = jsonbinService.getExchange();
    finnhubValue.value = reactive(getFinn);
    responseAcciones.push(getJsonbin.value.acciones);
    responseInversionistas.push(getJsonbin.value.inversionistas);
    responseVentas.push(getJsonbin.value.ventas);

    //console.log(finnhubValue.value);
    //empujando valores individuales

    for (let i = 0; i < getJsonbin.value.acciones.length; i++) {
      accionesSimbolo.push(await getJsonbin.value.acciones[i].simbolo);
      accionesPrecio.push(await getJsonbin.value.acciones[i].precio);
      accionesCantidad.push(await getJsonbin.value.acciones[i].cantidad);
      accionesTotal.push(await getJsonbin.value.acciones[i].total);
      totalDeTotal.value += accionesTotal[i];
    }

    for (let j = 0; j < getJsonbin.value.inversionistas.length; j++) {
      inversionistaNombre.push(getJsonbin.value.inversionistas[j].nombre);
      inversionistasAporte.push(
        Number(await getJsonbin.value.inversionistas[j].aporte)
      );
      inversionistasReinversion.push(
        Number(await getJsonbin.value.inversionistas[j].reinversion)
      );
      // Sacando suma de aporte más reinversion
      totalAporteMasReinversion.value +=
        inversionistasReinversion[j] + inversionistasAporte[j];
      totalAporte.value += inversionistasAporte[j];

      aporteMasReinversion.push(
        Number(
          (inversionistasReinversion[j] + inversionistasAporte[j]).toFixed(2)
        )
      );
    }
    //console.log(inversionistasReinversion);

    for (let k = 0; k < getJsonbin.value.ventas.length; k++) {
      fechaInicio.push(
        new Date(getJsonbin.value.ventas[k].fecha_compra).getTime()
      );
      fechaFin.push(new Date(getJsonbin.value.ventas[k].fecha_venta).getTime());
      ventasPrecioCompra.push(await getJsonbin.value.ventas[k].precio_compra);
      ventasPrecioVenta.push(await getJsonbin.value.ventas[k].precio_venta);
      ventasCantidad.push(await getJsonbin.value.ventas[k].cantidad);
      fechaCompra.push(
        await getJsonbin.value.ventas[k].fecha_compra.substring(2)
      );
      fechaVenta.push(
        await getJsonbin.value.ventas[k].fecha_venta.substring(2)
      );
      // Datos computados de ventas
      rentabilidadTotal.push(
        (ventasPrecioVenta[k] * ventasCantidad[k] -
          ventasPrecioCompra[k] * ventasCantidad[k]) /
          (ventasPrecioCompra[k] * ventasCantidad[k])
      );
      diferencia.push((fechaFin[k] - fechaInicio[k]) / (1000 * 60 * 60 * 24));

      // Sacando rentabilidad anualizada con potencia
      let cortar = (
        Math.pow(1 + rentabilidadTotal[k], 1 / (diferencia[k] * 0.00274) - 1) *
        100
      )
        .toFixed()
        .replace(".", "")
        .slice(0, 5);

      let formato = new Intl.NumberFormat("es", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      });

      rentabilidadAnualizada.push(formato.format(cortar).slice(0, -3));
      //console.log(rentabilidadAnualizada);

      ganaciaPerdida.push(
        (
          getJsonbin.value.ventas[k].precio_venta * ventasCantidad[k] -
          getJsonbin.value.ventas[k].precio_compra * ventasCantidad[k]
        ).toFixed(2)
      );
    }

    //Computando datos aqui
    for (let x = 0; x < getFinn.value.length; x++) {
      //Tabla portafolio
      variacion.push((getFinn.value[x] - accionesPrecio[x]).toFixed(2));
      valorTotalActual.push(
        (getFinn.value[x] * accionesCantidad[x]).toFixed(2)
      );
      gananciaPorcentaje.push(
        (
          ((getFinn.value[x] * accionesCantidad[x]) / accionesTotal[x] - 1) *
          100
        ).toFixed(2)
      );
      gananciaDolares.push((valorTotalActual[x] - accionesTotal[x]).toFixed(2));
      //inversionistas
      sumaDeValorTotalActual.value += getFinn.value[x] * accionesCantidad[x];

      valorTotalActualCop.value =
        sumaDeValorTotalActual.value * getExchange.value;
      valorTotalCompraCop.value = totalDeTotal.value * getExchange.value;

      valorEstimadoFondo.value =
        Number(valorTotalActualCop.value) +
        (Number(totalAporteMasReinversion.value) -
          Number(valorTotalCompraCop.value));
    }
    //metiendo los nuevos valores a las respuestas de acciones, ventas, accionistas para recorrerlos con v-for en las tablas
    //console.log(aporteMasReinversion);

    for (let l = 0; l < responseAcciones[0].length; l++) {
      porcentajesAcciones.push(
        Number(
          (valorTotalActual[l] / sumaDeValorTotalActual.value) * 100
        ).toFixed(2)
      );
      responseAcciones[0][l].variacion = variacion[l];
      responseAcciones[0][l].precio_compra = Number(
        accionesPrecio[l].toFixed(2)
      );
      responseAcciones[0][l].precio_actual = Number(
        finnhubValue.value.value[l].toFixed(2)
      );
      responseAcciones[0][l].total_compra = Number(accionesTotal[l].toFixed(2));
      responseAcciones[0][l].total_actual = valorTotalActual[l];
      responseAcciones[0][l].ganancia_porcentaje = gananciaPorcentaje[l];
      responseAcciones[0][l].ganancia_dolares = gananciaDolares[l];
    }
    //console.log(responseAcciones[0]);

    for (let n = 0; n < responseInversionistas[0].length; n++) {
      accionistasValorActual.push(
        (
          (((inversionistasReinversion[n] + inversionistasAporte[n]) /
            totalAporteMasReinversion.value) *
            100 *
            valorEstimadoFondo.value) /
          100
        ).toFixed(2)
      );
      porcentajeParticipacion.push(
        (
          ((inversionistasReinversion[n] + inversionistasAporte[n]) /
            totalAporteMasReinversion.value) *
          100
        ).toFixed(2)
      );

      responseInversionistas[0][n].aporte_mas_reinversion =
        new Intl.NumberFormat("de-DE").format(aporteMasReinversion[n]);
      responseInversionistas[0][n].porcentaje_participacion =
        porcentajeParticipacion[n];
      responseInversionistas[0][n].valor_actual = new Intl.NumberFormat(
        "de-DE"
      ).format(accionistasValorActual[n]);
      responseInversionistas[0][n].aporte = new Intl.NumberFormat(
        "de-DE"
      ).format(inversionistasAporte[n]);
      //console.log(        new Intl.NumberFormat("de-DE").format(aporteMasReinversion[n])      );
      // console.log(aporteMasReinversion);
    }

    for (let x = 0; x < responseVentas[0].length; x++) {
      responseVentas[0][x].ganancia_perdida = ganaciaPerdida[x];
      responseVentas[0][x].rentabilidad_anualizada = rentabilidadAnualizada[x];
      responseVentas[0][x].fecha_compra = fechaCompra[x];
      responseVentas[0][x].fecha_venta = fechaVenta[x];
    }

    responseTotales.push(
      new Intl.NumberFormat("de-DE").format(totalAporte.value.toFixed(2)),

      new Intl.NumberFormat("de-DE").format(
        totalAporteMasReinversion.value.toFixed(2)
      ),
      new Intl.NumberFormat("de-DE").format(
        (totalAporteMasReinversion.value - valorTotalCompraCop.value).toFixed(2)
      ),
      new Intl.NumberFormat("de-DE").format(valorEstimadoFondo.value.toFixed(2))
    );

    socket = new WebSocket(
      "wss://ws.finnhub.io?token=cf7brsqad3iad4t5uef0cf7brsqad3iad4t5uefg"
    );

    // Abriendo coneccion
    socket.addEventListener("open", () => {
      for (let i = 0; i < responseAcciones[0].length; i++) {
        socket.send(
          JSON.stringify({
            type: "subscribe",
            symbol: responseAcciones[0][i].simbolo,
          })
        );
      }
    });

    // Escuchando los mensajes
    // Aqui vigilo y reasigno los valores que cambian en el websocket a sus correspondientes variables
    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.type === "trade") {
        //console.log(message.data, responseAcciones);
        for (let i = 0; i < finnhubValue.value.value.length; i++) {
          //console.log(message.data[0]);
          if (responseAcciones[0][i].simbolo === message.data[0].s) {
            finnhubValue.value.value[i] = message.data[0].p;
            // Reasignando los valores
            responseAcciones[0][i].precio_actual = Number(
              finnhubValue.value.value[i].toFixed(2)
            );
            responseAcciones[0][i].variacion = (
              finnhubValue.value.value[i] - accionesPrecio[i]
            ).toFixed(2);
            responseAcciones[0][i].total_actual = (
              finnhubValue.value.value[i] * accionesCantidad[i]
            ).toFixed(2);
            responseAcciones[0][i].ganancia_porcentaje = (
              ((finnhubValue.value.value[i] * accionesCantidad[i]) /
                accionesTotal[i] -
                1) *
              100
            ).toFixed(2);
            responseAcciones[0][i].ganancia_dolares = (
              finnhubValue.value.value[i] * accionesCantidad[i] -
              accionesTotal[i]
            ).toFixed(2);
          }
        }
      }
    });
  };
  return {
    obtenerDatos,
    responseAcciones,
    finnhubValueRef: toRef(finnhubValue), // Esta variable es la que cambia en el websocket
    responseInversionistas,
    responseVentas,
    responseTotales,
    porcentajesAcciones,
    accionesSimbolo,
    inversionistaNombre,
    porcentajeParticipacion,
  };
}

export default useServices;
