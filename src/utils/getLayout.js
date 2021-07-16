import grid from "./grid"

const getLayout = () => {
    const head = document.head
    const link = document.createElement("link")
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    let source;

    if(screenWidth >= 320 && screenWidth < 375){
        source = "../src/styles/designs/320.css"
    }else if ((screenWidth >= 375 && screenWidth < 1210) && screenHeight < 736){
        source = "../src/styles/designs/375.css"
    }else if ((screenWidth >= 375 && screenWidth < 1210) && screenHeight >= 737){
        source = "../src/styles/designs/higher.css"
    }else if(screenWidth >= 1210){
        source = "../src/styles/designs/desktop.css"
    }

    link.rel = "stylesheet"
    link.href = source
    head.appendChild(link)

    setTimeout(() => {
        grid()
    }, 2000)
}

export default getLayout;