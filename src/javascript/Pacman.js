class Pacman{
    constructor(){
        this.currentPacman = document.createElement("article")
        this.currentPacman.classList.add("pacmanRight")
    }

    setPacman(boardGame, width, height){
        var row, column;

        if(width >= 320 && width < 375){
            // 320
            row = 11;
            column = 6;
        }else if ((width >= 375 && width < 1210) && height < 736){
            // 375
            row = 14;
            column = 7;
        }else if ((width >= 375 && width < 1210) && height >= 737){
            // higher
            row = 16;
            column = 7;
        }else if(width >= 1210){
            // desktop
            row = 11;
            column = 15;
        }

        var pacmanContainer = boardGame.childNodes[row].childNodes[column]
        pacmanContainer.appendChild(this.currentPacman)

        // keyboardControls(boardGame, pacman, pacmanContainer, row, column)
    }
}

module.exports = Pacman;