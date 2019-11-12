class Game{

    constructor(){
        this.startingSeed = [2,1,1,1,2,1,1,1]
        this.currentSeed = [...this.startingSeed]
        this.spawnDelay = 2;
    }

    resetCurrentSeed(){
        this.currentSeed = [...this.startingSeed]
    }

}