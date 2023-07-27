import JsonbinService from "@/services/GetService";
import UpdateService from "@/services/UpdateService";
/** Este composable contiene las funciones que creará las copias de acciones, ventas, accionistas, usando loas parámetros que se les pase en el componente */

export function useAdmin() {
  //funcion para añadir acciones en el campo de portafolio
  const añadirAcciones = async (
    e,
    simboloPortafolio,
    precioPortafolio,
    cantidadPortafolio
  ) => {
    const jsonbinService = new JsonbinService();
    await jsonbinService.fetchJsonbin();
    const getJsonbin = jsonbinService.getJsonbin().value;

    if (e === "acciones") {
      //verificando si existe el valor del input en los datos de jsonbin
      let val = getJsonbin[e].some((el) => {
        if (el.simbolo === simboloPortafolio.toUpperCase()) {
          return true;
        }
      });
      /*Haciendo modificaciones dentro de la copia que enviaremos al servicio de actualización*/
      if (val) {
        for (let i = 0; i < getJsonbin[e].length; i++) {
          //Si el valor existe se modifican los valores usando los del campo del formulario
          if (getJsonbin[e][i].simbolo === simboloPortafolio.toUpperCase()) {
            getJsonbin[e][i].precio =
              (Number(precioPortafolio) * Number(cantidadPortafolio) +
                Number(getJsonbin[e][i].total)) /
              (Number(cantidadPortafolio) + Number(getJsonbin[e][i].cantidad));
            //
            getJsonbin[e][i].cantidad =
              Number(cantidadPortafolio) + Number(getJsonbin[e][i].cantidad);
            //
            getJsonbin[e][i].total = Number(
              Number(precioPortafolio) * Number(cantidadPortafolio) +
                Number(getJsonbin[e][i].total)
            );
          }
        }
      } else {
        getJsonbin[e].push({
          simbolo: simboloPortafolio.toUpperCase(),
          precio: Number(precioPortafolio),
          cantidad: Number(cantidadPortafolio),
          total: Number(precioPortafolio) * Number(cantidadPortafolio),
        });

        //console.log("añadido con exito");
      }
    }
    //Enviando la actualización al jsonbin
    const updateService = new UpdateService();
    await updateService.obtenerDatos(await getJsonbin);
    const getUpdate = updateService.getData().value.acciones;
    //console.log(getUpdate);
    return getUpdate;
  };
  const añadirInversionista = async (
    e,
    nombreInversionista,
    aporteInversionista,
    reinverionInversionista
  ) => {
    //servicio
    const jsonbinService = new JsonbinService();
    await jsonbinService.fetchJsonbin();
    const getJsonbin = jsonbinService.getJsonbin().value;
    //
    if (e === "inversionistas") {
      //verificando si existe el valor del input en los datos de jsonbin

      let val = getJsonbin[e].some((el) => {
        if (el.nombre === nombreInversionista) {
          return true;
        }
      });
      if (val) {
        //Si es true xq existe añadimos los datos del formulario
        for (let i = 0; i < getJsonbin[e].length; i++) {
          if (getJsonbin[e][i].nombre === nombreInversionista) {
            getJsonbin[e][i].aporte =
              Number(getJsonbin[e][i].aporte) + Number(aporteInversionista);
            getJsonbin[e][i].reinversion =
              getJsonbin[e][i].reinversion + Number(reinverionInversionista);
          }
        }
        //console.log(getJsonbin[e]);
      } else {
        //Sino existe se agrega
        getJsonbin[e].push({
          nombre: nombreInversionista,
          aporte: aporteInversionista,
          reinversion: reinverionInversionista,
        });
        //console.log(getJsonbin);
      }
    }
    //Enviando datos al jsonbin
    const updateService = new UpdateService();
    await updateService.obtenerDatos(await getJsonbin);
  };
  const añadirVentas = async (
    e,
    simboloVentas,
    cantidadVentas,
    precioCompraVentas,
    precioVentaVentas,
    fechaCompraVentas,
    fechaVentaVentas
  ) => {
    const jsonbinService = new JsonbinService();
    await jsonbinService.fetchJsonbin();
    const getJsonbin = jsonbinService.getJsonbin().value;

    for (let i = 0; i < getJsonbin.acciones.length; i++) {
      if (getJsonbin.acciones[i].simbolo === simboloVentas) {
        getJsonbin.acciones.splice(i, 1);
        //Aquí borro la acción que estoy colocando en ventas
      }
    }
    //Aquí agrego a ventas la acción que indica el formulario
    getJsonbin[e].push({
      simbolo: simboloVentas,
      precio_compra: precioCompraVentas,
      precio_venta: precioVentaVentas,
      cantidad: cantidadVentas,
      fecha_compra: fechaCompraVentas,
      fecha_venta: fechaVentaVentas,
    });
    //console.log(getJsonbin);
    const updateService = new UpdateService();
    await updateService.obtenerDatos(await getJsonbin);
  };
  return { añadirAcciones, añadirInversionista, añadirVentas };
}
export default useAdmin;
