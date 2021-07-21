class Ghost{
    constructor(id, target, boardGame, screenWidth, screenHeight){
        this.id = id
        this.boardGame = boardGame
        this.target = target
        this.targetDirs = []
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
            this.targetY = 20;
            this.targetX = 0;
        }, 10000)
    }

    movementResolve(){
        let dir
        if(this.targetX != undefined){
            dir = this.getTarget()
        }else{
            dir = this.randomDirection()
        }

        if(dir === "center"){
            console.log("Pacman lost")
        }else{
            let available = this.cellExpected(dir)
            
            if(available != this.inactiveDatasetValue){
                this.targetDirs = []
                let flag = 2
                this.movementEffect(flag, dir)
            }else{
                if(this.targetX != undefined){
                    this.escape(dir)
                }else{
                    this.movementResolve()
                }
            }
        }
    }

    getTarget(){
        let xAxis, yAxis
        if(this.column == this.targetX){
            xAxis = "center"
        }else if(this.column > this.targetX){
            xAxis = "left"
        }else{
            xAxis = "Right"
        }

        if(this.row == this.targetY){
            yAxis = "center"
        }else if(this.row > this.targetY){
            yAxis = "up"
        }else{
            yAxis = "down"
        }

        this.targetDirs.push(xAxis, yAxis)

        if(xAxis == "center" && yAxis == "center"){
            return "center"
        }else if(xAxis == "center" && yAxis != "center"){
            return xAxis
        }else if(yAxis == "center" && xAxis != "center"){
            return yAxis
        }else{
            let random = Math.floor(Math.random() * 2)
            switch(random){
                case 0:
                    return xAxis
                break;
                case 1:
                    return yAxis
                break;
            }
        }
    }

    randomDirection(){
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

    escape(direction){
        this.targetDirs = this.targetDirs.filter(item => {
            return item !== direction
        })
        console.log(`The direction ${direction} failed. The other supposed dir is in the array below`)
        console.log(this.targetDirs)
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