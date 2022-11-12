import { signUpWithEmail, emailVerification, completeUserInfo } from '../firebaseconfig/auth.js';
import { userInfoFirestore } from '../firebaseconfig/post.js';
import { validateEmpty, showError } from './utils.js';

export const registroview = () => {
  const registro = /* html */`
    <div class="form register">
        <figure class="logoRegistro">
          <img src="imagenes/titulo.png" alt="perro y gato abrazadose">
        </figure>
        <form action="#">
          <div class="campo-entrada">
            <input type="text" placeholder="Ingresar nombre"  class= "userName" id="userName" >
            <i class="uil uil-user"></i>
            <span id="alertName"></span>
          </div>
          <div class="campo-entrada">
            <input type="email" placeholder="Ingresar email"  class= "email" id= "userEmail" required >
            <i class="uil uil-envelope icon"></i>
            <span id="alertEmail"></span>
          </div>
          <div class="campo-entrada">
            <input type="password" placeholder="Ingresar contraseña"  class="password" id= "userPassword" required>
            <i class="uil uil-lock icon"></i>
            <span id="alertPassword"></span>
          </div>
          <div class="campo-entrada">
            <input type="password"  placeholder="Confirmar contraseña"  class="confirmarPassword" id= "userConfirmPassword" required>
            <i class="uil uil-lock icon"></i>
            <i class="uil uil-eye-slash showHidePw"></i>
            <span id="alertConfirmPassword"></span>
          </div>
          <div class="campo-entrada campo-entrada__boton">
            <button id="btn-registrar"> Registrarse</button>
          </div>
        </form>
        <div class="login-registrar">
          <span class="text">¿Ya tienes una cuenta?</span>
          <a href="#/login" class="text">Inicia Sesion</a>
        </div>
      </div>
      <div class='modalContainer'>
      <div class='modalVerification entradaR'>
        <img src='./imagenes/verificacion.jpg'>
        <p>Se envió un código de verificación a su correo electrónico</p>
        <button class='modalButton'>Aceptar</button>
      </div>
    </div>    
      `;

  // Creando la seccion que contendra al registro
  const sectionRegistro = document.createElement('section');
  sectionRegistro.classList.add('container');
  sectionRegistro.innerHTML = registro;
  return sectionRegistro;
};
export const registroDom = () => {
  const btnRegistrar = document.querySelector('#btn-registrar');
  const modalContainer = document.querySelector('.modalContainer');
  const closeModal = document.querySelector('.modalButton');
  // Variables de los inputs
  const usernameInput = document.querySelector('#userName');
  const emailInput = document.querySelector('#userEmail');
  const passwordInput = document.querySelector('#userPassword');
  const confirmPasswordInput = document.querySelector('#userConfirmPassword');

  // Variables de Mensaje de Vacio
  const alertName = document.querySelector('#alertName');
  const alertEmail = document.querySelector('#alertEmail');
  const alertPassword = document.querySelector('#alertPassword');
  const alertConfirmPassword = document.querySelector('#alertConfirmPassword');

  btnRegistrar.addEventListener('click', (event) => {
    event.preventDefault();
    validateEmpty(usernameInput.value, alertName, 'Ingrese su usuario');
    validateEmpty(emailInput.value, alertEmail, 'Ingrese su e-mail');
    validateEmpty(passwordInput.value, alertPassword, 'Ingrese su contraseña');
    validateEmpty(confirmPasswordInput.value, alertConfirmPassword, 'Ingrese la confirmacion de su contraseña');
    // uiserNameInput.reset()
    signUpWithEmail(emailInput.value, passwordInput.value)
      .then((userCredential) => {
        emailVerification().then(() => {
          modalContainer.classList.add('reveilModal');
        });
        const uName = usernameInput.value;
        const user = userCredential.user;
        completeUserInfo({ displayName: `${uName}` });
        userInfoFirestore(user.uid, {
          email: user.email,
          name: uName,
          uid: user.uid,
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          showError(alertEmail, 'Email existente, prueba con otro');
        }
        if (error.code === 'auth/weak-password') {
          showError(alertEmail, 'La contraseña debe tener al menos 6 caracteres');
        }
      });
    closeModal.addEventListener('click', () => {
      modalContainer.classList.remove('reveilModal');
      window.location.hash = '#/login';
    });
  });
};
