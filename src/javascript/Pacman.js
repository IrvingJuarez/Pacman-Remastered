class Pacman{
    constructor(gameObject){
        this.game = gameObject
        this.currentPacman = document.createElement("article")
        this.currentPacman.classList.add("pacman")
        this.classDir = "pacmanRight"
        this.currentPacman.classList.add(this.classDir)
        this.time = 30
        this.distance = 24

        this.currentDir = "ArrowLeft"
    }

    setPacman(boardGame, width, height){
        this.boardGame = boardGame
        var row, column, portalRow, portalColumn;

        if(width >= 320 && width < 375){
            // 320
            row = 11;
            column = 6;
            portalRow = 10;
            portalColumn = 12;
        }else if ((width >= 375 && width < 1210) && height < 736){
            // 375
            row = 14;
            column = 7;
            portalRow = 12
            portalColumn = 14
        }else if ((width >= 375 && width < 1210) && height >= 737){
            // higher
            row = 16;
            column = 7;
            portalRow = 14
            portalColumn = 14
        }else if(width >= 1210){
            // desktop
            row = 11;
            column = 15;
            this.distance = 40
            this.time = 15
        }

        this.row = row
        this.column = column
        this.portalRow = portalRow
        this.portalColumn = portalColumn

        this.pacmanContainer = boardGame.childNodes[this.row].childNodes[this.column]
        this.pacmanContainer.appendChild(this.currentPacman)

        this.movementResolve(this.currentDir)
        this.keyboardControls()
        this.touchControls()
    }

    keyboardControls(){
        document.addEventListener("keydown", (event) => {
            if(this.running === false){
                this.currentDir = event.key
                this.movementResolve(this.currentDir)
            }else{
                this.newDir = event.key
            }
        })
    }

    movementResolve(eventKey){
        if(this.pacmanContainer.childElementCount >= 2){
            this.game.gameOver()
        }else{
            let datasetValue = this.movementExpected(eventKey)
            this.realMovement(datasetValue)
        }
    }

    movementEffect(flag){
        this.currentPacman.style.transform = `translate${this.transformAxis}(${this.transformSign+flag}px)`
        flag += 2

        if(flag < this.distance){
            setTimeout(() => {
                this.movementEffect(flag)
            }, this.time)
        }else{
            this.changeInCell()
        }
    }

    realMovement(datasetValue){
        if(datasetValue === undefined){
            this.running = true
            let transformAxis, transformSign;
            this.currentPacman.classList.remove(this.classDir)
            let flag = 2;
            
            switch(this.currentDir){
                case "ArrowLeft":
                    this.column--
                    this.classDir = "pacmanLeft"
                    transformAxis = "X"
                    transformSign = "-"
                break;
                case "ArrowRight":
                    this.column++
                    this.classDir = "pacmanRight"
                    transformAxis = "X"
                    transformSign = "+"
                break;
                case "ArrowUp":
                    this.row--
                    this.classDir = "pacmanUp"
                    transformAxis = "Y"
                    transformSign = "-"
                break;
                case "ArrowDown":
                    this.row++
                    this.classDir = "pacmanDown"
                    transformAxis = "Y"
                    transformSign = "+"
                break;
            }

            this.transformAxis = transformAxis
            this.transformSign = transformSign
            this.currentPacman.classList.add(this.classDir)

            this.movementEffect(flag)
        }else{
            this.running = false
        }
    }

    changeInCell(){
        this.currentPacman.style.transform = ""
        this.pacmanContainer.removeChild(this.currentPacman)
        this.pacmanContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
        this.pacmanContainer.appendChild(this.currentPacman)
        this.movementResolve(this.currentDir)
    }

    movementExpected(key){
        let value
        if(this.newDir){
            value = this.cellExpected(this.newDir)

            if(value === undefined){
                this.currentDir = this.newDir
                this.newDir = null
            }else{
                value = this.cellExpected(key)
                return value
            }
        }else{
            value = this.cellExpected(key)
            return value
        }
    }

    cellExpected(key){
        let expectedRow = this.row, expectedColumn = this.column, expectedContainer;

        switch(key){
            case "ArrowLeft":
                expectedColumn--
            break;
            case "ArrowRight":
                expectedColumn++
            break;
            case "ArrowUp":
                expectedRow--
            break;
            case "ArrowDown":
                expectedRow++
            break;
        }
    
        if(this.boardGame.childNodes[expectedRow]){
            expectedContainer = this.boardGame.childNodes[expectedRow].childNodes[expectedColumn]
        }else{
            expectedContainer = null;
        }

        let datasetValue
        if(expectedRow == this.portalRow && expectedColumn < 0){
            datasetValue = this.portal(this.portalColumn)
        }else if(expectedRow == this.portalRow && expectedColumn >= this.portalColumn){
            datasetValue = this.portal(-1)
        }else{
            datasetValue = expectedContainer ? expectedContainer.dataset.value : 1;
        }
        return datasetValue
    }

    portal(column){
        this.column = column
        this.boardGame.style.boxShadow = "5px 5px 25px #3498DB, -5px -5px 25px #3498DB"
        setTimeout(() => {
            this.boardGame.style.boxShadow = ""
        }, 250)
        return undefined
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

                if(this.running === false){
                    (changeInX > changeInY) ? this.currentDir = xDir : this.currentDir = yDir
                    this.movementResolve(this.currentDir)
                }else{
                    (changeInX > changeInY) ? this.newDir = xDir : this.newDir = yDir
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