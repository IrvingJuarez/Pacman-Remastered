import Ghost from "../javascript/Ghost"

const resolveGhost = (target, gameObject, width, height, boardGame, jailTime) => {
    let colors = []
    let ghosts = []

    if(width >= 320 && width < 375){
        colors.push("red")
    }else if((width >= 375 && width < 1210) && height < 736){
        colors.push("red")
    }else if((width >= 375 && width < 1210) && height >= 737){
        colors.push("red", "orange", "pink")
    }else if(width >= 1210){
        colors.push("red", "orange", "pink")
    }

    for(let item of colors){
        let ghost = new Ghost(item, gameObject, target, jailTime)
        ghosts.push(ghost)
        ghost.setInstance(boardGame, width, height)
    }

    return ghosts
}

export default resolveGhost