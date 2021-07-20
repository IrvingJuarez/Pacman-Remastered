class Ghost{
    constructor(id, target, boardGame, screenWidth, screenHeight){
        this.id = id
        this.boardGame = boardGame
        this.currentGhost = document.createElement("article")
        this.currentGhost.classList.add("ghost")
        this.currentGhost.classList.add(`${this.id}Ghost`)
        this.setGhost(screenWidth, screenHeight)
    }

    setGhost(width, height){
        var row, column;

        if(width >= 320 && width < 375){
            // 320
            row = 10;
            column = 6;
        }else if ((width >= 375 && width < 1210) && height < 736){
            // 375
            row = 13;
            column = 7;
        }else if ((width >= 375 && width < 1210) && height >= 737){
            // higher
            row = 15;
            column = 7;
        }else if(width >= 1210){
            // desktop
            row = 10;
            column = 15;
        }

        this.row = row
        this.column = column

        this.ghostContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
        console.log(this.ghostContainer)
        this.ghostContainer.appendChild(this.currentGhost)
    }
}

module.exports = Ghost;