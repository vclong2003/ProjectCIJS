import { Item } from './Item.js'

class HallHeader {
    $container

    $user
    $userTxt
    $userName

    $currentRank
    $rankTxt
    $rankNumber

    $listItem
    $tutorialIcon
    $logOutIcon
    $friendsIcon
    $logoutArea

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('hall-header')


        this.$user = document.createElement('div')
        this.$user.classList.add('flex-1', 'flex')

        this.$userTxt = document.createElement('div')
        this.$userTxt.innerHTML = 'User: '

        this.$userName = document.createElement('div')
        this.$userName.innerHTML = 'userName@gmail.com'
        this.$userName.classList.add('userName')



        this.$currentRank = document.createElement('div')

        this.$rankTxt = document.createElement('div')
        this.$rankTxt.innerHTML = 'Current rank :'
        this.$rankTxt.style.fontSize = '16px'

        this.$rankNumber = document.createElement('div')
        this.$rankNumber.innerHTML = ' 100'
        this.$rankNumber.classList.add('rankNumber')



        this.$listItem = document.createElement('ul')
        this.$listItem.style.listStyle = 'none';
        this.$listItem.style.marginLeft = 'auto';
        this.$listItem.classList.add('flex', 'flex-1', 'flex-end')

        this.$friendsIcon = new Item('Friends', '<i class="fa fa-users"></i>')
        this.$tutorialIcon = new Item('Tutorial', '<i class="fa fa-question-circle"></i>')
        this.$logOutIcon = new Item('Log out', '<i class="fa fa-sign-out"></i>')

        this.$logoutArea = document.createElement('div');
        this.$logoutArea.innerHTML = this.$logOutIcon.render();
        
        this.$logoutArea.addEventListener('click', this.handleLogout);

    }

    handleLogout = () => {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logged out");
      }).catch((error) => {
        // An error happened.
      });
      }

    render() {
        this.$user.appendChild(this.$userTxt)
        this.$user.appendChild(this.$userName)
        this.$container.appendChild(this.$user)


        this.$currentRank.appendChild(this.$rankTxt)
        this.$currentRank.appendChild(this.$rankNumber)
        this.$container.appendChild(this.$currentRank)


        this.$listItem.appendChild(this.$friendsIcon.render())
        this.$listItem.appendChild(this.$tutorialIcon.render())
        this.$listItem.appendChild(this.$logOutIcon.render())
        this.$container.appendChild(this.$listItem)
        return this.$container
    }
}
export { HallHeader }