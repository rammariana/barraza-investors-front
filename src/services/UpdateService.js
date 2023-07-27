import { reactive } from "vue";
/*   014937b6-3067-435d-8838-7a3ebcdf5c7a
Id getPantry json    */

//Este es el servicio para actualizar los datos
class UpdateService {
  data;
  constructor() {
    this.data = reactive({});
  }
  getData() {
    return this.data;
  }
  async obtenerDatos(copy) {
    this.data.value = copy;
    //Actualizar: hay que enviar una copia actualizada de los datos porque se borran los datos anteriores
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(copy);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const url =
        "https://getpantry.cloud/apiv1/pantry/014937b6-3067-435d-8838-7a3ebcdf5c7a/basket/data";
      const fetchAll = await fetch(url, requestOptions);
      const response = await fetchAll.json();
      console.log(response);
    } catch (err) {
      //console.log(err);
    }
  }
}
export default UpdateService;
