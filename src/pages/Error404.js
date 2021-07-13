import styles from "../styles/Error404.css"

const Error404 = () => {
    const view = `
        <section class="ContentError404">
            <h1>Error 404</h1>
            <span class="NotFound">Pacman not found</span>
            <div class="Ghost404"></div>
        </section>
    `;

    return view;
}

export default Error404;