<template>
  <!-- seccion de imagen destacada -->
<div class="container-fluid">
    <section class="container-sm mt-4 seccion-logo">
    <div class="logo-barraza">
      <img
      src="../assets/logo-3D_1.png" class="one"/>
      <img src="../assets/logo-3D_2.png" class="two" />
      <img src="../assets/logo-3D_3.png" class="three" />
    </div>
    <p class="aparecer">Somos un fondo de inversión familiar <br> en la bolsa</p>
  </section>
</div>
  <!-- menu -->
  <div class="container-fluid nav-fluid">
    <nav class="navbar container-sm">
    <div class="d-flex flex-row align-items-center">
      <img src="@/assets/icon-logo.svg" alt="Barraza Investors"/>
      <p class="mb-0 ms-2">Barraza Investors</p>
    </div>
    <router-link :to="{name: 'login'}">
      <v-icon name="bi-person-circle" scale="2"  animation="pulse" speed="slow" hover/>
    </router-link>    
    </nav>
  </div>
  <div class="container-fluid efectivo">
    <div class="container-sm p-2">
      <EfectivoComp/>
    </div>
  </div>
    <!--tablas-->
  <div class="aparecer container-sm d-flex flex-column align-items-center mb-4">
    <slot name="portafolio" v-if="btnPortafolio" class="aparecer">
      <h4 class="m-5 aparecer">Portafolio</h4>
      <PortafolioComp/>
    </slot>  
    <slot name="historial" v-if="btnHistorial" class="aparecer">
      <h4 class="m-5 aparecer">Historial</h4>
      <HistorialComp/>
    </slot>
    <slot name="historial" v-if="btnAccionistas" class="aparecer">
      <h4 class="m-5 aparecer">Inversionistas</h4>
      <InversionistaComp/>
    </slot>
  </div>

  <footer class="aparecer container-fluid fixed-bottom p-2">
    <div class="container-sm d-flex flex-row justify-content-evenly">
      <v-icon name="fa-users" scale="2" id="svgAccionistas" @click="isTrueIcon('accionistas')"/>
      <v-icon name="bi-briefcase-fill" class="selectedIcon" scale="2" id="svgPortafolio" @click="isTrueIcon('portafolio')"/>
      <v-icon name="gi-buy-card" scale="2" id="svgHistorial" @click="isTrueIcon('historial')"/>
    </div>
  </footer>

</template>
<script setup>
import { ref } from 'vue'
import InversionistaComp from '@/components/InversionistaComp.vue';
import HistorialComp from '@/components/HistorialComp.vue';
import PortafolioComp from '@/components/PortafolioComp.vue';
import EfectivoComp from '@/components/EfectivoComp.vue'

let btnAccionistas = ref(false)
let btnPortafolio = ref(true)
let btnHistorial = ref(false)

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
.btns-container, .aparecer{
  animation: aparicion 1s ease-in-out;
}
.efectivo{
  background: $color-principal-2;
  color: $color-white;
  animation: gradient 30s both infinite, aparicion 1s ease-in-out;
  height: 15%;
  padding:1rem;
}
.navbar img{
  width: 2.4em;
}
.nav-fluid img, a, p {
  animation: desplazamiento 2s forwards;
  background-color: $color-white;
}
nav {
  padding: 1rem !important;
  &.navbar{
    color: $color-principal-1;
    svg{
    color: $color-principal-1;
    }
    svg:hover{
      color: $color-secundario-1;
    }
    a {
      font-weight: bold;
    }  
    p{
      color: $color-placeholder;
      font-family: "Cabin", sans-serif;
    }
  }  
}
.logo-barraza{
  margin: auto;
  left: auto;
  right: auto;
  position:relative;
  width: 150px;
  height:150px;
  margin-top: 6.5rem;
  img{
    width: 60%;
    height: 60%;
    position: absolute;
  }
  
}
.nav-fluid{
  transition: 0.7s ease;
  height: auto;
  background-color: $color-white;
  position: fixed;
  top:0;
  z-index: 999;
}
.selected{
  color: $color-principal-1;
  border-bottom: 2px solid $color-secundario-2 !important;
  transition: 0.5s ease-in-out;
}
.seccion-logo{
  height: 50vh;
  /*width: 100%;*/
  display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
  margin-bottom: 2rem;
  color: $color-placeholder;
  font-size: 1.05rem;
}

// partes del logo
.one {
  left: 15%;
  top: 0;
  animation: arriba 2s ease;
}
.two {
  top: 15.5%;
  left: 4.5%;
  animation: izquierda 2s ease;
}
.three {
  top: 13.8%;
  left: 34.5%;
  animation: derecha 2s ease;
}

    @keyframes arriba {
      0% {
        opacity: 0;
        top: -10%;
      }
      100% {
        opacity: 1;
        top: 0%;
      }
    }
    @keyframes izquierda {
      0% {
        opacity: 0;
        left: 0;
      }
      100% {
        opacity: 1;
        left: 4.5%;
      }
    }
    @keyframes derecha {
      0% {
        opacity: 0;
        left: 45%;
      }
      100% {
        opacity: 1;
        left: 34.5%;
      }
    }
     @keyframes texto {
      0% {
        opacity: 0;
        bottom: -10%;
      }
      100% {
        opacity: 1;
        bottom: 5%;
      }
    }

@media screen and (min-width: 600px) {
  .seccion-logo{
    height: 60vh; 
    font-size: 1.5rem;
  }

}
@media screen and (min-width: 800px){
    .seccion-logo{
      height: 70vh; 
  }
  .logo-barraza{
    width: 220px;
    height:220px;
  }
}
@media screen and (min-width: 1000px){

  .seccion-logo{
    flex-direction: row-reverse;
    font-size: 1.6rem;
    p{
      margin-bottom: 0;
      /*margin-left: 4rem;*/
      text-align: start;
    }
  }
}
</style>
