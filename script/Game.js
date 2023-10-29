export class Game {
    constructor(towerA, towerB, towerC, settings) {
        this.towerA = towerA;
        this.towerB = towerB;
        this.towerC = towerC;
        this.settings = settings;

        this.moves = 0;
        this.status = "INIT"

        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.timer = "00:00:00";
    }

    init() {
        this.moves = 0;

        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.timer = "00:00:00"
        this.status = "INIT"

        this.towerA.init();
        this.towerB.init();
        this.towerC.init();
    }

    moveDisk(fromTower, toTower) {
        if (fromTower.isEmpty() || (!toTower.isEmpty() && fromTower.peek().width > toTower.peek().width)) {
            return false;
        }

        if (fromTower.id == toTower.id) {
            return false;
        }

        if (this.moves == 0) {
            this.status = "START";
        }

        this.moves++;
        toTower.push(fromTower.pop());

        if (toTower.type == "END") {
            if (toTower.disks.length == this.settings.disksNumber) {
                this.status = "END";
                document.dispatchEvent(new Event('gameover'));
            }
        }

        return true;
    }

    solve(disksNumber, fromTower, toTower, auxTower) {
        if (disksNumber == 1) {
            this.moveDisk(fromTower, toTower);
            return;
        }
        this.solve(disksNumber - 1, fromTower, auxTower, toTower);
        this.moveDisk(fromTower, toTower);
        this.solve(disksNumber - 1, auxTower, toTower, fromTower);
    }

    start() {
        this.solve(this.settings, this.towerA, this.towerC, this.towerB);
    }

    reset() {
        this.init()
    }

    getTowers() {
        return [this.towerA, this.towerB, this.towerC];
    }

    getMoves() {
        return this.moves;
    }

    getStatus() {
        return this.status;
    }

    print() {
        this.towerA.print();
        this.towerB.print();
        this.towerC.print();
    }

    handleTimer() {
        console.log('this.staus', this.status)
        if (this.status != "START") return this.timer

        this.seconds++;

        if (this.seconds == 60) {
            this.minutes++;
            this.seconds = 0;
        }

        if (this.minutes == 60) {
            this.hours++;
            this.minutes = 0;
            this.seconds = 0;
        }

        // Format hours, minutes, and seconds with leading zeros
        const formattedHours = this.hours.toString().padStart(2, '0');
        const formattedMinutes = this.minutes.toString().padStart(2, '0');
        const formattedSeconds = this.seconds.toString().padStart(2, '0');

        this.timer = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
        return this.timer
    }
}