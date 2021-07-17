const keyboardControls = (boardGame, pacman, pacmanContainer, row, column) => {
    document.addEventListener("keydown", (event) => {
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
    })
}

export default keyboardControls;