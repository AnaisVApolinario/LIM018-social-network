import { getUser } from '../firebaseconfig/post.js';

const userInSession = () => JSON.parse(sessionStorage.getItem('USER'));

export const userInfoView = (templateElement, saludo) => {
  const userContainer = templateElement;
  return getUser(userInSession())
    .then((userRef) => {
      const userTemplate = `
        <div class='userInfo'>
        <div class='perfilPerson'>
            <img src='${userRef.data().photo !== undefined ? userRef.data().photo : '../imagenes/usuario.png'}' class='icon-profile' referrerpolicy='no-referrer'>
        </div>
        <p>${saludo} ${userRef.data().name}</p>
        </div>
      `;
      userContainer.innerHTML = userTemplate;
    });
};
