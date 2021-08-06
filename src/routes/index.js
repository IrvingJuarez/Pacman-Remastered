import Error404 from "../pages/Error404";
import Loading from "../pages/Loading";
import FullscreenMode from "../pages/FullscreenMode";
import StartGame from "../pages/StartGame";
import Playing from "../pages/Playing";
import goFullscreen from "../utils/goFullscreen";
import getHash from "../utils/getHash"
import getLayout from "../utils/getLayout"

const routes = {
    "/": FullscreenMode,
    "start-game": StartGame,
    "playing-game": Playing
}

async function router(){
    const content = null || document.getElementById("content");

    let hash = getHash()
    let render
    if(routes[hash]){
        render = routes[hash]
    }else{
        render = Error404
    }

    if(hash == "playing-game"){
        content.innerHTML = await render()
        await getLayout()
    }else if(hash == "/"){
        content.innerHTML = await render()
        await goFullscreen()
    }else{
        content.innerHTML = await render()
    }
}

export default router;