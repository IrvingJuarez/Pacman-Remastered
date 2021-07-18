class Pacman{
    constructor(){
        this.currentPacman = document.createElement("article")
        this.currentPacman.classList.add("pacmanRight")
    }

    setPacman(boardGame, width, height){
        this.boardGame = boardGame
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

        this.keyboardControls()
        this.touchControls()
    }

    keyboardControls(){
        document.addEventListener("keydown", (event) => {
            this.movementResolve(event.key, this.boardGame)
        })
    }

    movementResolve(eventKey){
        var expectedRow = this.row, expectedColumn = this.column, expectedContainer;

        expectedContainer = this.movement(eventKey, expectedRow, expectedColumn)
        let datasetValue = expectedContainer ? expectedContainer.dataset.value : 1;

        if(datasetValue === undefined){
            var node = this.pacmanContainer.childNodes[0];
            this.pacmanContainer.removeChild(node)

            switch(eventKey){
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

            this.pacmanContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
            this.pacmanContainer.appendChild(this.currentPacman)

            setTimeout(() => {
                this.movementResolve(eventKey)
            }, 1000)
        }
    }

    movement(key, y, x){
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
    
        if(this.boardGame.childNodes[y]){
            return this.boardGame.childNodes[y].childNodes[x]
        }else{
            return null;
        }
    }

    touchControls(){
        let xAxisPoints = []
        let yAxisPoints = []
        let flag = true

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

            if (xAxisPoints.length >= 3 && yAxisPoints.length >= 3 && flag === true){

                if(changeInX < 0){
                    xDir = "ArrowRight"
                    changeInX *= -1
                }else{
                    xDir = "ArrowLeft"
                }

                if(changeInY < 0){
                    yDir = "ArrowDown"
                    changeInY *= -1
                }else{
                    yDir = "ArrowUp"
                }

                if(changeInX > changeInY){
                    this.movementResolve(xDir, this.boardGame)
                }else{
                    this.movementResolve(yDir, this.boardGame)
                }

                flag = false
            }
        }, false);

        document.addEventListener("touchend", () => {
            xAxisPoints = [];
            yAxisPoints = []
            flag = true
        })
    }
}

module.exports = Pacman;