class EKUB{
    constructor(first, second){
        this.first=first;
        this.second=second
    }

    ekub(){
        while(this.first != this.second)
        {
          if (this.first > this.second) this.first %= this.second;
                else this.second %= this.first;
    
          if (this.first == 0) this.first = this.second;
          if (this.second == 0) this.second = this.first;
        }
       return this.first
    }
}

module.exports = EKUB