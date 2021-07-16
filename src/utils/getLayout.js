import grid from "./grid"

const getLayout = () => {
    const head = document.head
    const link = document.createElement("link")
    const body = document.body
    const script = document.createElement("script")

    const screenWidth = screen.width;
    const screenHeight = screen.height;
    let source, js;

    if(screenWidth >= 320 && screenWidth < 375){
        source = "../src/styles/designs/320.css"
        js = "../src/javascript/320.js"
    }else if ((screenWidth >= 375 && screenWidth < 1210) && screenHeight < 736){
        source = "../src/styles/designs/375.css"
        js = "../src/javascript/375.js"
    }else if ((screenWidth >= 375 && screenWidth < 1210) && screenHeight >= 737){
        source = "../src/styles/designs/higher.css"
        js = "../src/javascript/higher.js"
    }else if(screenWidth >= 1210){
        source = "../src/styles/designs/desktop.css"
        js = "../src/javascript/desktop.js"
    }

    link.rel = "stylesheet"
    link.href = source
    head.appendChild(link)

    script.src = js
    body.appendChild(script)

    setTimeout(() => {
        grid()
    }, 2000)
}

export default getLayout;