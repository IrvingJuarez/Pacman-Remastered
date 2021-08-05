const inoractive = (btn) => {
    let on = btn.classList.contains("soundOn")
    if(on){
        btn.classList.remove("soundOn")
        btn.classList.add("soundOff")
    }else{
        btn.classList.remove("soundOff")
        btn.classList.add("soundOn")
    }
}

const mute = () => {
    let muteButton = document.querySelector(".sound-status")
    muteButton.addEventListener("click", () => {
        inoractive(muteButton)
    })
}

export default mute