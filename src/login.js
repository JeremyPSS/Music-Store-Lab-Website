import {Users} from './conexion.js'

const signin = document.getElementById('loginForm');

signin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signin['email'];
    const password = signin['password'];
    
    const person = new Users();
    person.authenticate(email.value, password.value);
});