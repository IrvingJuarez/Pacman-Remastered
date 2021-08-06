const inoractive = (btn, pacman, game) => {
    let on = btn.classList.contains("soundOn")
    if(on){
        btn.classList.remove("soundOn")
        btn.classList.add("soundOff")
        pacman.mute = true
        game.mute = true
    }else{
        btn.classList.remove("soundOff")
        btn.classList.add("soundOn")
        pacman.mute = false
        game.mute = false
    }
}

const mute = (pacman, game) => {
    let muteButton = document.querySelector(".sound-status")
    muteButton.addEventListener("click", () => {
        inoractive(muteButton, pacman, game)
    })
}

export default mute