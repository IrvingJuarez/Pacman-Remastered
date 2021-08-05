import styles from "../styles/Playing.css"
import clock from "../assets/images/clock.svg"
import pacmanImage from "../assets/images/pacmanPhoto.png"
import foodSound from "../assets/sounds/Fruit.mp3"

const Playing = () => {

    const view = `
        <section class="ContentPlaying">
            <div class="GameBoard">
            </div>
            <div class="GameStatus">
                <div class="LifeContainer">
                    <img src="${pacmanImage}">
                    <img src="${pacmanImage}">
                </div>
                <div class="Timer" id="timerContainer">
                    <img src="${clock}">
                    <p id="timer" class="LevelStatus"></p>
                </div>
                <div class="levelSoundStatus">
                    <div class="sound-status soundOn"></div>
                    <p class="LevelStatus">Level: <span class="LevelQuantity">0</span></p>
                </div>
            </div>
            <article class="ctaContainer">
                <h2></h2>
                <div class="ctaAnimation"></div>
                <div class="ctaButton"><a href="/"></a></div>
            </article>
        </section>
    `;

    return view;
}

export default Playing;