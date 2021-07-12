const Content = () => {
    const view = `
        <section class="ContentPlaying">
            <div class="GameBoard">
            </div>
            <div class="GameStatus">
                <div class="LifeContainer">
                    <img src="pacmanImage">
                    <img src="pacmanImage">
                </div>
                <p class="LevelStatus">Level: <span class="LevelQuantity">0</span></p>
            </div>
        </section>
    `;

    return view;
}

export default Content;