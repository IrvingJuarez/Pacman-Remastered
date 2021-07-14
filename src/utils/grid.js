const screenWidth = screen.width;
const screenHeight = screen.height;
const mainContainer = document.getElementById("content")

const createGrid = (height, width, container) => {
    if(height === 810){
        height -= 10;
        height /= 40;

        width -= 10;
        width /= 40;
    }else{
        height -= 8;
        height /= 24;

        width -= 8;
        width /= 24;
    }

    for(let i = 0; i < height; i++){
        let row = document.createElement("section")
        row.classList.add("row")
        container.appendChild(row)

        for(let j = 0; j < width; j++){
            let cell = document.createElement("div")
            cell.classList.add("cell")
            row.appendChild(cell)
        }
    }
}

const grid = () => {
    const boardGame = mainContainer.childNodes[1].childNodes[1]
    const boardWidth = boardGame.offsetWidth
    const boardHeight = boardGame.offsetHeight

    if(screenWidth >= 320 && screenWidth < 375){
        // 320 Design
    }else if (screenWidth >= 375 & screenHeight <= 739){
        // 375 Design
    }else if (screenWidth >= 375 && screenHeight >= 740){
        // Higher Design
    }else {
        // Desktop Design
    }

    createGrid(boardHeight, boardWidth, boardGame)
}

export default grid;