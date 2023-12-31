import {Users} from './conexion.js'

const registro = document.getElementById('registrof');
registro.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = registro['firstName'];
    const lastName = registro['lastName'];
    const email = registro['email'];
    const password = registro['password'];
    
    const person = new Users();
    person.addPersona(firstName.value, lastName.value, email.value, password.value);
    console.log(firstName.value, lastName.value, email.value, password.value);
});