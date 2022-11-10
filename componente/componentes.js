// Importamos los componentes que pondremos en las rutas
import { homeView, homeDom } from './home.js';
import { loginview, loginDom } from './login.js';
import { registroview, registroDom } from './registro.js';
import { profileView, profileDom } from './profile.js';
import { servicioView, servicioDom } from './servicios.js';
import { welcomeView } from './welcome.js';

const components = {
  home: homeView,
  homeF: homeDom,
  login: loginview,
  loginF: loginDom,
  registro: registroview,
  registroF: registroDom,
  profile: profileView,
  profileF: profileDom,
  servicio: servicioView,
  servicioF: servicioDom,
  welcome: welcomeView,
};

export { components };
