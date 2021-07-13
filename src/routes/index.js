import Error404 from "../pages/Error404";
import Loading from "../pages/Loading";
import FullscreenMode from "../pages/FullscreenMode";
import StartGame from "../pages/StartGame";
import Playing from "../pages/Playing";

const routes = {
    "loading": Loading,
    "playing-game": Playing,
    "start-game": StartGame
}

const router = async () => {
    const content = null || document.getElementById("content");

    content.innerHTML = await FullscreenMode();
}

export default router;