<template>
<router-view/>
</template>
<script setup>
/*window.addEventListener("scroll", () => {
  let header = document.querySelector('.nav-fluid');
  header.classList.toggle('abajo', window.scrollY>150)
})
*/
</script>
<style lang="scss">
/*Estilos globales del proyecto*/
html, *, 
::after, 
::before{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.aparecer{
  animation: aparicion 1s ease-in-out;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: aparicion 1s ease-in-out;
}
.btn-primary{
  background-color: $color-secundario-1;
  border:$color-secundario-2;
}
.btn-primary:hover{
  background-color: $color-principal-1;
}

.container-btns p{
  cursor: pointer;
   border-bottom: 2px solid transparent;
}
.container-btns p:hover {
  color: $color-principal-1;
}
.decoration-none {
  text-decoration: none;
}
.decoration-none:visited{
  color:#2c3e50;
;
}
footer{
  background-color: $color-footer;
  color: $color-principal-1;
  svg:hover{
  color: $color-secundario-1;
  text-shadow: 1px 1px 5px red;
  }
}
form {
  margin-bottom: 3rem;
}
h4 {
  color: $color-black;
}
input:focus, select:focus {
  box-shadow: 0 0 5px 0 $color-secundario-1 !important; 
}
table {
  width: 100%;
  height: 100%;
  font-size: 0.6rem;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0.2rem;
}
td, th{
  padding: 0.2rem;
}
td {
  text-align: center;
}
tr{
  text-align: center;
}
th{
  text-align: center;
}
.selectedIcon{
  color: $color-secundario-1 !important;
  transition: 0.5s ease-in-out;
}

@media screen and (min-width: 600px) {

    table {
    font-size: 0.8rem;
    border-spacing: 0.5rem 1rem;
  }
}
@media screen and (min-width: 800px) {

  table {
    font-size: 0.9rem;
    border-spacing: 0.5rem 1rem;
  }
}
@media screen and (min-width: 1000px) {

  table {
    font-size: 1rem;
    border-spacing: 0.5rem 1rem;
  }
  th {
    padding-bottom: 1rem;
  }
}

</style>
