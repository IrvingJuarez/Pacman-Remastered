const mainContainer = document.getElementById("content")

const createGrid = (height, width, container) => {
    if(width >= 1208){
        height = 20;
        width = 30;
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

    createGrid(boardHeight, boardWidth, boardGame)
}

export default grid;