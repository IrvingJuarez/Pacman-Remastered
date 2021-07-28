class Game{
    constructor(time){
        this.tag = document.getElementById("timer")
        this.time = time
        this.container = document.getElementById("timerContainer")
        this.lifeContainer = document.querySelector(".LifeContainer")
        this.container.style.display = "flex"
    }

    jailOpen(){
        document.documentElement.style.setProperty("--jailColor", "black")
        setTimeout(() => {
            document.documentElement.style.setProperty("--jailColor", "#00FFDE")
        }, 4000)
    }

    counterClock(){
        this.tag.innerHTML = this.time;
        this.time--
        if(this.time < 0){
            this.jailOpen()
            this.container.style.display = "none"
        }else{
            setTimeout(() => {
                this.counterClock()
            }, 1000)
        }
    }

    gameOver(){
        if(!this.gameOverFlag){
            if(this.lifeContainer.childElementCount <= 0){
                console.log("Game over action")
            }else{
                this.removeLife()
            }
        }
        this.gameOverFlag = true
    }

    removeLife(){
        let firstLife = this.lifeContainer.childNodes[0]
        this.lifeContainer.removeChild(firstLife)
        this.rearrangeNodes()
    }
    
    rearrangeNodes(){
        let arr = []
        let ghostsNodeList = document.querySelectorAll(".ghost")
        arr.push(...ghostsNodeList)
        arr.push(document.querySelector(".pacman"))
        console.log(arr)
    }
}

export default Game