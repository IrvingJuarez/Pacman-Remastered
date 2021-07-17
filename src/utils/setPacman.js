import keyboardControls from "./keyboardControls";
const screenWidth = screen.width;
const screenHeight = screen.height;

const setPacman = (mainContainer, pacman, pacmanContainer) => {
    const boardGame = mainContainer.childNodes[1].childNodes[1]
    var row, column;

    if(screenWidth >= 320 && screenWidth < 375){
        // 320
        row = 11;
        column = 6;
    }else if ((screenWidth >= 375 && screenWidth < 1210) && screenHeight < 736){
        // 375
        row = 14;
        column = 7;
    }else if ((screenWidth >= 375 && screenWidth < 1210) && screenHeight >= 737){
        // higher
        row = 16;
        column = 7;
    }else if(screenWidth >= 1210){
        // desktop
        row = 11;
        column = 15;
    }

    pacmanContainer = boardGame.childNodes[row].childNodes[column]
    pacmanContainer.appendChild(pacman)

    keyboardControls(boardGame, pacman, pacmanContainer, row, column)
}

export default setPacman;