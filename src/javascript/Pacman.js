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

        this.pacmanContainer = boardGame.childNodes[row].childNodes[column]
        this.pacmanContainer.appendChild(this.currentPacman)

        this.keyboardControls(boardGame, row, column)
    }

    keyboardControls(boardGame, row, column){
        document.addEventListener("keydown", (event) => {
            var expectedRow = row, expectedColumn = column, expectedContainer;

            expectedContainer = this.movement(event.key, expectedRow, expectedColumn, boardGame)
            let datasetValue = expectedContainer ? expectedContainer.dataset.value : 1;

            if(datasetValue === undefined){
                var node = this.pacmanContainer.childNodes[0];
                this.pacmanContainer.removeChild(node)

                switch(event.key){
                    case "ArrowLeft":
                        column--
                    break;
                    case "ArrowRight":
                        column++
                    break;
                    case "ArrowUp":
                        row--
                    break;
                    case "ArrowDown":
                        row++
                    break;
                }

                this.pacmanContainer = boardGame.childNodes[row].childNodes[column]
                this.pacmanContainer.appendChild(this.currentPacman)
            }
        })
    }

    movement(key, y, x, boardGame){
        switch(key){
            case "ArrowLeft":
                x--
            break;
            case "ArrowRight":
                x++
            break;
            case "ArrowUp":
                y--
            break;
            case "ArrowDown":
                y++
            break;
        }
    
        if(boardGame.childNodes[y]){
            return boardGame.childNodes[y].childNodes[x]
        }else{
            return null;
        }
    }
}

module.exports = Pacman;