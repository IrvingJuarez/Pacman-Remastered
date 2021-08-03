import logic from "./logic"
import pacmanImage from "../assets/images/pacmanPhoto.png"

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
        this.setFoodClass()
    }

    setFoodClass(){
        if(this.width >= 1208){
            this.foodClass = "desktopFood"
        }else{
            this.foodClass = "mobileFood"
        }
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

    win(){
        this.appendLife()
        this.rearrangeNodes()
        this.refill()
    }

    refill(){
        this.otherRound()
        setTimeout(() => {
            let refilled = [...document.querySelectorAll(".food")]
            refilled.map(cell => {
                this.pacman.foodQuantity++
                cell.classList.add(this.foodClass)
            })
        }, 2000)
    }

    appendLife(){
        let newLife = document.createElement("img")
        newLife.src = pacmanImage
        this.lifeContainer.append(newLife)
    }

    gameOver(){
        if(!this.gameOverFlag){
            if(this.lifeContainer.childElementCount <= 0){
                this.farewell()
            }else{
                this.removeLife()
            }
        }
        this.gameOverFlag = true
    }

    farewell(){
        this.rearrangeNodes()
        document.querySelector(".ctaContainer").style.display = "flex"
    }

    removeLife(){
        let life = document.querySelector(".LifeContainer>img")
        life.remove()
        this.rearrangeNodes(true)
    }
    
    rearrangeNodes(trigger){
        this.instances.map(instance => {
            instance.stop = true
        })

        if(trigger)
            this.otherRound()
    }

    otherRound(){
        setTimeout(() => {
            this.instances.map(instance => {
                instance.currentInstance.remove()
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