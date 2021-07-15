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

const design = () => {
    const head = document.head
    const link = document.createElement("link")
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    let source;

    if(screenWidth >= 320 && screenWidth < 375){
        source = "../src/styles/designs/320.css"
    }else if (screenWidth >= 375 & screenHeight <= 739){
        source = "../src/styles/designs/375.css"
    }else if (screenWidth >= 375 && screenWidth < 1210 && screenHeight >= 740){
        source = "../src/styles/designs/higher.css"
    }else {
        source = "../src/styles/designs/desktop.css"
    }

    link.rel = "stylesheet"
    link.href = source

    head.appendChild(link)
}

const grid = () => {
    const boardGame = mainContainer.childNodes[1].childNodes[1]
    const boardWidth = boardGame.offsetWidth
    const boardHeight = boardGame.offsetHeight

    createGrid(boardHeight, boardWidth, boardGame)
    design()
}

export default grid;