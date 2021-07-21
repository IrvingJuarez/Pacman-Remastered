import Pacman from "./Pacman"
import Ghost from "./Ghost"

const jailOpen = () => {
    document.documentElement.style.setProperty("--jailColor", "black")
    setTimeout(() => {
        document.documentElement.style.setProperty("--jailColor", "#00FFDE")
    }, 4000)
}

const logic = () => {
    const mainContainer = document.getElementById("content")
    const timer = document.getElementById("timer")
    const boardGame = mainContainer.childNodes[1].childNodes[1]
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const pacman = new Pacman()

    const jailTime = 10;
    
    pacman.setPacman(boardGame, screenWidth, screenHeight)
    const redGhost = new Ghost("red", pacman, boardGame, screenWidth, screenHeight)

    setTimeout(() => {
        jailOpen()
    }, jailTime * 1000)
}

export default logic;