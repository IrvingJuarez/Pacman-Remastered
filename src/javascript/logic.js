import Game from "./Game"
import Pacman from "./Pacman"
import resolveGhosts from "../utils/resolveGhosts"

const logic = (foodQuantity) => {
    const mainContainer = document.getElementById("content")
    const boardGame = mainContainer.childNodes[1].childNodes[1]
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const jailTime = 5;
    const game = new Game(jailTime, boardGame, screenWidth, screenHeight)
    const instances = []
    // const pacman = new Pacman(game, foodQuantity)
    // instances.push(pacman)

    // game.pacman = pacman
    // pacman.setInstance(boardGame, screenWidth, screenHeight)
    // let ghosts = resolveGhosts(pacman, game, screenWidth, screenHeight, boardGame, jailTime)
    // game.counterClock(instances, ghosts)
}

export default logic;