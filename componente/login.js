import { logInWithEmail, signUpWithGmail, GoogleAuthProvider } from '../firebaseconfig/auth.js';
import { userInfoFirestore } from '../firebaseconfig/post.js';
import { validateEmpty } from './utils.js';

export const loginview = () => {
  const login = /* html */ `
      <div class="form login">
        <figure class="logo">
          <img src="imagenes/loginCompleto.png" alt="perro y gato abrazadose">
        </figure>
        <form action="#">
          <div class="campo-entrada">
            <input type="text" placeholder="Ingresar email" id='userGmail' required>
            <span id="alertgmail"></span>
            <i class="uil uil-envelope icon"></i>
          </div>
          <div class="campo-entrada">
            <input type="password" class="password" placeholder="Ingresar contraseña" id='userPassword' required>
            <span id="alertpassword"></span>
            <i class="uil uil-lock icon"></i>
            <i class="uil uil-eye-slash showHidePw"></i>
          </div>
            <a href="#" class="text">¿Olvidaste tu contraseña?</a>
          <div class="campo-entrada campo-entrada__boton">
            <button id="btn-login">Iniciar Sesión</button>
            <button id="btn-google"><img src="imagenes/google.png">Inicia Sesion</button>
          </div>
          <div class="login-registrar">
            <span class="text">¿No tiene una cuenta?</span>
            <a href="#/registro" class="text">Registrate</a>
          </div>
        </form>
        <div class='modalContainer'>
          <div class='modalVerification'>
            <p>Cuenta no verificada, porfavor revise su bandeja de correo electrónico</p>
            <button class='modalButton'>Aceptar</button>
          </div>
        </div>   
      </div>`;

  const sectionLogin = document.createElement('section');
  sectionLogin.classList.add('container');
  sectionLogin.innerHTML = login;
  return sectionLogin;
};
export const loginDom = () => {
  const modalContainer = document.querySelector('.modalContainer');
  const closeModal = document.querySelector('.modalButton');
  const btnLogin = document.querySelector('#btn-login');
  const btnGoogle = document.querySelector('#btn-google');
  const gmailInput = document.querySelector('#userGmail');
  const passwordInput = document.querySelector('#userPassword');
  // Variables de Mensaje de Vacio
  const alertGmail = document.querySelector('#alertgmail');
  const alertPassword = document.querySelector('#alertpassword');

  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    sessionStorage.clear();
    validateEmpty(gmailInput.value, alertGmail, 'ingrese su correo electronico');
    validateEmpty(passwordInput.value, alertPassword, 'ingrese su contraseña');
    logInWithEmail(gmailInput.value, passwordInput.value)
      .then((userCredential) => {
        const user = userCredential.user;
        sessionStorage.setItem('idUser', JSON.stringify(user.uid));
        if (user.emailVerified === false) {
          modalContainer.classList.add('reveilModal');
        } else {
          sessionStorage.setItem('USER', JSON.stringify(user.uid));
          window.location.hash = '#/home';
        }
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alertGmail.textContent = 'Email incorrecto';
        }
        if (error.code === 'auth/wrong-password') {
          alertPassword.textContent = 'Contraseña incorrecta';
        }
        if (error.code === 'auth/user-disabled') {
          alertGmail.textContent = 'Usuario deshabilitado';
        }
      });
  });

  closeModal.addEventListener('click', () => {
    modalContainer.classList.remove('reveilModal');
  });

  btnGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    signUpWithGmail()
      .then((userGoogle) => {
        // Esto le da un token de acceso de Google. Puede usarlo para acceder a la API de Google.
        sessionStorage.clear();
        GoogleAuthProvider.credentialFromResult(userGoogle);
        const user = userGoogle.user;
        sessionStorage.setItem('USER', JSON.stringify(user.uid));
        userInfoFirestore(user.uid, {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        });
        // redireccionar y ruteo
        window.location.href = '#/home';
      }).catch((error) => {
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // eslint-disable-next-line no-console
        console.log(errorMessage, email);
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });
};
