class EKUK{
    constructor(first, second, ekub){
        this.first=first;
        this.second=second
        this.ekub=ekub
    }

    ekuk(){
        return (this.first*this.second)/this.ekub
    }
}

module.exports = EKUK