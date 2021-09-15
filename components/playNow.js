import { InputGroup } from "./InputGroup.js";
import { backToHall } from './Hall.js';

class PlayNow {

    host = '';
    player = [];

    $container;

    $header;
    $homeButton;

    $content;

    $user1;
    $user2;
    $user3;
    $user4_me;

    $questionAndAnswerContainer;
    $areabtnReady;

    $question;
    $btnReady;
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

        this.$content = document.createElement('div');
        this.$content.classList.add('playnow-content');

        this.$user1 = document.createElement('div');
        this.$user1.classList.add("playnow-user-common", 'playnow-user1');
        this.$user2 = document.createElement('div');
        this.$user2.classList.add("playnow-user-common", 'playnow-user2');
        this.$user3 = document.createElement('div');
        this.$user3.classList.add("playnow-user-common", 'playnow-user3');
        this.$user4_me = document.createElement('div');
        this.$user4_me.classList.add("playnow-user-common", 'playnow-user4');
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              db.collection("infoUser").where("email", "==", firebase.auth().currentUser.email)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        this.$user4_me.innerHTML = doc.data().name;
                        this.host = doc.data().inRoom;

                        if (doc.data().inRoom !== '') {
                            db.collection('infoUser').doc(doc.data().inRoom).onSnapshot((doc) => {
                                this.$user1.innerHTML = doc.data().name;
                                console.log('ok')
                            })
                        }
                    });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            }
        });

        //Định hình form
        this.$questionAndAnswerContainer = document.createElement('div');
        this.$questionAndAnswerContainer.classList.add('playnow-question-answer-container', 'dis-hidden');

        this.$areabtnReady = document.createElement('div');
        this.$areabtnReady.classList.add('btn-form-ready');
        this.$btnReady = document.createElement('button');
        this.$btnReady.innerHTML = 'Ready';
        this.$btnReady.classList.add('btnForm-link');
        this.$btnReady.addEventListener('click', this.handlePlay);

        this.$question = document.createElement('div');
        this.$question.classList.add('playnow-question');

        this.$inputAnswer = new InputGroup('text', 'Type your answer here...');

        this.$submitAnswerButton = document.createElement('button');
        this.$submitAnswerButton.innerHTML = "Submit";
        this.$submitAnswerButton.addEventListener('click', this.handleSubmitAnswer);

        if (this.host != '') {
            db.collection("rooms").doc(this.host)
            .onSnapshot((doc) => {
                console.log(doc.data().player);
                this.player = doc.data().player;
            })
        }
        

    }

    handlePlay = () => {
        this.$questionAndAnswerContainer.style.display = 'flex';
        this.$areabtnReady.style.display = 'none';
        this.handleQuestion();

    };

    handleQuestion = () => {
        let questions = [];
        let listquestion = [];
        db.collection('questions')
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    questions.push(doc.data());
                })
                for (let i = 0; i < 5; i++) {
                    let count = Math.floor(Math.random() * questions.length);
                    listquestion.push(questions[count]);

                }
                console.log(questions);
                console.log(listquestion);
                let i = 0;
                let answer;
                while ( i < listquestion.length) {
                    this.$question.innerHTML = listquestion[i].question;
        
                    console.log(this.handleSubmitAnswer());
                    // if (this.handleSubmitAnswer === 'Input your answer') {
                    //     this.handleSubmitAnswer;
                    // }
                    // else if (this.handleSubmitAnswer === listquestion[i].answer) {
                    //     alert('Correct');
                    // } else {
                    //     alert('Wrong');
                    // }
                    i++;
                }
                
                
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        console.log(listquestion);
    };

    handleSubmitAnswer = (event) => {
        event.preventDefault();
        if (this.$inputAnswer.getInputValue() === "") {
            alert("Input your answer");
        } else {
            console.log(this.$inputAnswer.getInputValue());
            return this.$inputAnswer.getInputValue();
        }
    };

    render() {
        this.$questionAndAnswerContainer.appendChild(this.$question);
        this.$questionAndAnswerContainer.appendChild(this.$inputAnswer.render());
        this.$questionAndAnswerContainer.appendChild(this.$submitAnswerButton);
        this.$areabtnReady.appendChild(this.$btnReady);

        this.$content.appendChild(this.$questionAndAnswerContainer);
        this.$content.appendChild(this.$areabtnReady);
        this.$content.appendChild(this.$user1);
        this.$content.appendChild(this.$user2);
        this.$content.appendChild(this.$user3);
        this.$content.appendChild(this.$user4_me);

        this.$container.appendChild(this.$header);
        this.$container.appendChild(this.$content);
        return this.$container;
    }
}

export { PlayNow };