import { Login } from './components/Login.js'
import { Hall } from './components/Hall.js'
import { setScreen } from './setScreen.js'

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      const hall = new Hall();
      setScreen(hall);
    } else {
      const login = new Login();
        setScreen(login)
    }
  });
  
