import { Settings } from "./Settings.js";
import { Tower } from "./Tower.js";
import { Game } from "./Game.js";
import { UI } from "./UI.js";
import { EventHandler } from "./EventHandler.js";

$(document).ready(function() {
    console.log("ready!");
    let settings = new Settings();

    // initilize three towers
    const towerA = new Tower(1, "A", 'START', settings)
    const towerB = new Tower(2, "B", 'CENTER', settings);
    const towerC = new Tower(3, "C", 'END', settings);

    // initilize the game
    const game = new Game(towerA, towerB, towerC, settings);
    game.init();

    const eventHandler = new EventHandler(game);

    // initilize the UI
    const ui = new UI(game, settings, eventHandler);
    ui.init();

    // initilize the event handler
    // eventHandler.init();
});
