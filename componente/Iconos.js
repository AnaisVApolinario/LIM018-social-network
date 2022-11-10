export default () => {
  const viewIconos = ` 
    <figure class="tituloWeb">
    <img class="img" src="img" alt="titulo de la web">
    </figure> 
    <figure class="Iconos">
        <img class="icon" src="img" alt="agregarhistoria"></img>
        <img class="icon2" src="img" alt="notificaciones"></img>
        <img class="icon3" src="img" alt="mensajeria"></img>
    </figure>`;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewIconos;

  return divElement;
};
