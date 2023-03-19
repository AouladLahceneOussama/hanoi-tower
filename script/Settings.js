export class Settings {
    constructor() {
        this.maxDisk = 8;
        this.minDisk = 3;
        this.disksNumber = 5;
    }

    updateSettings(disksNumber) {
        this.disksNumber = disksNumber;
    }

    getDisksNumber() {
        return this.disksNumber;
    }

    getSettings() {
        return {
            "maxDisk": this.maxDisk,
            "minDisk": this.minDisk,
            "disksNumber": this.disksNumber,
        }
    }
}