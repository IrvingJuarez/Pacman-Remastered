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

        this.row = row
        this.column = column

        this.pacmanContainer = boardGame.childNodes[this.row].childNodes[this.column]
        this.pacmanContainer.appendChild(this.currentPacman)

        this.keyboardControls(boardGame, row, column)
        this.touchControls()
    }

    keyboardControls(boardGame, row, column){
        document.addEventListener("keydown", (event) => {
            this.movementResolve(event, boardGame)
        })
    }

    movementResolve(event, boardGame, row, column){
        var expectedRow = this.row, expectedColumn = this.column, expectedContainer;

        expectedContainer = this.movement(event.key, expectedRow, expectedColumn, boardGame)
        let datasetValue = expectedContainer ? expectedContainer.dataset.value : 1;

        if(datasetValue === undefined){
            var node = this.pacmanContainer.childNodes[0];
            this.pacmanContainer.removeChild(node)

            switch(event.key){
                case "ArrowLeft":
                    this.column--
                break;
                case "ArrowRight":
                    this.column++
                break;
                case "ArrowUp":
                    this.row--
                break;
                case "ArrowDown":
                    this.row++
                break;
            }

            this.pacmanContainer = boardGame.childNodes[this.row].childNodes[this.column]
            this.pacmanContainer.appendChild(this.currentPacman)
        }
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

    touchControls(){
        let xAxisPoints = []
        let yAxisPoints = []

        document.addEventListener("touchmove", (event) => {
            var xAxis = event.changedTouches[0].screenX
            var yAxis = event.changedTouches[0].screenY
            let xLength = xAxisPoints.length - 1
            let yLength = yAxisPoints.length - 1
            var changeInX = xAxisPoints[0] - xAxisPoints[xLength]
            var changeInY = yAxisPoints[0] - yAxisPoints[yLength]
            var xDir, yDir

            xAxisPoints.push(xAxis)
            yAxisPoints.push(yAxis)

            if (xAxisPoints.length >= 2 && yAxisPoints.length >= 2){

                if(changeInX < 0){
                    xDir = "Right"
                    changeInX *= -1
                }else{
                    xDir = "Left"
                }

                if(changeInY < 0){
                    yDir = "Down"
                    changeInY *= -1
                }else{
                    yDir = "Up"
                }

                console.log(`${changeInX > changeInY ? xDir : yDir}`)
            }
        }, false);

        document.addEventListener("touchend", () => {
            xAxisPoints = [];
            yAxisPoints = []
        })
    }
}

module.exports = Pacman;