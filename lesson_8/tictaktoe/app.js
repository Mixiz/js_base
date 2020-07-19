"use strict";

let ticTakToe = {
    game,
    
    /**
     * Инициализация игры.
     */
    init() {
        let divElem = document.querySelector('#game');
        game = new Game();
        game.init(divElem);
    }
};

ticTakToe.init();