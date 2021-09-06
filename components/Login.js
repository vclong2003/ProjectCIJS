import { InputGroup } from './InputGroup.js';
import { Register } from './Register.js';
import { setScreen } from '../setScreen.js';

class Login {
    $container

    $formRegisterContainer

    $formLogin
    $title
    $inputGroupEmail
    $inputGroupPassword
    $btnLogin

    $linkToRegister

    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('form-center', 'form-register')

        this.$formLoginContainer = document.createElement('div')
        this.$formLogin = document.createElement('form')
        this.$formLogin.classList.add('form')
        this.$formLogin.addEventListener('submit', this.handleLogin);

        this.$title = document.createElement('h2')
        this.$title.innerHTML = 'LOGIN '
        this.$title.style.color = 'white'
        this.$title.style.marginBottom = '16px'

        this.$inputGroupEmail = new InputGroup('email', 'Email')
        this.$inputGroupPassword = new InputGroup('password', 'Password')


        this.$btnLogin = document.createElement('button')
        this.$btnLogin.innerHTML = 'Login'
        this.$btnLogin.type = 'submit'
        this.$btnLogin.classList.add('btnForm')

        this.$linkToRegister = document.createElement('button')
        this.$linkToRegister.addEventListener('click', this.linkToRegister)
        this.$linkToRegister.innerHTML = 'Register'
        this.$linkToRegister.classList.add('btnForm-link')
    }

    linkToRegister = () => {
        const register = new Register()
        setScreen(register)
    }

    handleLogin = (e) => {
        e.preventDefault()

        const email = this.$inputGroupEmail.getInputValue()
        const password = this.$inputGroupPassword.getInputValue()

        this.$inputGroupEmail.setError()
        this.$inputGroupPassword.setError()

        if (!email) {
            this.$inputGroupEmail.setError('Email cannot be empty')
        }
        if (!password) {
            this.$inputGroupPassword.setError('Password cannot be empty')
        }
        else if (password.length < 6) {
            this.$inputGroupPassword.setError('Password must be greater 6 character')
        }

          firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
              console.log(user)
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode);
              console.log(errorMessage);
            });
      
    }



    render() {
        this.$formLogin.appendChild(this.$title)
        this.$formLogin.appendChild(this.$inputGroupEmail.render())
        this.$formLogin.appendChild(this.$inputGroupPassword.render())
        this.$formLogin.appendChild(this.$btnLogin)

        this.$formLoginContainer.appendChild(this.$formLogin)
        this.$formLoginContainer.appendChild(this.$linkToRegister)

        this.$container.appendChild(this.$formLoginContainer)

        return this.$container
    }
}

export { Login }