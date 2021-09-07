import { TutorialForm } from './TutorialForm.js'
import { AddFriend } from './AddFriend.js'

class HallHeader {
  $container

  $user
  $userTxt
  $userName

  $currentRank
  $rankTxt
  $rankNumber

  $listItem
  $friendArea
  $addFriend
  $tutorialArea
  $tutorialForm
  $logoutArea

  constructor() {
    this.$container = document.createElement('div');
    this.$container.classList.add('hall-header')


    this.$user = document.createElement('div')
    this.$user.classList.add('flex-1', 'flex')

    this.$userTxt = document.createElement('div')
    this.$userTxt.innerHTML = 'Username: '

    this.$userName = document.createElement('div')
    this.$userName.innerHTML = ''
    this.$userName.classList.add('userName')



    this.$yourScore = document.createElement('div')

    this.$scoreTxt = document.createElement('div')
    this.$scoreTxt.innerHTML = 'Your score:'
    this.$scoreTxt.style.fontSize = '16px'
    this.$scoreTxt.style.textAlign = 'center'

    this.$score = document.createElement('div')
    this.$score.innerHTML = ' 0'
    this.$score.classList.add('rankNumber')



    this.$listItem = document.createElement('ul')
    this.$listItem.style.listStyle = 'none';
    this.$listItem.style.marginLeft = 'auto';
    this.$listItem.classList.add('flex', 'flex-1', 'flex-end')


    this.$friendArea = document.createElement('div')
    this.$friendArea.addEventListener('click', this.handleFriend)
    this.$friendArea.classList.add('items')
    this.$friendArea.innerHTML = 'Friends'
    this.$friendIcon = document.createElement('span')
    this.$friendIcon.style.marginLeft = '8px'
    this.$friendIcon.innerHTML = '<i class="fa fa-users"></i>'
    this.$friendArea.appendChild(this.$friendIcon)

    this.$addFriend = new AddFriend()
    this.$friendArea.appendChild(this.$addFriend.render())

    this.$tutorialArea = document.createElement('div')
    this.$tutorialArea.addEventListener('click', this.handleTutorial)
    this.$tutorialArea.classList.add('items')
    this.$tutorialArea.innerHTML = 'Tutorial'
    this.$TutorialIcon = document.createElement('span')
    this.$TutorialIcon.style.marginLeft = '8px'
    this.$TutorialIcon.innerHTML = '<i class="fa fa-question-circle"></i>'
    this.$tutorialArea.appendChild(this.$TutorialIcon)

    this.$tutorialForm = new TutorialForm();



    this.$logOutArea = document.createElement('div')
    this.$logOutArea.classList.add('items')
    this.$logOutArea.innerHTML = 'Logout'
    this.$logOutIcon = document.createElement('span')
    this.$logOutIcon.style.marginLeft = '8px'
    this.$logOutIcon.innerHTML = '<i class="fa fa-sign-out"></i>'
    this.$logOutArea.appendChild(this.$logOutIcon)

    this.$logOutArea.addEventListener('click', this.handleLogout);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        db.collection('infoUser').where('email', '==', firebase.auth().currentUser.email).onSnapshot(this.infoUserListener);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }

  infoUserListener = (snapshot) => {
    snapshot.docChanges().forEach((change) => {

      const infoUser = change.doc.data()
      console.log(infoUser);
      this.$userName.innerHTML = infoUser.name
    })
  }

  handleFriend = () => {
    this.$addFriend.setVisibleFriend(true)
  }

  handleTutorial = () => {
    this.$tutorialForm.setVisible(true)
  }

  handleLogout() {
    firebase.auth().signOut();
  }

  render() {
    this.$user.appendChild(this.$userTxt)
    this.$user.appendChild(this.$userName)
    this.$container.appendChild(this.$user)


    this.$yourScore.appendChild(this.$scoreTxt)
    this.$yourScore.appendChild(this.$score)
    this.$container.appendChild(this.$yourScore)


    this.$listItem.appendChild(this.$friendArea)
    this.$listItem.appendChild(this.$tutorialArea)
    this.$listItem.appendChild(this.$logOutArea)
    this.$container.appendChild(this.$listItem)
    this.$container.appendChild(this.$tutorialForm.render())
    return this.$container
  }
}
export { HallHeader }