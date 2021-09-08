import { InputGroup } from "./InputGroup.js";
import { backToHall } from './Hall.js';

class PlayWithFriends {

    $container;

    $header;
    $homeButton;

    $content;

    $user1;
    $user2;
    $user3;
    $user4_me;

    $questionAndAnswerContainer;

    $question;
    $inputAnswer;
    $submitAnswerButton;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add("playnow-container");

        this.$header = document.createElement('div');
        this.$header.classList.add('playnow-header');

        this.$homeButton = document.createElement('div');
        this.$homeButton.innerHTML = '◄ Home';
        this.$homeButton.classList.add('playnow-homebutton');
        this.$homeButton.addEventListener('click', backToHall)
        this.$header.appendChild(this.$homeButton);
        
        this.$content= document.createElement('div');
        this.$content.classList.add('playnow-content');
                                                    
        this.$user1 = document.createElement('div'); 
        this.$user1.classList.add("playnow-user-common", 'playnow-user1');
        this.$user2 = document.createElement('div');
        this.$user2.classList.add("playnow-user-common", 'playnow-user2');
        this.$user3 = document.createElement('div'); 
        this.$user3.classList.add("playnow-user-common", 'playnow-user3');
        this.$user4_me = document.createElement('div');
        this.$user4_me.classList.add("playnow-user-common", 'playnow-user4'); 

        this.$questionAndAnswerContainer = document.createElement('div');
        this.$questionAndAnswerContainer.classList.add('playnow-question-answer-container');

        this.$question = document.createElement('div');
        this.$question.classList.add('playnow-question');
        this.$inputAnswer = new InputGroup('text', 'Type your answer here...');
        this.$submitAnswerButton = document.createElement('button');
        this.$submitAnswerButton.innerHTML = "Submit";

//------------------------------------------------------test
        this.$user1.innerHTML = "user1@gmail.com";
        this.$user2.innerHTML = "user2@gmail.com";
        this.$user3.innerHTML = "user3@gmail.com";
        this.$question.innerHTML = "In your Firebase Realtime Database and Cloud Storage Security Rules, you can get the signed-in user's unique user ID from the auth variable, and use it to control what data a user can access???";
    }

    infoUserListener = (snapshot) => {
        snapshot.docChanges().forEach((change) => {
    
          const infoUser = change.doc.data()
          console.log(infoUser);
          this.$user4_me.innerHTML = infoUser.name;
        });
    };
        render() {
        this.$questionAndAnswerContainer.appendChild(this.$question);
        this.$questionAndAnswerContainer.appendChild(this.$inputAnswer.render());
        this.$questionAndAnswerContainer.appendChild(this.$submitAnswerButton);

        this.$content.appendChild(this.$questionAndAnswerContainer);
        this.$content.appendChild(this.$user1);
        this.$content.appendChild(this.$user2);
        this.$content.appendChild(this.$user3);
        this.$content.appendChild(this.$user4_me);

        this.$container.appendChild(this.$header);
        this.$container.appendChild(this.$content);
        return this.$container;
    }
}

export {PlayWithFriends};