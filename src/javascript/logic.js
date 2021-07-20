import Pacman from "./Pacman"
import Ghost from "./Ghost"

const logic = () => {
    const mainContainer = document.getElementById("content")
    const boardGame = mainContainer.childNodes[1].childNodes[1]
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const pacman = new Pacman()
    
    pacman.setPacman(boardGame, screenWidth, screenHeight)
    const redGhost = new Ghost("red", pacman, boardGame, screenWidth, screenHeight)
}

export default logic;