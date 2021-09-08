import { InputGroup } from "./InputGroup.js";
import { backToHall } from './Hall.js';

class PlayWithFriends {

    $container;

    $header;
    $homeButton;
    $inviteFriendsArea;
    
    $inviteFriendsButton;
    $friendsList;
    $closeButton;

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

        this.$inviteFriendsArea = document.createElement('div');
        this.$header.appendChild(this.$inviteFriendsArea);
        this.$inviteFriendsArea.classList.add('pwf-invite-friends-area');

        this.$inviteFriendsButton = document.createElement('div');
        this.$inviteFriendsButton.innerHTML = "✚ Invite Friends";
        this.$inviteFriendsArea.appendChild(this.$inviteFriendsButton);
        this.$inviteFriendsButton.style.fontSize = 'larger';
        this.$inviteFriendsButton.style.cursor = 'pointer';
        this.$inviteFriendsButton.addEventListener('click', () => {
            this.$friendsList.style.display = 'block';
        })

        this.$friendsList = document.createElement('div');
        this.$friendsList.classList.add('pwf-friendlist');
        this.$closeButton = document.createElement('div');
        this.$closeButton.classList.add('pwf-close-button');
        this.$closeButton.innerHTML = "X";
        this.$friendsList.appendChild(this.$closeButton);
        this.$closeButton.addEventListener('click', () => {
            this.$friendsList.style.display = 'none';
        })

        this.$inviteFriendsArea.appendChild(this.$friendsList);
        
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
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              db.collection("infoUser").where("email", "==", firebase.auth().currentUser.email)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        this.$user4_me.innerHTML = doc.data().name;
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            } else {
                //
            }
          });

        this.$questionAndAnswerContainer = document.createElement('div');
        this.$questionAndAnswerContainer.classList.add('playnow-question-answer-container');

        this.$question = document.createElement('div');
        this.$question.classList.add('playnow-question');
        this.$inputAnswer = new InputGroup('text', 'Type your answer here...');
        this.$submitAnswerButton = document.createElement('button');
        this.$submitAnswerButton.innerHTML = "Submit";

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              db.collection('friends').where('a', '==', firebase.auth().currentUser.email).onSnapshot(this.friendListener);
              db.collection('friends').where('b', '==', firebase.auth().currentUser.email).onSnapshot(this.friendListener);
              // ...
            } else {
              // User is signed out
              // ...
            }
          });

        // test
        this.$question.innerHTML = "In your Firebase Realtime Database and Cloud Storage Security Rules, you can get the signed-in user's unique user ID from the auth variable, and use it to control what data a user can access.";
    }

    friendListener = (snapshot) => {
        snapshot.docChanges().forEach((change) => {

            const friends = change.doc.data()
            let friendEmail = ''
            if (firebase.auth().currentUser.email === friends.a) {
                friendEmail = friends.b
            } else {
                friendEmail = friends.a
            }
            const $div = document.createElement('div')
            $div.innerHTML = friendEmail;
            $div.classList.add('pwf-email-display');
            this.$friendsList.appendChild($div);
        })
    }

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