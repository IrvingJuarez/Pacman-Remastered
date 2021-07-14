import Error404 from "../pages/Error404";
import Loading from "../pages/Loading";
import FullscreenMode from "../pages/FullscreenMode";
import StartGame from "../pages/StartGame";
import Playing from "../pages/Playing";
import goFullscreen from "../utils/goFullscreen";
import getHash from "../utils/getHash"

const routes = {
    "/": Loading,
    "/start-game/": StartGame,
    "/playing-game": Playing
}

async function router(){
    const content = null || document.getElementById("content");
    let hash = getHash();
    let render = routes[hash] ? routes[hash] : Error404;

    content.innerHTML = await render()
}

export default router;