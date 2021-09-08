import { Login } from './components/Login.js'
import { Hall } from './components/Hall.js'
import { setScreen } from './setScreen.js'
import { Admin } from './components/Admin.js';

firebase.auth().onAuthStateChanged((user) => {
    if (user && (user.email === 'admin@gmail.com')) {
      console.log(user);
      const admin = new Admin();
      setScreen(admin);
    } else if (user) {
      var uid = user.uid;
      const hall = new Hall();
      setScreen(hall);
    } else {
      const login = new Login();
        setScreen(login)
    }
});

db.collection("infoUser").where("email", "==", "vclong2003@gmail.com")
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data().name);
    });
})
.catch((error) => {
    console.log("Error getting documents: ", error);
});
