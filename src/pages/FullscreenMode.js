import styles from "../styles/FullscreenMode.css"

const FullscreenMode = () => {
    const view = `
        <section class="ContentFullscreenMode">
            <div class="GifContainerFull""></div>
            <p>For your best experiencie, let us drive you in a Fullscreen mode.</p>
            <button class="FullscreenButton">Go Fullscreen!</button>
            <button class="AnywayButton">Go anyway</button>
        </section>
    `

    return view;
}

export default FullscreenMode;