class Pacman{
    constructor(){
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
            this.distance = 40
        }

        this.row = row
        this.column = column

        this.pacmanContainer = boardGame.childNodes[this.row].childNodes[this.column]
        this.pacmanContainer.appendChild(this.currentPacman)

        // this.movementResolve(this.currentDir)
        this.keyboardControls()
        this.touchControls()
    }

    keyboardControls(){
        document.addEventListener("keydown", (event) => {
            this.movementResolve(event.key)
        })
    }

    movementResolve(eventKey){
        var expectedRow = this.row, expectedColumn = this.column, expectedContainer;

        expectedContainer = this.movementExpected(eventKey, expectedRow, expectedColumn)
        let datasetValue = expectedContainer ? expectedContainer.dataset.value : 1;

        if(datasetValue === undefined){
            let transformAxis, transformSign;
            let flag = 2;
            
            switch(eventKey){
                case "ArrowLeft":
                    this.column--
                    transformAxis = "X"
                    transformSign = "-"
                break;
                case "ArrowRight":
                    this.column++
                    transformAxis = "X"
                    transformSign = "+"
                break;
                case "ArrowUp":
                    this.row--
                    transformAxis = "Y"
                    transformSign = "-"
                break;
                case "ArrowDown":
                    this.row++
                    transformAxis = "Y"
                    transformSign = "+"
                break;
            }

            // this.currentPacman.classList.add(this.classDir)

            this.movementEffect(flag, transformAxis, transformSign)
        }
    }

    movementEffect(flag, transformAxis, transformSign){
        this.currentPacman.style.transform = `translate${transformAxis}(${transformSign+flag}px)`
        flag += 2

        if(flag < this.distance){
            setTimeout(() => {
                this.movementEffect(flag, transformAxis, transformSign)
            }, 1000)
        }else{
            this.currentPacman.style.transform = ""
            this.pacmanContainer.removeChild(this.currentPacman)
            this.pacmanContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
            this.pacmanContainer.appendChild(this.currentPacman)
        }
    }

    movementExpected(key, y, x){
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

                (changeInX > changeInY) ? this.movementResolve(xDir) : this.movementResolve(yDir)

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