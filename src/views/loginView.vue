<template>
  <div class="container-fluid column-lg">
    <router-link :to="{name: 'home'}" class="decoration-none router">
        <img
        src="../assets/logo-3D_1.png"
        class="one"/>
        <img src="../assets/logo-3D_2.png" class="two" />
        <img src="../assets/logo-3D_3.png" class="three" />
        <p class="aparecer logo-texto">Barraza Investors</p>
    </router-link>
    <form @submit.prevent="autenticacion" class="aparecer container-sm d-flex flex-column align-items-center mt-sm-3 mt-lg-3 mt-sm-3">
      <leyend class="mb-5 fs-3 text">Login</leyend>
   
      <input type="email" v-model="email" class="form-control input-form mb-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo" required>
      
      <div class="pass-icon-container">
      <input type="password" v-model="pass" class="form-control input-form" id="exampleInputPassword1" placeholder="Contraseña" required>
        <v-icon name="pr-eye" scale="1.8" class="pass-icon" v-if="visible" @click="showPass"/>
        <v-icon name="pr-eye-slash" scale="1.8" class="pass-icon" v-if="oculto" @click="showPass"/>
      </div>
      <span v-if="incorrecto" class="error mb-2">Datos incorrectos</span>
  
      <button type="submit" class="btn btn-primary">Acceder</button>
    </form>
  </div>

  
</template>
<script setup>
import router from '@/router'
import { ref } from 'vue'
import useLoginStore from '@/store/auth';

const store = useLoginStore() //creando instancia
let email = ref('')
let pass = ref('')
let incorrecto = ref(false)
let oculto = ref(true)
let visible = ref(false)

const showPass = () => {
  if (pass.value) {
    visible.value = !visible.value
    oculto.value = !oculto.value
      // Aqui verifico si la variable es true o false 
      //  para mostrar u ocultar, dependiendo de eso convierto 
      //el input en tipo texto para poder  mostrar el valor que se esta escribiendo
    const input = document.getElementById('exampleInputPassword1')
    if (visible.value === true) {
      input.type = 'text'
      input.value = pass.value
        
      } else {
        input.type = 'password'
      }
    }
}
const autenticacion = () => {
  const res = store.auth(email.value, pass.value) //accediendo a la función auth
  if ((res === false || res=== undefined) && !store.token) {
    incorrecto.value = true
    router.push({ name: "login" })
    setTimeout(() => {
      incorrecto.value = false
    }, 1500);
  
  } else {
    router.push({ path: "/admin" })
    //alert('¡Bienvenido a Barraza Invertors, Luis!')
  }
}
</script>
<style scoped lang="scss">
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
.column-lg{
  height: 100vh;
  p{

    color: $color-placeholder;
  }
}
.error{
  font-weight: bold;
  color: $color-error;
}
.input-form{
  width: 80%;
  margin-bottom: 1rem;
  padding: .8rem;
}

img {
  animation: aparicion 1s ease-in-out;
  position: absolute;
  width: 60%;
  height: 60%;
  transform: translate(-50%, -50%);
}

.logo-texto{
  width: 100%;
  position: absolute;
  left: auto;
  right: auto;
  margin: auto;
  bottom: 5%;
  font-size: 1rem;
  font-family: 'Cabin', sans-serif;
  animation: texto 2s ease-in-out;
}
.pass-icon-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-bottom: 2.5rem;
  input {
    margin-bottom: 0;
  }
}
.pass-icon {
  position: absolute;
  top: 50%;
  right: 2.5rem;
  transform: translateY(-45%);
  cursor: pointer;
  color: $color-placeholder;
}
.pass-icon:hover {
  color: $color-secundario-1;
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
// partes del logo
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
        bottom: 5%;
      }
    }
@media screen and (min-width: 400px) {
  .pass-icon {
    right: 3rem;
  }
}
@media screen and (min-width: 500px) {
  .pass-icon {
    right: 4rem;
  }
}
@media screen and (min-width: 600px) {
  .pass-icon {
    right: 5rem;
  }
}

@media screen and (min-width: 1000px) {
  .column-lg{
    display: grid;
   grid-template-columns: 1fr 1fr;
    align-items: center;
  }


.router {
  left: auto;
  right: auto;
  margin: auto;
  position: relative;
  width: 250px;
  height: 250px;
}
.logo-texto{
  font-size: 2rem;
}
}
//

</style>