class AddFriend {
    $container
    $listFriend
    $form
    $input
    $btn
    listFriendItem
    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('addFriend')



        this.$listFriend = document.createElement('ul')
        this.$listFriend.classList.add('list-friend')



        this.$form = document.createElement('form')
        this.$form.classList.add('addFriend-form')
        this.$form.addEventListener('submit', this.handleAddFriend)

        this.$btnCloseAddFriend = document.createElement('button')
        this.$btnCloseAddFriend.addEventListener('click', this.closeAddFriend)

        this.$btnCloseAddFriend.classList.add('closeAddFriend-btn')
        this.$btnCloseAddFriend.innerHTML = '<i class="fa fa-times-circle"></i>'

        this.$input = document.createElement('input')
        this.$input.classList.add('addFriend-input')
        this.$input.placeholder = 'Add friend here '



        this.listFriendItem = []

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

    closeAddFriend = () => {
        this.setVisibleFriend(false)

    }

    handleAddFriend = (e) => {
        e.preventDefault()
        if (this.$input.value.trim() == '') return
        db.collection('friends')
            .add({
                a: firebase.auth().currentUser.email,
                b: this.$input.value
            })
            .then(() => {
                // this.setVisible(false)
            })

        this.$input.value = ''

    }


    friendListener = (snapshot) => {
        snapshot.docChanges().forEach((change) => {

            const friends = change.doc.data()
            const id = change.doc.id
            console.log(id);
            let friendEmail = ''
            if (firebase.auth().currentUser.email === friends.a) {
                friendEmail = friends.b
            } else {
                friendEmail = friends.a
            }


            const $li = document.createElement('li')
            $li.classList.add('list-friend-item')

            $li.dataset.email = friendEmail

            const $friend = document.createElement('div')
            $friend.classList.add('friend')
            this.listFriendItem.push($li)

            const $delFriend = document.createElement('button')
            $delFriend.addEventListener('click', () => {
                this.handleDelFriend(friendEmail, $li, id)
            })
            $delFriend.innerHTML = 'X'
            $delFriend.classList.add('del-friend')


            $friend.innerHTML = friendEmail
            $li.appendChild($friend)
            $li.appendChild($delFriend)
            this.$listFriend.appendChild($li)

        })
    }

    handleDelFriend = (friendEmail, $li, id) => {

        this.listFriendItem.forEach((listFriend) => {
            if (friendEmail == listFriend.dataset.email) {
                $li.remove()
            }
        })

        db.collection("friends").doc(id).delete()
            .then(() => {
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        // db.doc().update({ name: firebase.firestore.FieldValue.delete() })

    }



    infoUserListener = (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const infoUser = change.doc.data()

            if (infoUser.isOnl == true) {
                this.listFriendItem.forEach((item) => {
                    // console.log(infoUser.email);
                    if (item.dataset.email == infoUser.email) {
                        const greenDot = document.createElement('div')
                        greenDot.classList.add('green-dot')
                        item.appendChild(greenDot)

                    }
                })
            }
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
        this.$container.appendChild(this.$btnCloseAddFriend)
        this.$form.appendChild(this.$input)
        this.$container.appendChild(this.$form)
        this.$container.appendChild(this.$listFriend)
        return this.$container
    }
}

export { AddFriend }
