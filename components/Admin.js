import { InputGroup } from "./InputGroup.js";

class Admin {

    $container;
    $formQuestion;
    $inputQuesstion;
    $inputAnswer;
    $btnSubmit;
    $btnLogout;
    $btnLogoutArea;

    constructor() {

        this.$container = document.createElement('div');
        this.$container.classList.add('hall-background','form-center', 'form-register');

        this.$formQuestion = document.createElement('form');
        this.$formQuestion.classList.add('form');
        this.$formQuestion.addEventListener('submit', this.handleQuestion);

        this.$inputQuesstion = new InputGroup('text', 'please insert question');
        this.$inputAnswer = new InputGroup('text', 'please insert answer');

        this.$btnSubmit = document.createElement('button');
        this.$btnSubmit.innerHTML = 'Submit';
        this.$btnSubmit.type = 'submit';
        this.$btnSubmit.classList.add('btnForm');

        this.$btnLogoutArea = document.createElement('div');
        this.$btnLogoutArea.classList.add('mar10');

        this.$btnLogout = document.createElement('button');
        this.$btnLogout.innerHTML = 'Log out';
        this.$btnLogout.classList.add('btnForm');
        this.$btnLogout.addEventListener('click', () => { firebase.auth().signOut() });

    }

    handleQuestion = () => {

    }

    render() {

        this.$formQuestion.appendChild(this.$inputQuesstion.render());
        this.$formQuestion.appendChild(this.$inputAnswer.render());
        this.$formQuestion.appendChild(this.$btnSubmit);

        this.$btnLogoutArea.appendChild(this.$btnLogout);

        this.$container.appendChild(this.$formQuestion);
        this.$container.appendChild(this.$btnLogoutArea);

        return this.$container;

    }

}

export { Admin };