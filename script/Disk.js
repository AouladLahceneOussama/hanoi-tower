export class Disk {
    constructor(id, tower_id, color, width, draggable) {
        this.id = id;
        this.tower_id = tower_id;
        this.color = color;
        this.width = width;
        this.draggable = draggable;
    }

    setDraggable(draggable) {
        this.draggable = draggable;
    }

    setTowerId(tower_id) {
        this.tower_id = tower_id;
    }

    print() {
        console.log(this.value);
    }
}