const movement = (key, y, x, boardGame) => {
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

    return boardGame.childNodes[y].childNodes[x]
    
}

const keyboardControls = (boardGame, pacman, pacmanContainer, row, column) => {
    document.addEventListener("keydown", (event) => {
        var expectedRow = row, expectedColumn = column, expectedContainer;

        expectedContainer = movement(event.key, expectedRow, expectedColumn, boardGame)
        let datasetValue = expectedContainer.dataset.value

        if(datasetValue === undefined){
            var node = pacmanContainer.childNodes[0];
            pacmanContainer.removeChild(node)

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

            pacmanContainer = boardGame.childNodes[row].childNodes[column]
            pacmanContainer.appendChild(pacman)
        }
    })
}

export default keyboardControls;