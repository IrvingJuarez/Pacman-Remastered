import styles from "../styles/StartGame.css"
import goFullscreen from "../utils/goFullscreen"

const StartGame = () => {
    const view = `
        <section class="ContentStartGame">
            <div class="Logo">
                <div class="LogoImage"></div>
                <span class="Subtitle">REMASTERED</span>
            </div>
            <button class="PlayButton">
                Play Game!
            </button>
        </section>
        ${goFullscreen()}
    `;

    return view;
}

export default StartGame;