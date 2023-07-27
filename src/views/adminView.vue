<template>
<div class="container-fluid column-lg">
    <!--lado izquierdo-->
  <div class="formulario mb-4">
    <router-link :to="{name: 'home'}" class="decoration-none router">
      <img src="../assets/logo-3D_1.png" class="one"/>
      <img src="../assets/logo-3D_2.png" class="two" />
      <img src="../assets/logo-3D_3.png" class="three" />
      <p class="logo-texto">Barraza Investors</p>
    </router-link>
    <!--botones-->
    <!--<div class="aparecer container-fluid container-sm btns-container d-flex flex-row justify-content-around  align-items-center p-2 container-btns">
      <p id="portafolio" class="m-0 selected" @click="isTrue('portafolio')">Portafolio</p>
      <p id="inversionistas" class="m-0" @click="isTrue('inversionistas')">Inversionistas</p>
      <p id="historial" class="m-0" @click="isTrue('historial')">Historial</p>
    </div>-->
    <div class="aparecer container-sm d-flex flex-column align-items-center mb-5">
      <slot name="portafolio" v-if="btnPortafolio" class="aparecer">
        <FormPortafolio/>
      </slot> 
      <slot name="inversionistas" v-if="btnAccionistas" class="aparecer">
        <FormInversionistas/>
      </slot>
      <slot name="historial" v-if="btnHistorial" class="aparecer">
        <FormVentas/>
      </slot>
    </div>
  </div>
<!--lado derecho tablas-->

  <div class="aparecer container-sm d-flex flex-column align-items-center mb-5 mt-lg-5">
  <slot name="portafolio" class="aparecer" v-if="btnPortafolio">
    <PortafolioComp/>
  </slot>  
  <slot name="historial" class="aparecer" v-if="btnHistorial">
    <HistorialComp/>
    <br><br>
  </slot>
  <slot name="accionistas" class="aparecer" v-if="btnAccionistas">
      <InversionistaComp/>
      
  </slot>
  </div>

</div>
  <!--Menu abajo-->
  <footer class="aparecer container-fluid fixed-bottom p-2">
    <div class="container-sm d-flex flex-row justify-content-evenly">
      <v-icon name="fa-users" scale="2" id="svgAccionistas" @click="isTrueIcon('accionistas')"/>
      <v-icon name="bi-briefcase-fill" class="selectedIcon" scale="2" id="svgPortafolio" @click="isTrueIcon('portafolio')"/>
      <v-icon name="gi-buy-card" scale="2" id="svgHistorial" @click="isTrueIcon('historial')"/>
    </div>
  </footer>

</template>

<script setup>
import {ref} from 'vue'
import FormPortafolio from '@/components/FormPortafolio.vue'
import FormVentas from '@/components/FormVentas.vue'
import FormInversionistas from '@/components/FormInversionistas.vue'
import InversionistaComp from '@/components/InversionistaComp.vue';
import HistorialComp from '@/components/HistorialComp.vue';
import PortafolioComp from '@/components/PortafolioComp.vue';

let btnAccionistas = ref(false)
let btnPortafolio = ref(true)
let btnHistorial = ref(false)
//
const isTrueIcon = (e) => {
  if (e === 'portafolio' && !btnPortafolio.value) {
    btnHistorial.value = false
    btnPortafolio.value = true
    btnAccionistas.value = false
    document.getElementById('svgAccionistas').classList.remove('selectedIcon')
    document.getElementById('svgHistorial').classList.remove('selectedIcon')
    document.getElementById('svgPortafolio').classList.add('selectedIcon')

  } else if (e === 'historial' && !btnHistorial.value) {
    btnHistorial.value = true
    btnPortafolio.value = false
    btnAccionistas.value = false
    document.getElementById('svgPortafolio').classList.remove('selectedIcon')
    document.getElementById('svgAccionistas').classList.remove('selectedIcon')
    let svgHistorial = document.getElementById('svgHistorial')
    svgHistorial.classList.add('selectedIcon')
  }  else if (e === 'accionistas' && !btnAccionistas.value) {
    btnAccionistas.value = true
    btnPortafolio.value = false
    btnHistorial.value = false
    document.getElementById('svgPortafolio').classList.remove('selectedIcon')
    document.getElementById('svgHistorial').classList.remove('selectedIcon')
    document.getElementById('svgAccionistas').classList.add('selectedIcon')
  }
}

</script>
<style scoped lang="scss">
.column-lg{
  height: 100vh;
}

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
#fechaCompra{
  font-size: $size-placeholder;
  color: $color-placeholder;
  display: flex;
  align-items: flex-start;
}
.formulario{
  width: 100%;
}

.input-form, .form-select{
  width: 80%;
  margin-bottom: 1rem;
}
img {
  animation: aparicion 1s ease-in-out;
  position: absolute;
  width: 60%;
  height: 60%;
  transform: translate(-50%, -50%);
}

table {
  width: 100%;
  height: 100%;
  font-size: 0.6rem;
  text-align: center;
 border-collapse: separate;
}
td {
  text-align: center;
}
tr{
  font-size: 0.6rem;
  text-align: center;
}
th{
text-align: center;
  padding: 0 1rem;
}
.logo-texto{
  width: 100%;
  position: absolute;
  left: auto;
  right: auto;
  margin: auto;
  bottom: 2%;
  font-family: 'Cabin', sans-serif;
  animation: texto 2s ease-in-out;
  color: $color-placeholder;
  font-size: 1.05rem;
}

.router {
  left: auto;
  right: auto;
  margin: auto;
  position: relative;
  display: block;
  width: 150px;
  height: 150px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.one {
  left: 42%;
  top: 30%;
  animation: arriba 2s ease;
}
.two {
  left: 31.5%;
  top: 45%;
  animation: izquierda 2s ease;
}
.three {
  top: 43.5%;
  left: 61%;
  animation: derecha 2s ease;
}
    @keyframes arriba {
      0% {
        opacity: 0;
        top: 0%;
      }
      100% {
        opacity: 1;
        top: 30%;
      }
    }
    @keyframes izquierda {
      0% {
        opacity: 0;
        left: 5%;
      }
      100% {
        opacity: 1;
        left: 31.5%;
      }
    }
    @keyframes derecha {
      0% {
        opacity: 0;
        left: 75%;
      }
      100% {
        opacity: 1;
      left: 61%;
      }
    }
     @keyframes texto {
      0% {
        opacity: 0;
        bottom: -10%;
      }
      100% {
        opacity: 1;
        bottom: 2%;
      }
    }

@media screen and (min-width: 600px) {
  form{
   width: 60%;
  }

  .input-form, .form-select{
  width: 60%;
  }
  table {
    font-size: 0.8rem;
    border-spacing: 0.5rem 1rem;
  }
  .texto-logo{
    font-size: 1.2rem;
  }
}
@media screen and (min-width: 800px){
  table{
    font-size: 1rem;
  }
   
}

@media screen and (min-width: 1000px) {
  .column-lg{
    display: grid;
   grid-template-columns: 1fr 1fr;
  }

  input{
    margin-bottom: 4rem !important;
  }
  
}

</style>