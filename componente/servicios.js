// import { getServicios } from '../firebaseconfig/firebase.js';
import { btnModales } from './utils.js';

export const servicioView = () => {
  const servicios = /* html */ ` 
  <section class="servicios">
  <header class="logo-perfil veterinaria">
  <p>Nuevo Servicio</p>
  <a href =""><img src="imagenes/agregarFoto.png"></a>
</header>
    <section class="serviciosContainer">
      <div class="div-veterinaria">
       <p class="nombre">Veterinaria Refiasa</p>
       <p class="lugar">Puente Piedra</p>
      </div>
      <div class="div-veterinaria">
       <p class="nombre">Veterinaria Covida</p>
       <p class="lugar">Los Olivos</p>
      </div>
    </section>
    <div class="container-modal">
      <div class="content-modal">
        <h2>Veterinaria Refiasa</h2>
        <p>Dirección</p>
        <span> Av. la Victoria 345, Puente Piedra 15118</span>
        <p> Teléfono</p>
        <span>926 644 893</span>
        <div class="btn-cerrar">
          <button class="btn-modal">Cerrar</button>
        </div>
      </div>
    </div>
    <footer class="menu">
    <nav class="menuInferior ">
      <a href='#/home'><img src="imagenes/home.png"></a>
      <a href='#/servicio'><img src="imagenes/donarMano.png"></a>
      <a href='#/profile'><img src="imagenes/usuario.png"></a>
    </nav>
  </footer>
  </section>`;
  const sectionServicios = document.createElement('section');
  sectionServicios.innerHTML = servicios;
  sectionServicios.classList.add('seccionPrincipal');
  sectionServicios.classList.add('seccVeterinaria');
  return sectionServicios;
};

export const servicioDom = async () => {
  // const querySnapshot = await getServicios();
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data());
  // });
  // const divVeterinaria = document.querySelector('.div-veterinaria');
  const serviciosContainer = document.querySelector('.serviciosContainer');
  const ventanaModal = document.querySelector('.container-modal');
  const btnCerrar = document.querySelector('.btn-cerrar');
  btnModales(serviciosContainer, ventanaModal, 'flex');
  btnModales(btnCerrar, ventanaModal, 'none');
};
