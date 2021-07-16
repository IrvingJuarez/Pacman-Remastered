import Error404 from "../pages/Error404";
import Loading from "../pages/Loading";
import FullscreenMode from "../pages/FullscreenMode";
import StartGame from "../pages/StartGame";
import Playing from "../pages/Playing";
import goFullscreen from "../utils/goFullscreen";
import getHash from "../utils/getHash"
import getLayout from "../utils/getLayout"

async function router(){
    const content = null || document.getElementById("content");

    content.innerHTML = await Playing()
    await getLayout()
}

export default router;