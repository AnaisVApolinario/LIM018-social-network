/* eslint-disable no-param-reassign */
//  funciones de validacion
export const showError = (alerta, mensaje) => {
  alerta.style.color = 'red';
  alerta.style.fontSize = '12px';
  alerta.textContent = mensaje;
};
export const hideError = (alerta) => {
  alerta.textContent = '';
};
export const validateEmpty = (valueInput, alerts, msj) => {
  if (valueInput.length === 0) {
    showError(alerts, msj);
  } else {
    hideError(alerts);
  }
};
// Funcion para ocultar ventanas modales
export const btnModales = (boton, ventana, vista) => {
  boton.addEventListener('click', () => {
    ventana.style.display = vista;
  });
};

export const limpiarInputs = (boton, elemento) => {
  boton.addEventListener('click', () => {
    elemento.value = '';
  });
};
export const limpiarLabels = (boton, elemento) => {
  boton.addEventListener('click', () => {
    elemento.textContent = '';
  });
};
