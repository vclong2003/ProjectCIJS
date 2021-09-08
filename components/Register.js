import { InputGroup } from './InputGroup.js'
import { Login } from './Login.js'
import { setScreen } from '../setScreen.js'

class Register {
    $container

    $formRegisterContainer

    $formRegister
    $title
    $inputGroupName
    $inputGroupEmail
    $inputGroupPassword
    $inputGroupConfirmPassword
    $btnRegister

    $linkToLogin

    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('form-center', 'form-register')

        this.$formRegisterContainer = document.createElement('div')
        this.$formRegister = document.createElement('form')
        this.$formRegister.classList.add('form')
        this.$formRegister.addEventListener('submit', this.handleRegister)

        this.$title = document.createElement('h2')
        this.$title.innerHTML = 'REGISTER '
        this.$title.style.color = 'white'
        this.$title.style.marginBottom = '16px'

        this.$inputGroupName = new InputGroup('text', 'Enter full name')
        this.$inputGroupEmail = new InputGroup('email', 'Email')
        this.$inputGroupPassword = new InputGroup('password', 'Password')
        this.$inputGroupConfirmPassword = new InputGroup('password', 'Confirm Password')

        this.$btnRegister = document.createElement('button')
        this.$btnRegister.innerHTML = 'Register'
        this.$btnRegister.type = 'submit'
        this.$btnRegister.classList.add('btnForm')

        this.$linkToLogin = document.createElement('button')
        this.$linkToLogin.addEventListener('click', this.linkToLogin)
        this.$linkToLogin.innerHTML = 'Login'
        this.$linkToLogin.classList.add('btnForm-link')

    }


    linkToLogin = () => {
        const login = new Login();
        setScreen(login)
    }

    handleRegister = (e) => {
        e.preventDefault()

        const name = this.$inputGroupName.getInputValue()
        const email = this.$inputGroupEmail.getInputValue()
        const password = this.$inputGroupPassword.getInputValue()
        const confirmPassword = this.$inputGroupConfirmPassword.getInputValue()



        this.$inputGroupName.setError()
        this.$inputGroupEmail.setError()
        this.$inputGroupPassword.setError()
        this.$inputGroupConfirmPassword.setError()

        if (!name) {
            this.$inputGroupName.setError('Name cannot be empty');
            this.$inputGroupName.value = '';
        }
        if (!email) {
            this.$inputGroupEmail.setError('Email cannot be empty');
            this.$inputGroupEmail.value = '';
        }
        if (!password) {
            this.$inputGroupPassword.setError('Password cannot be empty');
            this.$inputGroupPassword.value = '';
        }
        else if (password.length < 6) {
            this.$inputGroupPassword.setError('Password must be greater 6 character');
            this.$inputGroupPassword.value = '';
        }

        if (!confirmPassword) {
            this.$inputGroupConfirmPassword.setError('ConfirmPassword cannot be empy');
            this.$inputGroupConfirmPassword.value = '';
        }
        else if (password !== confirmPassword) {
            this.$inputGroupConfirmPassword.setError('Password and Confirm Password must be match');
            this.$inputGroupConfirmPassword.value = ''
        }


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user);
                // ...

                db.collection('infoUser')
                    .add({
                        name: this.$inputGroupName.getInputValue(),
                        email: this.$inputGroupEmail.getInputValue(),
                        isOnl: true,
                    })
                    .then(() => {
                        // this.setVisible(false)
                    });

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });

        // get data to firebase


    }

    render() {
        this.$formRegister.appendChild(this.$title)
        this.$formRegister.appendChild(this.$inputGroupName.render())
        this.$formRegister.appendChild(this.$inputGroupEmail.render())
        this.$formRegister.appendChild(this.$inputGroupPassword.render())
        this.$formRegister.appendChild(this.$inputGroupConfirmPassword.render())
        this.$formRegister.appendChild(this.$btnRegister)

        this.$formRegisterContainer.appendChild(this.$formRegister)
        this.$formRegisterContainer.appendChild(this.$linkToLogin)
        this.$container.appendChild(this.$formRegisterContainer)



        return this.$container
    }
}

export { Register }