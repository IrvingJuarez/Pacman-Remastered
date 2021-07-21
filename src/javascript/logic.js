import Pacman from "./Pacman"
import Ghost from "./Ghost"

const jailOpen = () => {
    document.documentElement.style.setProperty("--jailColor", "black")
    setTimeout(() => {
        document.documentElement.style.setProperty("--jailColor", "#00FFDE")
    }, 4000)
}

const counterClock = (tag, time, container) => {
    tag.innerHTML = time;
    time--
    if(time < 0){
        jailOpen()
        container.innerHTML = ""
    }else{
        setTimeout(() => {
            counterClock(tag, time, container)
        }, 1000)
    }
}

const logic = () => {
    const mainContainer = document.getElementById("content")
    const timer = document.getElementById("timer")
    const timerContainer = document.getElementById("timerContainer")
    const boardGame = mainContainer.childNodes[1].childNodes[1]
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const pacman = new Pacman()

    const jailTime = 10;
    
    pacman.setPacman(boardGame, screenWidth, screenHeight)
    const redGhost = new Ghost("red", pacman, boardGame, screenWidth, screenHeight)

    counterClock(timer, jailTime, timerContainer)
}

export default logic;