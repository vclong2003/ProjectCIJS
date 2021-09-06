
import { Login } from './components/Login.js'
import { Hall } from './components/Hall.js'
import { setScreen } from './setScreen.js'

/* -----------------------------------------(firebase 9)
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const hall = new Hall();
        setScreen(hall);
    } else {
        const login = new Login();
        setScreen(login)
    }
});
*/

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      const hall = new Hall();
        setScreen(hall);
      // ...
    } else {
      // User is signed out
      // ...
      const login = new Login();
        setScreen(login)
    }
  });
  
