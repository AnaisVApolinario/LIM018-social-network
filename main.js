import { changeView } from './viewControler/rutas.js';

// Cargando rutas al iniciar
window.addEventListener('load', () => {
  changeView(window.location.hash);
});

// Evento de cambio de las rutas
window.addEventListener('hashchange', () => {
  changeView(window.location.hash);
});
