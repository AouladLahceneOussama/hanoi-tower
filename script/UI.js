export class UI {
    constructor(game, settings, eventHandler) {
        this.game = game;
        this.settings = settings;
        this.eventHandler = eventHandler;

        this.timerIntervalId = null
        document.addEventListener('gameover', () => {
            this.showGameOverPopup();
        });
    }

    init() {
        this.initBody();
        this.initSettings();
        this.initTowers();
        this.initButtons();
        this.initTimer();
    }

    initBody() {
        this.eventHandler.addEventToBody();
    }

    initSettings() {
        const settings = this.settings.getSettings();
        $('#disksNumber').attr('value', settings.disksNumber);
        $('#disksNumber').attr("max", settings.maxDisk);
        $('#disksNumber').attr("min", settings.minDisk);
    }

    initTowers() {
        const towers = this.game.getTowers();

        for (let i = 0; i < towers.length; i++) {
            const tower = towers[i];
            $("#tower-" + tower.id).empty();

            this.eventHandler.addEventToTower(tower, towers, this.updateTowers.bind(this), this.updateMovesCounter.bind(this));

            const disks = tower.getDisks();
            for (let j = 0; j < disks.length; j++) {
                const disk = disks[j];
                $('#tower-' + tower.id).prepend(`
                    <div class="disk" 
                        draggable="${disk.draggable}" 
                        id="disk-${disk.id}"
                        style="width: ${disk.width}%; background-color: ${disk.color}; cursor:${disk.draggable ? "pointer" : "default"}"
                        ondrop="return false" ondragover="return false"
                        >
                    </div>
                `)

                this.eventHandler.addEventToDisk(disk);
            }
        }
    }

    initTimer() {
        this.timerIntervalId = setInterval(() => $('#timer').html(this.game.handleTimer()), 1000);
    }

    updateTowers() {
        const towers = this.game.getTowers();
        for (let i = 0; i < towers.length; i++) {
            const tower = towers[i];
            const disks = tower.getDisks();

            for (let j = 0; j < disks.length; j++) {
                const disk = disks[j];
                disk.setDraggable(j == disks.length - 1);

                $('#disk-' + disk.id).attr('draggable', disk.draggable);
                $('#disk-' + disk.id).css('cursor', disk.draggable ? "pointer" : "default");
            }
        }
    }

    updateMovesCounter() {
        const moves = this.game.getMoves();
        $('#movesCount').text(moves);
    }

    initButtons() {
        $('#start').click(() => this.start())
        $('#reset').click(() => this.reset())
        $('#disksNumber').on('change', () => this.updateSettings())
        $('#gameover').on('click', () => this.hideGameOverAndRestart())
    }

    start() {
        this.game.start();
    }

    reset() {
        this.game.reset();
        this.initTowers();
        this.updateMovesCounter();
        this.resetTimer();
    }

    resetTimer() {
        clearInterval(this.timerIntervalId)
        $('#timer').html(this.game.handleTimer());
        this.initTimer()
    }

    updateSettings() {
        const disksNumber = $('#disksNumber').val();
        this.settings.updateSettings(disksNumber);
        this.reset();
    }

    showGameOverPopup() {
        $('.game-over-container').css({
            "opacity": "100%",
            "visibility": "INITIAL"
        });

        $("#score_timing").html(this.game.timer);
        $("#score_moves").html(this.game.moves);
    }

    hideGameOverAndRestart() {
        $('.game-over-container').css({
            "opacity": "0%",
            "visibility": "hidden"
        });

        $("#score_timing").html("00:00:00");
        $("#score_moves").html(0);

        this.reset()
    }
}