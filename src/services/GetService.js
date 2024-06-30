import { reactive } from "vue";

// Este es el servicio para leer los datos
class JsonbinService {
  jsonbin; // cambiar
  finnhub;
  exchange;
  constructor() {
    this.jsonbin = reactive([]);
    this.finnhub = reactive({});
    this.exchange = reactive({ value: 0 });
  }

  getJsonbin() {
    return this.jsonbin;
  }
  getFinn() {
    return this.finnhub;
  }
  getExchange() {
    return this.exchange;
  }
  async fetchJsonbin() {
    // cambiar
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const url =
        "https://getpantry.cloud/apiv1/pantry/014937b6-3067-435d-8838-7a3ebcdf5c7a/basket/data";
      const fetchAll = await fetch(url);
      const response = await fetchAll.json();
      this.jsonbin.value = response;
      //console.log(this.jsonbin.value);
    } catch (err) {
      alert("Ocurrio un error con la base de datos, intentalo mas tarde");
      //console.log(err);
    }
  }
  async fetchFinnhub(e) {
    //console.log(e);
    const results = [];
    for (let i = 0; i < e.length; i++) {
      try {
        const urlFinnhub = `https://finnhub.io/api/v1/quote?symbol=${e[i].simbolo}&token=cf7brsqad3iad4t5uef0cf7brsqad3iad4t5uefg`;
        const response = await fetch(urlFinnhub);
        const jsonFinn = await response.json();
        //console.log(jsonFinn);
        results.push(jsonFinn.c);
      } catch (err) {
        alert("Ocurrio un error con Finnhub, intentalo más tarde");
        //console.log(err);
      }
    }
    this.finnhub.value = results;
  }

  async fetchExchange() {
    const results = [];

    try {
      const url =
        "https://v6.exchangerate-api.com/v6/b47a987240b7aa7792c91401/latest/USD";
      const responseExchange = await fetch(url);
      const jsonExchange = await responseExchange.json();
      results.push(jsonExchange.conversion_rates.COP);
      //console.log(results[0]);
    } catch (err) {
      // Si ocurre un error en la llamada a la api usaremos la otra api
      //alert("Ocurrio un error con Exchange rate; usaremos Open Exchange para el cambio de divisas");

      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      // Llamada a la otra api de cambio de divisas
      try {
        const url =
          "https://openexchangerates.org/api/latest.json?app_id=cd02d8464ab0407ab764afff9b706384&base=USD&symbols=COP&prettyprint=false&show_alternative=false";
        const responseExchange = await fetch(url, options);
        const json = await responseExchange.json();
        results.push(json.rates.COP);

        //console.log(results[0]);
      } catch (err) {
        alert("Ocurrio un error con Open Exchange, intentalo más tarde");
        //console.log(err);
      }
    }

    this.exchange.value = results[0];
    //console.log(this.exchange.value);
  }
}

export default JsonbinService;
