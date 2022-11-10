import { logOut, getCurrentUser } from '../firebaseconfig/auth.js';
import {
  onGetPosts,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} from '../firebaseconfig/post.js';
import { btnModales } from './utils.js';
import { userInfoView } from '../lib/index.js';

export const profileView = () => {
  const profile = /* html */ ` 
  <section class="perfil">
    <header class="logo-perfil">
      <a href =""><img src="imagenes/bar.png"></a>
    </header>
    <section class="secc-perfilName">
    </section>
    <section class= "editProfile">
      <button id="btn-editar"> Editar perfil</button> 
    </section>
    <section class="menuIntermedio"> <!--Color brown-->
    </section>
    <section class="publicaciones">
    </section>
    <div class="container-modal">
      <div class="content-modal editarModal">
        <div class="tituloEditar">
          <div id="btn-cerrar" class="btn-cerrarRed">
            <i class="uil uil-times"></i>
          </div>
          <h2>Editar Perfil</h2>
          <div class="btn-guardarVerde">
            <i class="uil uil-check"></i>
          </div>
        </div>
        <section class="contenidoPerfil">
        </section>
        <div>
          <button id ="cierreSesion" class="btn-sesion">Cerrar Sesion</button>
        </div>
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
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('seccionPrincipal');
  sectionProfile.innerHTML = profile;
  const userInfoContainer = sectionProfile.querySelector('.secc-perfilName');
  userInfoView(userInfoContainer, '🐾');
  return sectionProfile;
};

export const profileDom = () => {
  const containerPostPerfil = document.querySelector('.publicaciones');
  const ventanaModal = document.querySelector('.container-modal');
  const contenidoModal = document.querySelector('.contenidoPerfil');
  const btnEditar = document.querySelector('#btn-editar');
  const btnCerrarSesion = document.querySelector('#cierreSesion');
  const btnCerrar = document.querySelector('#btn-cerrar');

  const generateDatosUser = (post) => {
    const userImage = post.data().photoUser !== null ? post.data().photoUser : './imagenes/usuario.png';
    const datosUser = post.data().userId === getCurrentUser().uid ? `
        <div class="editarP">
          <div class="foto-perfil">
            <img src='${userImage}' alt="Foto de perfil">
          </div>
          <span>
            <input id="fichero" type="file">
            <label for="fichero" class="input-fileProfile">Cambiar Foto</label>
          </span>
        </div>
        <div class="pre-descrip nombreModal">
          <label for="nome">Nombre</label>
          <input type="text" id="nome" class="input" value='${post.data().userName}'>
        </div>
        <div class="pre-descrip">
          <label for="descrip">Acerca de ti</label>
          <textarea id="descrip" class="input"></textarea>
        </div>` : '';
    return datosUser;
  };

  const generatePostUser = (post) => {
    const likeActive = post.data().likes.includes(getCurrentUser().uid);
    const userImage = post.data().photoUser !== null ? post.data().photoUser : './imagenes/usuario.png';
    const postContent = post.data().userId === getCurrentUser().uid ? /*HTML*/ ` 
      <section class="postContainer"> 
        <section class="secc-nombre2">
          <div class="fotoPostPerfil">
            <img src='${userImage}'>
          </div>
          <section class="postHeaderPerfil">
            <div id ="nameBtns">
              <span>${post.data().userName}
              </span>
              <span class="btnEditarBorrar">
                <span class="editPost" data-id='${post.id}'>
                  <img  src="imagenes/editarRaya.png" alt="boton de editar">
                </span>
                <span class='deleteButton' data-id='${post.id}'>
                  <img src="imagenes/eliminar.png" alt="boton de eliminar">
                </span>
              </span>
            </div>
            <span id="fecha">${post.data().fechaPost}
            </span>
          </section>
        </section>
        <p class="texto">${post.data().content}</p>
        <span data-id=${post.id} class="spanLikeComent spanLike">
          <button data-id ="${post.id}" class="like"> <img src='${likeActive ? './imagenes/likeRojo.png' : './imagenes/like.png'}'></button>
          <p class="cantidad-likes"><span id= 'numeroLikes'>${post.data().likes.length}</span> Me gusta</p>
        </span>
        <div class="container-modal" data-id='${post.id}'>
          <div class="content-modal postModal">
            <div class="tituloPublicacion">
              <h2>Publicacion</h2>
              <div class="btn-cerrarRed"><i class="uil uil-multiply"></i>
              </div>
            </div>
            <div class="descripcion">
              <img id="imgSeleccionada"class="imgSeleccionada"src="imagenes/loginAbrazo.png" alt="Imagen seleccionada">
              <textarea id=${post.id}  class="textArea">${post.data().content}</textarea>
            </div>
            <section class= "botonesPost">
              <input id="fichero" type="file">
              <label for="fichero" class="input-fileProfile">Agregar Imagen</label>
              <button class="guardar" id=${`btnG-${post.id}`}>Guardar</button>
            </section>
          </div>
        </div>
      </section>` : '';
    return postContent;
  };

  const queryPosts = () => {
    getPosts()
      .then((postsRef) => {
        let content = '';
        postsRef.forEach((postR) => {
          content += generatePostUser(postR);
          containerPostPerfil.innerHTML = content;
          contenidoModal.innerHTML = generateDatosUser(postR);

          const ventanasModalEditar = document.querySelectorAll('.container-modal');
          ventanasModalEditar.forEach((modal) => {
            const btnCerar = modal.querySelector('.btn-cerrarRed');
            btnCerar.addEventListener('click', () => {
              const otroModalsito = btnCerar.closest('.container-modal');
              otroModalsito.style.display = 'none';
            });
          });

          const btnEliminarPost = document.querySelectorAll('.deleteButton');
          const btnEditarPost = document.querySelectorAll('.editPost');

          btnEliminarPost.forEach((e) => {
            e.addEventListener('click', () => {
              deletePost(e.dataset.id);
            });
          });

          const editCurrentPost = (e) => {
            const idEditBtn = e.currentTarget.dataset.id;
            const btnSave = document.getElementById(`btnG-${idEditBtn}`);
            const miModalsito = document.querySelector(`.container-modal[data-id="${idEditBtn}"]`);
            miModalsito.style.display = 'flex';
            btnSave.addEventListener('click', () => {
              const textPost = document.getElementById(idEditBtn).value;
              updatePost(idEditBtn, { content: textPost });
              miModalsito.style.display = 'none';
            });
          };
          btnEditarPost.forEach((btn) => {
            btn.addEventListener('click', editCurrentPost);
          });

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
  btnCerrarSesion.addEventListener('click', () => {
    sessionStorage.clear();
    logOut();
  });
  btnModales(btnEditar, ventanaModal, 'flex');
  btnModales(btnCerrar, ventanaModal, 'none');
};
