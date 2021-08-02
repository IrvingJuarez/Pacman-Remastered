import logic from "./logic"

class Game{
    constructor(time, boardGame, width, height){
        this.tag = document.getElementById("timer")
        this.belongedTime = time
        this.time = this.belongedTime
        this.boardGame = boardGame
        this.width = width
        this.height = height
        this.instances = []
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

    counterClock(pacman, ghosts){
        this.tag.innerHTML = this.time;
        this.time--
        if(this.time < 0){
            this.jailOpen()
            this.container.style.display = "none"
            if(this.instances.length <= 1){
                this.instances.push(pacman[0])
                this.instances.push(...ghosts)
            }
        }else{
            setTimeout(() => {
                this.counterClock(pacman, ghosts)
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
        let life = document.querySelector(".LifeContainer>img")
        life.remove()
        this.rearrangeNodes()
    }
    
    rearrangeNodes(){
        setTimeout(() => {
            this.instances.map(instance => {
                instance.value = 2
                instance.setInstance(this.boardGame, this.width, this.height)
            })
            this.setup()
        }, 2000)
    }

    setup(){
        this.time = this.belongedTime
        this.container.style.display = "flex"
        this.gameOverFlag = false
        document.documentElement.style.setProperty("--jailColor", "#00FFDE")
        this.counterClock()
    }
}

export default Game