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
            this.escapeLoopMovement(dir, false)
        }
    }

    retrySmartMovement(direction){
        let value, secondDir
        secondDir = this.leftDir(direction)
        value = this.noCenter(secondDir)

        if(value == this.inactiveDatasetValue){
            this.setEscapeLoop()
        }else{
            this.escapeLoopMovement(secondDir, false)
        }
    }

    leftDir(dir){
        let result
        if(dir == this.moveToInX){
            result = this.moveToInY
        }else{
            result = this.moveToInX
        }
        return result
    }

    noCenter(dir){
        let value

        if(dir == "center"){
            value = this.inactiveDatasetValue
        }else{
            value = this.cellExpected(dir)
        }

        return value
    }

    setEscapeLoop(){
        let newXAxis, newYAxis, valueX, valueY, loopDir
        newXAxis = this.getNewDirs(this.moveToInX, "X") //right
        newYAxis = this.getNewDirs(this.moveToInY, "Y") //up

        valueX = this.cellExpected(newXAxis)
        valueY = this.cellExpected(newYAxis)

        if(valueX != this.inactiveDatasetValue && valueY != this.inactiveDatasetValue){
            loopDir = this.randomSmartMovement(newXAxis, newYAxis)
        }else if(valueX != this.inactiveDatasetValue){
            loopDir = newXAxis
        }else if(valueY != this.inactiveDatasetValue){
            loopDir = newYAxis
        }else{
            loopDir = null
        }

        if(loopDir){
            this.escapeLoopMovement(loopDir, true)
        }else{
            this.setEscapeLoop()
        }
    }
    
    escapeLoopMovement(direction, value){
        this.updateCoordinates(direction)
        this.setMovement(direction, value)
    }

    escapeLoop(direction, axis){
        let testingValue
        if(axis == "X"){
            testingValue = this.cellExpected(this.moveToInY)
        }else{
            testingValue = this.cellExpected(this.moveToInX)
        }

        if(testingValue == this.inactiveDatasetValue){
            this.escapeLoopMovement(direction, true)
        }else{
            if(axis == "X"){
                this.escapeLoopMovement(this.moveToInY, false)
            }else{
                this.escapeLoopMovement(this.moveToInX, false)
            }
        }
    }

    getNewDirs(currentDir, axis){
        let result
        if(currentDir == "center"){
            switch(axis){
                case "X":
                    result = this.randomSmartMovement("left", "right")
                break;
                case "Y":
                    result = this.randomSmartMovement("up", "down")
                break;
            }
        }else{
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

    setMovement(direction, scpLoop){
        let sign, axis, flag, loop

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
        loop = scpLoop ? true : false

        this.movement(flag, axis, sign, direction, loop)
    }

    movement(distance, axis, sign, direction, loop){
        this.currentGhost.style.transform = `translate${axis}(${sign+distance}px)`
        distance += 2

        if(distance < this.cellDistance){
            setTimeout(() => {
                this.movement(distance, axis, sign, direction)
            }, this.time)
        }else{
            if(loop){
                this.changeCell(loop, direction, axis)
            }else{
                this.changeCell()
            }
        }
    }

    changeCell(loop, direction, axis){
        this.currentGhost.style.transform = ""
        this.ghostContainer.removeChild(this.currentGhost)
        this.ghostContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
        this.ghostContainer.appendChild(this.currentGhost)

        if(loop){
            this.escapeLoop(direction, axis)
        }else{
            this.movementResolve()
        }
    }

    openJail(){
        setTimeout(() => {
            this.directions = 2
            this.inactiveDatasetValue = 1
            this.getTarget()
        }, 10000)
    }

    getTarget(){
        this.targetY = 20;
        this.targetX = 0;
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

        this.moveToInY = moveToInY //down
        this.moveToInX = moveToInX //center

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

    randomSmartMovement(newX, newY){
        let randomResult = Math.floor(Math.random() * this.directions)
        switch(randomResult){
            case 0:
                randomResult = newX || this.moveToInX
            break;
            case 1:
                randomResult = newY || this.moveToInY
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