export const welcomeView = () => {
  const welcome = /* Html */`
  <section class="welcome">
    <div class="imgBienvenida">
      <img src="../imagenes/loginCompleto.png" alt="perros abrazandose">
    </div>
      <span class="derechaW">
        <p class="parrafoPrincipal">¡ Somos una comunidad de animalistas!</p>
        <span class="parrafoReflexivo">Tú puedes cambiar su destino</span>
        <span class="btnsWelcome">
        <a href="#/login"><button class="logearWelcome">Inicia Sesión</button></a>
        <a href="#/registro"><button class="registrarWelcome">Resgistrate</button></a>
       </span>
     </span>
  </section>
  
    `;
  const sectionWelcome = document.createElement('section');
  sectionWelcome.classList.add('seccionWelcome');
  sectionWelcome.innerHTML = welcome;
  return sectionWelcome;
};
