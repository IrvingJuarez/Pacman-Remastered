class Ghost{
    constructor(id, target, boardGame, screenWidth, screenHeight){
        this.id = id
        this.boardGame = boardGame
        this.target = target
        this.targetDirs = []
        this.time = 60
        this.cellDistance = 24
        this.allPosibleDirs = ["left", "right", "up", "down"]
        this.directions = 4

        this.currentGhost = document.createElement("article")
        this.currentGhost.classList.add("ghost")
        this.currentGhost.classList.add(`${this.id}Ghost`)
        this.inactiveDatasetValue = undefined

        this.setGhost(screenWidth, screenHeight)
    }

    setGhost(width, height){
        let row, column;

        if(width >= 320 && width < 375){ // 320
            row = 10;
            column = 6;
        }else if ((width >= 375 && width < 1210) && height < 736){ // 375
            row = 13;
            column = 7;
        }else if ((width >= 375 && width < 1210) && height >= 737){ // higher
            row = 15;
            column = 7;
        }else if(width >= 1210){ // desktop
            row = 10;
            column = 15;
            this.cellDistance = 40
        }
        this.row = row
        this.column = column

        this.ghostContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
        this.ghostContainer.appendChild(this.currentGhost)
        this.movementResolve()
        this.openJail()
    }

    movementResolve(){
        let dir, value, status
        dir = this.getDirection()
        value = this.cellExpected(dir)

        if(this.directions <= 2){
            status = "smart"
        }else{
            status = "random"
        }

        if(value == 2){
            console.log("Ghost won")
        }else{
            this.availability(value, dir, status)
        }
    }

    availability(value, dir, status){
        if(value == this.inactiveDatasetValue){
            if(status == "random"){
                this.movementResolve()
            }else{
                this.retrySmartMovement(dir)
            }
        }else{
            this.updateCoordinates(dir)
            this.setMovement(dir)
        }
    }

    retrySmartMovement(direction){
        let value
        if(direction == this.moveToInX){
            value = this.cellExpected(this.moveToInY)
        }else{
            value = this.cellExpected(this.moveToInX)
        }

        if(value == this.inactiveDatasetValue){
            this.setEscapeLoop()
        }else{
            this.availability(value, direction, "smart")
        }
    }

    setEscapeLoop(){
        let newXAxis, newYAxis, valueX, valueY
        newXAxis = this.getNewDirs(this.moveToInX)
        newYAxis = this.getNewDirs(this.moveToInY)

        valueX = this.cellExpected(newXAxis)
        valueY = this.cellExpected(newYAxis)

        if(valueX != this.inactiveDatasetValue && valueY != this.inactiveDatasetValue){
            //random
        }else if(valueX != this.inactiveDatasetValue){

        }else if(valueY != this.inactiveDatasetValue){
            
        }
    }

    getNewDirs(currentDir){
        let result
        switch(currentDir){
            case "left":
                result = "right"
            break;
            case "right":
                result = "left"
            break;
            case "up":
                result = "down"
            break;
            case "down":
                result = "up"
            break;
        }

        return result
    }

    updateCoordinates(direction){
        switch(direction){
            case "left":
                this.column--
            break;
            case "right":
                this.column++
            break;
            case "up":
                this.row--
            break;
            case "down":
                this.row++
            break;
        }
    }

    setMovement(direction){
        let sign, axis, flag

        if(direction === "up" || direction === "down"){
            axis = "Y"
        }else{
            axis = "X"
        }

        if(direction === "down" || direction === "right"){
            sign = "+"
        }else{
            sign = "-"
        }
        
        flag = 2
        this.movement(flag, axis, sign, direction)
    }

    movement(distance, axis, sign, direction){
        this.currentGhost.style.transform = `translate${axis}(${sign+distance}px)`
        distance += 2

        if(distance < this.cellDistance){
            setTimeout(() => {
                this.movement(distance, axis, sign, direction)
            }, this.time)
        }else{
            this.changeCell()
        }
    }

    changeCell(){
        this.currentGhost.style.transform = ""
        this.ghostContainer.removeChild(this.currentGhost)
        this.ghostContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
        this.ghostContainer.appendChild(this.currentGhost)
        this.movementResolve()
    }

    openJail(){
        setTimeout(() => {
            this.directions = 2
            this.inactiveDatasetValue = 1
            this.getTarget()
        }, 10000)
    }

    getTarget(){
        this.targetY = 10;
        this.targetX = 8;
        console.log(this.boardGame.childNodes[this.targetY].childNodes[this.targetX])
    }

    getSmartMovement(){
        let moveToInX, moveToInY, givenMovement
        if(this.row == this.targetY){
            moveToInY = "center"
        }else if(this.row > this.targetY){
            moveToInY = "up"
        }else{
            moveToInY = "down"
        }

        if(this.column == this.targetX){
            moveToInX = "center"
        }else if(this.column > this.targetX){
            moveToInX = "left"
        }else{
            moveToInX = "right"
        }

        this.moveToInY = moveToInY //center
        this.moveToInX = moveToInX //left

        givenMovement = this.resolveSmartMovement(moveToInX, moveToInY)

        return givenMovement
    }

    resolveSmartMovement(xAxis, yAxis){
        let result
        if(xAxis == "center" && yAxis == "center"){
            result = "center"
        }else if(xAxis == "center"){
            result = yAxis
        }else if(yAxis == "center"){
            result = xAxis
        }else{
            result = this.randomSmartMovement()
        }

        return result
    }

    randomSmartMovement(){
        let randomResult = Math.floor(Math.random() * this.directions)
        switch(randomResult){
            case 0:
                randomResult = this.moveToInX
            break;
            case 1:
                randomResult = this.moveToInY
            break;
        }

        return randomResult
    }

    getDirection(){
        let direction = Math.floor(Math.random() * this.directions)
        if(this.directions <= 2){
            direction = this.getSmartMovement()
        }else{
            switch(direction){
                case 0:
                    direction = "left"
                break;
                case 1:
                    direction = "right"
                break;
                case 2:
                    direction = "up"
                break;
                case 3:
                    direction = "down"
                break;
            }
        }

        return direction
    }

    cellExpected(direction){
        let expectedRow, expectedColumn, expectedContainer;
        expectedRow = this.row
        expectedColumn = this.column

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
            default:
                return 2
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
}

module.exports = Ghost;