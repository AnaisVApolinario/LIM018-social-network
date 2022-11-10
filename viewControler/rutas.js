import { components } from '../componente/componentes.js';

// Sirve para cambiar de vistas
const changeView = (route) => {
  // Creamos variable del contenedor general
  const container = document.querySelector('#contenedor');
  // Limpia la pantalla
  container.innerHTML = '';
  // Asignando los componentes a las rutas
  switch (route) {
    case '': {
      container.appendChild(components.welcome());
      break;
    }
    case '#/login':
    {
      container.appendChild(components.login()); components.loginF();
      break;
    }
    case '#/registro':
    {
      container.appendChild(components.registro()); components.registroF();
      break;
    }
    case '#/home':
    {
      container.appendChild(components.home()); components.homeF();
      break;
    }
    case '#/profile':
    {
      container.appendChild(components.profile()); components.profileF();
      break;
    }
    case '#/servicio':
    {
      container.appendChild(components.servicio()); components.servicioF();
      break;
    }
    default:
      break;
  }

  return route;
};

export { changeView };
