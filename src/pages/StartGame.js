import styles from "../styles/StartGame.css"

const StartGame = () => {
    const view = `
        <section class="ContentStartGame">
            <div class="Logo">
                <div class="LogoImage"></div>
                <span class="Subtitle">REMASTERED</span>
            </div>
            <button class="PlayButton">
                <a href="#/playing-game/">Play Game!</a>
            </button>
        </section>
    `;

    return view;
}

export default StartGame;