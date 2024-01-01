import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, collection, addDoc, doc, getDocs, getDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB9WeZPRqw3JUBj-rCSE8YKzpj-LM1GAFE",
    authDomain: "musicstore-lab.firebaseapp.com",
    projectId: "musicstore-lab",
    storageBucket: "musicstore-lab.appspot.com",
    messagingSenderId: "1094438203612",
    appId: "1:1094438203612:web:c73a06419eb6b337c88419"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const dbRef = collection(db,"instrumentos");

export class Users {
    addPersona(firstName, lastName, email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(firstName, lastName, email, password);

                return addDoc(collection(db, 'usuarios'), {
                    idC: user.uid,
                    nombre: firstName,
                    apellido: lastName,
                    correo: email,
                    contrasena: password
                });
            })
            .then(() => {
                window.location.href = "login.html";
                alert("Usuario creado correctamente")
            })
            .catch((error) => {
                console.error(error.message);
                alert("Error al registrar: " + error.message);
            });
    }
    
    authenticate(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((_) => {
                window.location.href = "instruments.html";             
                alert("¡Inicio de sesión exitoso!", "AHORA PUEDE ADMINISTRAR en la pestaña Instrumentos!!!!!.");
                
            })
            .catch((error) => {
                console.error(error.message);
                // Mostrar alerta de error de inicio de sesión
                alert("Compruebe sus credenciales porfavor");
            });
    }

    signOut() {
        signOut(auth)
            .then((_) => {
                //window.location.href = "index.html";
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
};

//Leer los datos de la BD
export const obtenerProductos = () => getDocs(collection(db,"instrumentos"));

//Identifica al divs que se mostrar cuando ya este logeado 
const userStatusDiv = document.getElementById('userStatus');
const adminStatusDiv = document.getElementById('adminStatus');

//observador de autenticacion para manejar cambios en el estado del usuario

auth.onAuthStateChanged((user) => {

    //Limpia el contenido actual del elemento
    userStatusDiv.innerHTML = '';

    //adminStatusDiv es vacio en el resto de paginas, ya que no esta deeclarado ese div
    if (adminStatusDiv !== null) {
        adminStatusDiv.innerHTML = '';
    }

    //si el usuario esta autenticado, muestra "Cerrar sesión" y un mensaje de bienvenida
    if(user){
        userStatusDiv.innerHTML = `<div class="px-0"><h3 class="text-xs">Bienvenido,<br>${user.email}</h3></div>
        <button id="signOutBtn" class="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md whitespace-nowrap bg-orange-500 shadow-orange-500 hover:bg-orange-600 hover:shadow-sm hover:shadow-orange-200 focus:bg-orange-700 focus:shadow-sm focus:shadow-orange-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                                    <span>Cerrar Session</span>
                                </button>
        `;

        //adminStatusDiv es vacio en el resto de paginas, ya que no esta deeclarado ese div
        if (adminStatusDiv !== null) {
            adminStatusDiv.innerHTML = `<button id="adminbtn" class="mt-2 bg-red-500 text-white px-4 py-2 rounded-full">ADMINISTRAR</button>
            `;
        }

        //Asocia el evento de clicl del botón de cierre de session
        const signOutBtn = document.getElementById('signOutBtn')
        signOutBtn.addEventListener('click', () => {
            new Users().signOut();
            //console.log("Holis");
            redirectToLoginPage();
        });

        const adminbtn = document.getElementById('adminbtn')
        adminbtn.addEventListener('click', () => {
            window.location.href = "admin.html";
        })

    }else{
        //Si el usuario no esta autenticado, muestra "Ingresar"
        userStatusDiv.innerHTML = `<button id="btnLogin" onclick="redirectToLoginPage()"
        class="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md whitespace-nowrap bg-orange-500 shadow-orange-500 hover:bg-orange-600 hover:shadow-sm hover:shadow-orange-200 focus:bg-orange-700 focus:shadow-sm focus:shadow-orange-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
        <span>Login</span>
        </button>
        `;
    }

});

//AGREGAR PRODUCTOS
document.addEventListener('DOMContentLoaded', function () {
    //leemos el fomulario de registro de producto
    var formulario = document.getElementById('aggProducto');

    formulario.addEventListener('submit', async  function (e) {
        e.preventDefault();

        var nombre = formulario.querySelector('#inputnombre').value;
        var descripcion = formulario.querySelector('#inputdescripcion').value;
        var img = formulario.querySelector('#inputimage').value;
        var precio = formulario.querySelector('#inputprecio').value;
        if (inputimage && inputimage.files.length > 0) {
            try {
                const file = inputimage.files[0];
                const fileName = file.name;
                const storageRef = ref(storage, `imagenes/${fileName}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                const data = {
                    nombre: nombre || "",
                    descripcion: descripcion || "",
                    imagen: downloadURL || "",
                    precio: precio || ""
                };
                await addDoc(dbRef, data)
                    .then(docRef => {
                        console.log("Insertado exitosamente");
                        window.location.href = 'admin.html';
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
                alert('Error al subir la imagen');
            };

        } else {
            alert('Seleccione una imagen');
        }

    });
});



//ELIMINAR PRODUCTO
document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productoid = urlParams.get('id');
    //const productoRef = doc(db, 'instrumentos', productoid);
    const formularioo1 = document.getElementById('eliminar');
    formularioo1.addEventListener('submit', async function (event) {
        event.preventDefault();
        const productoRef = doc(db, 'instrumentos', productoid);
        deleteDoc(productoRef)
            .then(() => {
                console.log('Eliminado');
                window.location.href = 'admin.html';
                //console.log(productoRef,productoid);
            })
            .catch((error) => {
                console.error('Error', error);
            });
    });
});
