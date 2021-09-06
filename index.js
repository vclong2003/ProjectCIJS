import { Login } from './components/Login.js'
import { Hall } from './components/Hall.js'
import { setScreen } from './setScreen.js'
import { PlayNow } from './components/playNow.js';

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
      var uid = user.uid;
     /* const hall = new Hall();
        setScreen(hall); */

        const test = new PlayNow();
        setScreen(test);
    } else {
      const login = new Login();
        setScreen(login)
    }
  });
  
