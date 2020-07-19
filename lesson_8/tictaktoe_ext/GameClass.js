"use strict";

class Game {
    status;
    field;
    phase;
    divElem;
    
    constructor() {
        this.status = 'playing';
        this.phase = 'X';
    }
    
    /**
     * Инициализация игры.
     */
    init(divElement) {
        this.divElem = divElement;
        this.field = new Field(divElement, {'rows': 50, 'columns': 50, 'length_win': 5});
        // Выводим все ячейки.
        this.field.render();
        // Инициализируем обработчики событий.
        this.initEventHandlers();
    }
    
    /**
     * Инициализация обработчиков событий.
     */
    initEventHandlers() {
        // Ставим обработчик, при клике на таблицу вызовется функция this.cellClickHandler.
        this.divElem.addEventListener('click', event => this.cellClickHandler(event));
    }
    
    /**
     * Обработчик события клика.
     * @param {MouseEvent} event
     */
    cellClickHandler(event) {
        // Если клик не нужно обрабатывать, уходим из функции.
        if (!this.isCorrectClick(event)) {
            return;
        }

        // Заполняем ячейку.
        this.field.fillCell(event.target, +event.target.dataset.row, +event.target.dataset.col, this.phase);
        // Если кто-то выиграл, заходим в if.
        if (this.hasWon()) {
            // Ставим статус в "остановлено".
            this.setStatusStopped();
            // Сообщаем о победе пользователя.
            this.sayWonPhrase();
        }

        // Меняем фигуру (крестик или нолик).
        this.togglePhase();
    }
    
    /**
     * Ставит статус игры в "остановлена".
     */
    setStatusStopped() {
        this.status = 'stopped';
    }

    /**
     * Сообщает о победе.
     */
    sayWonPhrase() {
        let figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    }
    
    /**
     * Меняет фигуру (крестик или нолик).
     */
    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
    
    /**
     * Проверка что мы "играем", что игра не закончена.
     * @returns {boolean} Вернет true, статус игры "играем", иначе false.
     */
    isStatusPlaying() {
        return this.status === 'playing';
    }
    
    /**
     * Проверка что клик был по ячейке.
     * @param {Event} event
     * @param {HTMLElement} event.target
     * @returns {boolean} Вернет true, если клик был по ячейке, иначе false.
     */
    isClickByCell(event) {
        return event.target.tagName === 'TD';
    }
    
    /**
     * Проверка был ли корректный клик, что описан в событии event.
     * @param {Event} event
     * @returns {boolean} Вернет true в случае если статус игры "играем", клик что описан в объекте event был
     * по ячейке и ячейка куда был произведен клик был по пустой ячейке.
     */
    isCorrectClick(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        return this.isStatusPlaying() && this.isClickByCell(event) && this.field.isCellEmpty(row, col);
    }
    
    /**
     * Проверка есть ли выигрышная ситуация на карте.
     * @returns {boolean} Вернет true, если игра выиграна, иначе false.
     */
    hasWon() {
        return this.field.hasWinningLine();
    }
};