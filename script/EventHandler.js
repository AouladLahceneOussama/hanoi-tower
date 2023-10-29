export class EventHandler {

    constructor(game) {
        this.game = game;
    }

    addEventToBody(){
        $('body').on("dragover", (event) => this.dragOverPrevent(event));
        $('body').on("drop", (event) => this.dropInBody(event));
    }

    addEventToTower(tower, towers, ...callback) {
        $("#tower-" + tower.id).on("dragover", (event) => this.dragOverPrevent(event));
        $("#tower-" + tower.id).on("drop", (event) => this.drop(event, $("#tower-" + tower.id), towers, ...callback));
    }

    addEventToDisk(disk) {
        $("#disk-" + disk.id).on("dragstart", (event) => this.dragStart(event));
        $("#disk-" + disk.id).on("dragover", (event) => this.dragOverPrepend(event));
    }

    dragStart(event) {
        if (event.target.draggable == false) return;

        event.originalEvent.dataTransfer.setData('data', event.target.parentElement.id.split('-')[1] + "::" + event.target.id)
        setTimeout(() => event.target.style.display = 'none', 0)
    }

    drop(event, element, towers, ...callback) {
        let data = event.originalEvent.dataTransfer.getData('data')
        let tower_id = data.split('::')[0]
        let disk_id = data.split('::')[1]

        let targetedTower = towers.find(tower => tower.id == event.target.id.split('-')[1]);
        let currentTower = towers.find(tower => tower.id == tower_id);
        let disk = document.getElementById(disk_id)

        console.log("disk");
        console.log(disk);
        
        if (disk == null) return;
        disk.style.display = 'block'

        if(event.target.dataset.type != "TOWER") return;

        let canMove = this.game.moveDisk(currentTower, targetedTower);
        if(!canMove) return;

        element.prepend(disk);
        callback.forEach(cb => cb());

        return;
    }

    dropInBody(event) {
        let data = event.originalEvent.dataTransfer.getData('data')
        let tower_id = data.split('::')[0]
        let disk_id = data.split('::')[1]

        let disk = document.getElementById(disk_id)

        if (disk == null) return;
        disk.style.display = 'block'

        $("#" + tower_id).prepend(disk)

        return;
    }

    dragOverPrepend(event) {
        event.stopPropagation();
    }

    dragOverPrevent(event) {
        event.preventDefault();
    }
}