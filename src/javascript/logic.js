import setPacman from "../utils/setPacman";
import keyboardControls from "../utils/keyboardControls";

const logic = () => {
    const mainContainer = document.getElementById("content")
    var pacman = document.createElement("article")
    pacman.classList.add("pacmanRight")
    let pacmanContainer

    setPacman(mainContainer, pacman, pacmanContainer)
}

export default logic;