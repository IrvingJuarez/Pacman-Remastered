import Game from "./Game"
import Pacman from "./Pacman"
import resolveGhosts from "../utils/resolveGhosts"

const logic = () => {
    const mainContainer = document.getElementById("content")
    const boardGame = mainContainer.childNodes[1].childNodes[1]
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const jailTime = 5;
    const game = new Game(jailTime)
    const pacman = new Pacman(game)
    game.pacman = pacman

    pacman.setPacman(boardGame, screenWidth, screenHeight)
    resolveGhosts(pacman, game, screenWidth, screenHeight, boardGame, jailTime)
    game.counterClock()
}

export default logic;