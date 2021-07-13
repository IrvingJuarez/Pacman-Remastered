import Error404 from "../pages/Error404";
import Loading from "../pages/Loading";
import Playing from "../pages/Playing";
import StartGame from "../pages/StartGame";

const routes = {
    "loading": Loading,
    "playing-game": Playing,
    "start-game": StartGame
}

const router = async () => {
    const content = null || document.getElementById("content");

    content.innerHTML = await Error404();
}

export default router;