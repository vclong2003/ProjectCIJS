class AddFriend {
    $container
    $form
    $input
    $btn
    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('addFriend')

        this.$listFriend = document.createElement('ul')


        this.$form = document.createElement('form')
        this.$form.classList.add('addFriend-form')
        this.$form.addEventListener('submit', this.handleAddFriend)

        this.$input = document.createElement('input')
        this.$input.classList.add('addFriend-input')
        this.$input.placeholder = 'Add friend here '

        this.$btn = document.createElement('button')
        this.$btn.classList.add('addFriend-btn')
        this.$btn.innerHTML = '<i class="fa fa-plus-circle"></i>'

        // firebase k support OR nen:
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
          
    }

    handleAddFriend = (e) => {
        e.preventDefault()
        db.collection('friends')
            .add({
                a: firebase.auth().currentUser.email,
                b: this.$input.value
            })
            .then(() => {
                // this.setVisible(false)
            })
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
            const $li = document.createElement('li')
            $li.innerHTML = friendEmail
            this.$listFriend.appendChild($li)
        })
    }


    setVisibleFriend(visible) {
        if (visible) {
            this.$container.style.display = 'block'
        } else {
            this.$container.style.display = 'none'

        }
    }



    render() {
        this.$form.appendChild(this.$input)
        this.$form.appendChild(this.$btn)
        this.$container.appendChild(this.$form)
        this.$container.appendChild(this.$listFriend)
        return this.$container
    }
}

export { AddFriend }
