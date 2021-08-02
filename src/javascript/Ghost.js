class Ghost{
    constructor(id, gameObject, target, jailTime){
        this.id = id
        this.target = target
        this.game = gameObject
        this.jailTime = jailTime
        this.targetDirs = []
        this.time = 40
        this.cellDistance = 24
        this.allPosibleDirs = ["left", "right", "up", "down"]
        
        this.currentGhost = document.createElement("article")
        this.currentGhost.classList.add("ghost")
        this.currentGhost.classList.add(`${this.id}Ghost`)
    }
    
    setInstance(boardGame, width, height){
        this.directions = 4
        this.inactiveDatasetValue = undefined
        this.boardGame = boardGame
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
            this.time = 25
        }
        this.row = row
        this.column = column

        this.ghostContainer = boardGame.childNodes[this.row].childNodes[this.column]
        this.ghostContainer.appendChild(this.currentGhost)
        this.movementResolve()
        this.goingOutOfJail()
    }

    movementResolve(){
        let dir, status
        dir = this.getDirection()
        this.value = this.cellExpected(dir)

        if(this.directions <= 2){
            status = "smart"
        }else{
            status = "random"
        }

        if(this.value == 2){
            this.game.gameOver()
        }else{
            this.availability(this.value, dir, status)
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

        valueX = this.cellExpected(newXAxis) //1
        valueY = this.cellExpected(newYAxis) //undefined

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

        if(scpLoop){
            this.movement(flag, axis, sign, direction, true)
        }else{
            this.movement(flag, axis, sign, direction, false)
        }
    }

    movement(distance, axis, sign, direction, loop){
        this.currentGhost.style.transform = `translate${axis}(${sign+distance}px)`
        distance += 2

        if(distance < this.cellDistance){
            setTimeout(() => {
                let value
                if(loop){
                    value = true
                }else{
                    value = false
                }
                this.movement(distance, axis, sign, direction, value)
            }, this.time)
        }else{
            if(loop){
                this.changeCell(true, direction, axis)
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
        this.getTarget()

        if(loop){
            this.escapeLoop(direction, axis)
        }else{
            this.movementResolve()
        }
    }

    goingOutOfJail(){
        setTimeout(() => {
            this.directions = 2
            this.inactiveDatasetValue = 1
            this.time -= 5
        }, this.jailTime * 1000)
    }

    getTarget(){
        let supposedTargetY, supposedTargetX
        supposedTargetY = this.getCoordinate("Y");
        supposedTargetX = this.getCoordinate("X");
        this.resolveTargetCoordinates(supposedTargetX, supposedTargetY)
    }

    resolveTargetCoordinates(xAxis, yAxis){
        let supposedTargetContainer, value
        if(this.boardGame.childNodes[yAxis] == undefined){
            yAxis = this.target.row
        }
        supposedTargetContainer = this.boardGame.childNodes[yAxis].childNodes[xAxis]
        value = supposedTargetContainer ? supposedTargetContainer.dataset.value : 1
        if(value != this.inactiveDatasetValue){
            this.targetY = yAxis
            this.targetX = xAxis
        }else{
            this.targetY = this.target.row
            this.targetX = this.target.column
        }
    }

    getCoordinate(axis){
        let targetRow = this.target.row
        let targetColumn = this.target.column
        
        if(this.target.transformAxis == "X"){
            if(this.target.transformSign == "+"){
                targetColumn++
            }else{
                targetColumn--
            }
        }else{
            if(this.target.transformSign == "+"){
                targetRow++
            }else{
                targetRow--
            }
        }

        if(axis == "X"){
            return targetColumn
        }else{
            return targetRow
        }
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