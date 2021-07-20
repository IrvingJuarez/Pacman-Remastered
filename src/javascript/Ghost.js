class Ghost{
    constructor(id, target){
        this.id = id
        console.log(`Hi, I am the ${this.id} ghost`)
        console.log(`Target row: ${target.row} & Target column: ${target.column}`)
    }
}

module.exports = Ghost;