class Game{
    constructor(time){
        this.tag = document.getElementById("timer")
        this.time = time
        this.container = document.getElementById("timerContainer")
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
}

export default Game