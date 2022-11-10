import {
  getPosts,
  getPost,
  createPost,
  onGetPosts,
  updatePost,
  serverTime,
} from '../firebaseconfig/post.js';
import { dateTime } from './fechaPost.js';
import { getCurrentUser } from '../firebaseconfig/auth.js';
import { userInfoView } from '../lib/index.js';
import { btnModales, limpiarInputs, limpiarLabels } from './utils.js';

export const homeView = () => {
  const home = /* Html */`
  <section class="inicio">
  <header class="header">
    <img class="logo-top" src="imagenes/titulo.png" class="logo hidden" alt="perro y gato abrazadose">
    <span id="agregar" class="btn-img"><p>Crear</p><img src="imagenes/agregar.png"></span>
  </header> 
  <section class="secc-perfilName"> 
    <div id="perfilPerson"> 
      <img src="imagenes/usuario.png">
      <p>¡ Hola !</p>
    </div>
  </section>
  <section class="secc-publicacionFoto">
  </section>
  <div class="container-modal">
    <div class="content-modal postModal">
      <div class="tituloPublicacion">
        <h2>Publicacion</h2>
        <div id="btn-cerrar" class="btn-cerrarRed"><i class="uil uil-multiply"></i>
        </div>
      </div>
      <div class="descripcion">
        <section class="post-imagen-msj">
        <img id="imgSeleccionada"class="imgSeleccionada"src="imagenes/loginAbrazo.png" alt="Imagen seleccionada">
        <p id='msg'></p>
        </section>
        <textarea id="descripcion"class="textArea"></textarea>
      </div>
      <section class= "botonesPost">
      <input id="fichero" type="file">
      <label for="fichero" class="input-fileProfile">Agregar Imagen</label>
        <button id="btn-publicar">Publicar</button> 
      </section>
    </div>
  </div>
  <footer class="menu">
    <nav class="menuInferior ">
      <a href='#/home'><img src="imagenes/home.png"></a>
      <a href='#/servicio'><img src="imagenes/donarMano.png"></a>
      <a href='#/profile'><img src="imagenes/usuario.png"></a>
    </nav>
  </footer>
  </section>
    `;
  const sectionHome = document.createElement('section');
  sectionHome.classList.add('seccionPrincipal');
  sectionHome.innerHTML = home;
  const userInfoContainer = sectionHome.querySelector('.secc-perfilName');
  userInfoView(userInfoContainer, '🐕 Hola 🐈 ');
  return sectionHome;
};
export const homeDom = () => {
  const descripcionText = document.querySelector('#descripcion');
  const buttonPost = document.querySelector('#btn-publicar');
  const ventanaModal = document.querySelector('.container-modal');
  const btnAgregar = document.querySelector('#agregar');
  const btnCerrar = document.querySelector('#btn-cerrar');
  // const fechaPost = new Date().toLocaleString();
  const containerPosts = document.querySelector('.secc-publicacionFoto');
  const msg = document.querySelector('#msg');
  const generatePostContent = (post) => {
    // Fecha

    const likeActive = post.data().likes.includes(getCurrentUser().uid);
    const userImage = post.data().photoUser !== null ? post.data().photoUser : './imagenes/usuario.png';
    const postContent = `
      <section class="postContainer">
        <section class="secc-nombre">
          <div>
            <img src='${userImage}' referrerpolicy='no-referrer'>
          </div>
          <span id ="nameFecha">
            <span >${post.data().userName !== null ? post.data().userName : 'Usuario'}</span>
            <span id="fecha">${post.data().fechaPost}</span>
          </span>
        </section>
          <p id=${post.id} class="descripcion-texto">${post.data().content}</p>
          <span data-id=${post.id} class="spanLikeComent spanLike">
            <button data-id ="${post.id}" class="like"> <img src='${likeActive ? './imagenes/likeRojo.png' : './imagenes/like.png'}'></button>
            <p class="cantidad-likes"><span id= 'numeroLikes'>${post.data().likes.length}</span> Me gusta</p>
          </span>
      </section>
      `; return postContent;
  };

  const queryPosts = () => {
    getPosts()
      .then((postsRef) => {
        let content = '';
        postsRef.forEach((postR) => {
          content += generatePostContent(postR);
          containerPosts.innerHTML = content;

          const likeBtns = document.querySelectorAll('.like');

          const countingLikesOfPost = async (e) => {
            const idLikeBtn = e.currentTarget.dataset.id;
            const postDoc = await getPost(idLikeBtn);
            const likesOfPost = postDoc.data().likes;
            const idUser = getCurrentUser().uid;

            if (likesOfPost.includes(idUser)) {
              const compareIdLikesUsers = likesOfPost.filter((idLikeData) => idLikeData !== idUser);
              updatePost(idLikeBtn, { likes: compareIdLikesUsers });
            } else {
              updatePost(idLikeBtn, { likes: [...likesOfPost, idUser] });
            }
          };

          likeBtns.forEach((btn) => {
            btn.addEventListener('click', countingLikesOfPost);
          });
        });
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
  // Actualizar
  onGetPosts(queryPosts);

  btnModales(btnAgregar, ventanaModal, 'flex');
  btnModales(btnCerrar, ventanaModal, 'none');

  // Para limpiar los campos cuando cerramos
  limpiarInputs(btnCerrar, descripcionText);
  limpiarLabels(btnCerrar, msg);

  buttonPost.addEventListener('click', () => {
    // evaluar contenido que ingresó el usuario en textarea
    if (descripcionText.value !== '') {
      msg.classList.remove('errorMessage');
      msg.textContent = '';
      // Creando los campos de savePost()cuando le demos al btn publicar
      createPost({
        userName: getCurrentUser().displayName,
        content: descripcionText.value,
        userId: getCurrentUser().uid,
        time: serverTime,
        fechaPost: dateTime(),
        likes: [],
        photoUser: getCurrentUser().photoURL,
      })
        .then((docRef) => {
          // eslint-disable-next-line no-console
          console.log('que es ', docRef);
        })// eslint-disable-next-line no-console
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
      // Cierra la ventana modal y limpia el textArea para la proxima publicacion
      ventanaModal.style.display = 'none';
      descripcionText.value = '';
    } else {
      msg.textContent = 'Por favor, escribe un comentario';
      msg.classList.add('errorMessage');
    }
  });
};
