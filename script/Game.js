export class Game{
    constructor(towerA, towerB, towerC, settings){
        this.towerA = towerA;
        this.towerB = towerB;
        this.towerC = towerC;
        this.settings = settings;

        this.moves = 0;
    }

    init(){
        this.moves = 0;

        this.towerA.init();
        this.towerB.init();
        this.towerC.init();
    }

    moveDisk(fromTower, toTower){
        if(fromTower.isEmpty() || (!toTower.isEmpty() && fromTower.peek().width > toTower.peek().width)){
            return false;
        }

        this.moves++;
        toTower.push(fromTower.pop());
        return true;
    }

    solve(disksNumber, fromTower, toTower, auxTower){
        if(disksNumber == 1){
            this.moveDisk(fromTower, toTower);
            return;
        }
        this.solve(disksNumber - 1, fromTower, auxTower, toTower);
        this.moveDisk(fromTower, toTower);
        this.solve(disksNumber - 1, auxTower, toTower, fromTower);
    }

    start(){
        this.solve(this.settings, this.towerA, this.towerC, this.towerB);
    }

    reset(){
        this.init()
    }

    getTowers(){
        return [this.towerA, this.towerB, this.towerC];
    }

    getMoves(){
        return this.moves;
    }

    print(){
        this.towerA.print();
        this.towerB.print();
        this.towerC.print();
    }
}