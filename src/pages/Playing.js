import styles from "../styles/Playing.css"
import pacmanImage from "../assets/images/pacmanPhoto.png"

const Playing = () => {
    console.log(document.getElementById("content").childNodes[1])

    const view = `
        <section class="ContentPlaying">
            <div class="GameBoard">
            </div>
            <div class="GameStatus">
                <div class="LifeContainer">
                    <img src="${pacmanImage}">
                    <img src="${pacmanImage}">
                </div>
                <p class="LevelStatus">Level: <span class="LevelQuantity">0</span></p>
            </div>
        </section>
    `;

    return view;
}

export default Playing;