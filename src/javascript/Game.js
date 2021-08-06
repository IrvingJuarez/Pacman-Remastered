import Ghost from "./Ghost"
import pacmanImage from "../assets/images/pacmanPhoto.png"

class Game{
    constructor(time, boardGame, width, height){
        this.tag = document.getElementById("timer")
        this.belongedTime = time
        this.time = this.belongedTime
        this.level = 0
        this.levelContainer = document.querySelector(".LevelQuantity")
        this.boardGame = boardGame
        this.width = width
        this.height = height
        this.instances = []
        this.container = document.getElementById("timerContainer")
        this.lifeContainer = document.querySelector(".LifeContainer")
        this.container.style.display = "flex"
        this.deathSound = new Audio("./assets/sounds/Death.mp3")
        this.winSound = new Audio("./assets/sounds/Intro.mp3")
        this.renderLevel()
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
        if(!this.mute){
            this.winSound.play()
        }
        this.renderLevel()
        this.appendLife()
        this.faster()
        this.rearrangeNodes()
        this.refill()
    }

    renderLevel(){
        this.level++
        if(this.level >= 4){
            this.render("win")
        }else{
            this.levelContainer.textContent = this.level
        }
    }

    faster(){
        this.instances.map(item => {
            if(item.timeG){
                item.timeG -= 5
            }
        })
    }

    refill(){
        this.otherRound("win")
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
        if(!this.mute){
            this.deathSound.play()
        }
        if(!this.gameOverFlag){
            if(this.lifeContainer.childElementCount <= 0){
                this.lastWindow("lose")
            }else{
                this.removeLife()
            }
        }
        this.gameOverFlag = true
    }

    lastWindow(status){
        this.rearrangeNodes()
        this.render(status)
    }
    
    render(status){
        let winH2 = document.querySelector(".ctaContainer>h2")
        let button = document.querySelector(".ctaButton")
        if(status == "lose"){
            winH2.textContent = "The ghosts were faster than you"
            button.textContent = "Try again"
        }else{
            winH2.textContent = "You are oficially a Pacman Master"
            button.textContent = "Share this on twitter!!"
        }
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

    otherRound(flag){
        let time = flag ? 4000 : 2000

        if(this.instances.length <= 2 && this.level >= 3){
            let ghost = new Ghost("pink", this, this.pacman, 5)
            ghost.timeG = 30;
            this.instances.push(ghost)
        }

        setTimeout(() => {
            this.instances.map(instance => {
                if(instance.currentInstance.parentNode){
                    instance.currentInstance.remove()
                }
                instance.setInstance(this.boardGame, this.width, this.height)
            })
            this.setup()
        }, time)
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