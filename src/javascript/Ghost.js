class Ghost{
    constructor(id, target, boardGame, screenWidth, screenHeight){
        this.id = id
        this.boardGame = boardGame
        this.time = 125
        this.distance = 24
        this.currentGhost = document.createElement("article")
        this.currentGhost.classList.add("ghost")
        this.currentGhost.classList.add(`${this.id}Ghost`)
        this.inactiveDatasetValue = undefined
        this.setGhost(screenWidth, screenHeight)
    }

    setGhost(width, height){
        let row, column;

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
            this.distance = 40
            this.time = 150
        }

        this.row = row
        this.column = column

        this.ghostContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
        this.ghostContainer.appendChild(this.currentGhost)

        this.movementResolve()
        setTimeout(() => {
            this.inactiveDatasetValue = 1
        }, 10000)
    }

    movementResolve(){
        let randomDir = this.getDirection()

        let available = this.cellExpected(randomDir)
        if(available != this.inactiveDatasetValue){
            let flag = 2
            this.movementEffect(flag, randomDir)
        }else{
            this.movementResolve()
        }
    }

    getDirection(){
        let dir = Math.floor(Math.random() * 4)

        switch(dir){
            case 0:
                dir = "left"
            break;
            case 1:
                dir = "right"
            break;
            case 2:
                dir = "up"
            break;
            case 3:
                dir = "down"
            break;
        }

        return dir
    }

    cellExpected(direction){
        let expectedRow = this.row, expectedColumn = this.column, expectedContainer;

        switch(direction){
            case "left":
                expectedColumn--
            break;
            case "right":
                expectedColumn++
            break;
            case "up":
                expectedRow--
            break;
            case "down":
                expectedRow++
            break;
        }
    
        if(this.boardGame.childNodes[expectedRow]){
            expectedContainer = this.boardGame.childNodes[expectedRow].childNodes[expectedColumn]
        }else{
            expectedContainer = null;
        }

        let datasetValue = expectedContainer ? expectedContainer.dataset.value : this.inactiveDatasetValue;
        return datasetValue
    }

    movementEffect(flag, direction){
        let sign, axis
        switch (direction) {
            case "left":
                axis = "X"
                sign = "-"
                if(flag <= 2) 
                    this.column--
            break;
            case "right":
                axis = "X"
                sign = "+"
                if(flag <= 2) 
                    this.column++
            break;
            case "up":
                axis = "Y"
                sign = "-"
                if(flag <= 2) 
                    this.row--
            break;
            case "down":
                axis = "Y"
                sign = "+"
                if(flag <= 2) 
                    this.row++
            break;
        }

        this.currentGhost.style.transform = `translate${axis}(${sign+flag}px)`
        flag += 2

        if(flag < this.distance){
            setTimeout(() => {
                this.movementEffect(flag, direction)
            }, this.time)
        }else{
            this.changeInCell()
        }
    }

    changeInCell(){
        this.currentGhost.style.transform = ""
        this.ghostContainer.removeChild(this.currentGhost)
        this.ghostContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
        this.ghostContainer.appendChild(this.currentGhost)
        this.movementResolve()
    }
}

module.exports = Ghost;