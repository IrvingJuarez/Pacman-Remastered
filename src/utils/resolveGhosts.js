import Ghost from "../javascript/Ghost"

const resolveGhost = (target, gameObject, width, height, boardGame, jailTime) => {
    let ghosts = []

    if(width >= 320 && width < 375){
        ghosts.push("red")
    }else if((width >= 375 && width < 1210) && height < 736){
        ghosts.push("red")
    }else if((width >= 375 && width < 1210) && height >= 737){
        ghosts.push("red", "orange", "pink")
    }else if(width >= 1210){
        ghosts.push("red", "orange", "pink")
    }

    for(let item of ghosts){
        let ghost = new Ghost(item, gameObject, target, jailTime)
        ghost.setInstance(boardGame, width, height)
    }

    return ghosts
}

export default resolveGhost