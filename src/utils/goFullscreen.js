function goFullscreen(){
    let fullscreen = document.querySelector(".FullscreenButton")
    let content = document.querySelector("#content")
    fullscreen.addEventListener("click", () => {
        content.requestFullscreen()
    })
}

export default goFullscreen;