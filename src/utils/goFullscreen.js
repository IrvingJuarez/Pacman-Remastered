const mainContainer = document.getElementById("content")

function goFullscreen(){
    const triggerBtn = document.getElementById("content").childNodes[1].childNodes[5]
    
    triggerBtn.addEventListener("click", () => {
        if(mainContainer.requestFullscreen){
            mainContainer.requestFullscreen()
        }
    })
}

export default goFullscreen;