
import { Login } from './components/Login.js'
import { Hall } from './components/Hall.js'
import { setScreen } from './setScreen.js'
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";

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

