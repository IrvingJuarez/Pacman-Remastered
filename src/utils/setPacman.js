const mainContainer = document.getElementById("content")
const pacman = document.createElement("div")
pacman.classList.add("pacmanRight")

const setPacman = () => {
    const container = mainContainer.childNodes[1].childNodes[1]
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    let pacmanContainer;

    if(screenWidth >= 320 && screenWidth < 375){
        // 320
        pacmanContainer = container.childNodes[11].childNodes[6]
    }else if ((screenWidth >= 375 && screenWidth < 1210) && screenHeight < 736){
        // 375
        pacmanContainer = container.childNodes[14].childNodes[7]
    }else if ((screenWidth >= 375 && screenWidth < 1210) && screenHeight >= 737){
        // higher
        pacmanContainer = container.childNodes[16].childNodes[7]
    }else if(screenWidth >= 1210){
        // desktop
        pacmanContainer = container.childNodes[11].childNodes[15]
    }

    pacmanContainer.appendChild(pacman)
}

export default setPacman;