import { Disk } from './Disk.js';

export class Tower {

    static colors = ['blue', 'cyan', 'gold', 'gray', 'green', 'magenta', 'orange', 'red', 'white', 'yellow', 'pink', 'purple', 'brown', 'lime', 'maroon', 'navy', 'olive', 'silver', 'teal', 'violet']

    constructor(id, name, type, settings) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.settings = settings;
        this.disks = [];
    }

    init() {
        this.disks = []
        if (this.type != 'START') return;

        let disksNumber = this.settings.getDisksNumber();
        let pickedColors = [];

        for (let i = 0; i < disksNumber; i++) {
            let randomColor
            do {
                randomColor = Tower.colors[Math.floor(Math.random() * Tower.colors.length)];
            } while (pickedColors.includes(randomColor))

            pickedColors.push(randomColor)
            this.disks.push(new Disk(i, this.id, randomColor, 100 - (i * (100 / disksNumber-1)), i == disksNumber - 1 ? true : false));
        }
    }

    getDisks() {
        return this.disks;
    }

    getTowerByDiskId(id) {
        return this.disks.find(disk => disk.id == id);
    }

    push(value) {
        this.disks.push(value);
    }

    pop() {
        return this.disks.pop();
    }

    peek() {
        return this.disks.length > 0 ? this.disks[this.disks.length - 1] : null;
    }

    isEmpty() {
        return this.disks.length === 0;
    }

    print() {
        console.log(this.disks);
    }
}