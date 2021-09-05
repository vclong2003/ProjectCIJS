let currentScreen = null;

const myApp = document.getElementById('myApp')

const setScreen = (screen) => {
    if (currentScreen) {
        myApp.removeChild(currentScreen)
    }
    currentScreen = myApp.appendChild(screen.render())
}

export { setScreen }

