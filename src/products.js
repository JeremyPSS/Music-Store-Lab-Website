import { obtenerProductos } from './conexion.js';
//Obtengo el div para mostrar productos
const contenedor = document.getElementById('container-main');
//Obtengo los datos de fierbase
window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await obtenerProductos();
    //Muestro por plantilla un producto
    querySnapshot.forEach((doc) => {
        createCardProducts(doc.data());
    });

})

//Template for displaying cards
const createCardProducts = (producto) => {
    const product = document.createElement('div');
    product.classList.add('max-w-sm','bg-black','shadow-lg','rounded-lg','overflow-hidden' ,'m-4');
    
    const imgProduct = document.createElement('img');
    imgProduct.src = producto.imagen;
    imgProduct.alt = producto.nombre;
    imgProduct.classList.add('w-full','h-48','object-cover');

    const pProduct = document.createElement('h2');
    pProduct.textContent = producto.nombre;
    pProduct.classList.add('text-xl','font-bold','mb-2','text-white', 'px-4');
    
    const pDescripcion = document.createElement('p');
    pDescripcion.textContent = producto.descripcion;
    pDescripcion.classList.add('text-sm','text-gray-400','mb-2','text-white', 'px-4');
    
    const pPrecio = document.createElement('p');
    pPrecio.textContent = producto.precio;
    pPrecio.classList.add('text-sm','text-gray-400','mb-2','text-white', 'px-4');
    
    const btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Editar';
    btnAgregar.setAttribute('id', `${producto.id}`);
    btnAgregar.classList.add('mt-2', 'bg-orange-500', 'text-white', 'px-4', 'py-2', 'rounded-full');

    const btnEliminar = document.createElement('a');
    btnEliminar.textContent = 'Eliminar';
    //btnEliminar.setAttribute('id', `${producto.id}`);
    btnEliminar.setAttribute('data-id', `${producto.id}`);
    btnEliminar.setAttribute('href', `confirmar.html?id=${producto.id}`);
    console.table(product.nombre);
    btnEliminar.classList.add('mt-2', 'bg-orange-500', 'text-white', 'px-4', 'py-2', 'rounded-full');
    //btnEliminar.addEventListener('click', () => {
    //    window.location.href = 'confirmar.html?id=${producto.id}';
    //});

    product.appendChild(imgProduct);
    product.appendChild(pProduct);
    product.appendChild(pDescripcion);
    product.appendChild(pPrecio);
    product.appendChild(btnAgregar);
    product.appendChild(btnEliminar);
    
    contenedor.appendChild(product);
}