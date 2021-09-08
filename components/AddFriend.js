class AddFriend {
    $container
    $form
    $input
    $btn
    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('addFriend')

        this.$listFriend = document.createElement('ul')
        this.$listFriend.style.listStyle = 'none'


        this.$form = document.createElement('form')
        this.$form.classList.add('addFriend-form')
        this.$form.addEventListener('submit', this.handleAddFriend)

        this.$input = document.createElement('input')
        this.$input.classList.add('addFriend-input')
        this.$input.placeholder = 'Add friend here '

        this.$btn = document.createElement('button')
        this.$btn.classList.add('addFriend-btn')
        this.$btn.innerHTML = '<i class="fa fa-plus-circle"></i>'

        this.$listFriendItem = []

        // firebase k support OR nen:
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;

                // firebase k support OR nen:
                db.collection('friends').where('a', '==', firebase.auth().currentUser.email).onSnapshot(this.friendListener);
                db.collection('friends').where('b', '==', firebase.auth().currentUser.email).onSnapshot(this.friendListener);
                db.collection('infoUser').onSnapshot(this.infoUserListener);
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



            const $delFriend = document.createElement('button')
            $delFriend.innerHTML = 'X'
            $delFriend.classList.add('del-friend')


            const $li = document.createElement('li')
            $li.classList.add('list-friend-item')
            $li.dataset.email = friendEmail
            const $friend = document.createElement('div')
            $friend.classList.add('friend')
            this.$listFriendItem.push($li)




            $friend.innerHTML = friendEmail
            $li.appendChild($friend)
            $li.appendChild($delFriend)
            this.$listFriend.appendChild($li)

        })
    }

    infoUserListener = (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const infoUser = change.doc.data()
            this.$listFriendItem.forEach((item) => {
                if (item.dataset.email == infoUser.email) {
                    const greenDot = document.createElement('div')
                    greenDot.classList.add('green-dot')
                    item.appendChild(greenDot)


                }
            })

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
