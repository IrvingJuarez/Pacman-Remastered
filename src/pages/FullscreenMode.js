import styles from "../styles/FullscreenMode.css"

const FullscreenMode = () => {
    const view = `
        <section class="ContentFullscreenMode">
            <div class="GifContainerFull""></div>
            <p>For your best experiencie, let us drive you in a Fullscreen mode.</p>
            <button class="FullscreenButton"><a href="#/start-game/">Go Fullscreen!</a></button>
            <button class="AnywayButton"><a href="#/start-game/">Go anyway</a></button>
        </section>
    `

    return view;
}

export default FullscreenMode;