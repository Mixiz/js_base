"use strict";

class Field{
    gameField;
    rows;
    columns;
    mapValues;
    
    constructor(divElement, settings = {'rows':3, 'columns': 3}) {
        this.gameField = divElement;
        this.rows = settings['rows'];
        this.columns = settings['columns'];
        
        this.mapValues = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.mapValues[i] = new Array(this.columns)
            for(let j = 0; j < this.columns; j++) {
                this.mapValues[i][j] = '';
            };
        }
    }
    
    /**
     * Отрисовать пустое поле
     */
    render() {
      let tbl = document.createElement("table");
      let tblBody = document.createElement("tbody");
      tbl.classList.add('game');
      
      for (let i = 0; i < this.rows; i++) {
        let tr = document.createElement('tr');
        
        for (let j = 0; j < this.columns; j++) {
          let td = document.createElement('td');
          td.dataset.row = i.toString();
          td.dataset.col = j.toString();
          tr.appendChild(td);
        }
        
        tblBody.appendChild(tr);
      }
      
      tbl.appendChild(tblBody);
      // Чистим, если есть старое поле
      let old_tbl = this.gameField.querySelector('table');
      if (old_tbl != undefined) {
        old_tbl.remove();
      }
      this.gameField.appendChild(tbl);
    }
    
    /**
     * Проверка что в ячейку не ставили значение (крестик или нолик).
     * @param {integer} row
     * @param {integer} col
     * @returns {boolean} Вернет true, если ячейка пуста, иначе false.
     */
    isCellEmpty(row, col) {
        return this.mapValues[row][col] === '';
    }
    
    /**
     * Заполняет ячейку на поле
     * @param {integer} row
     * @param {integer} col
     * @param {string} symbol
     */
    fillCell(cell, row, col, symbol) {
        // Заполняем ячейку и ставим значение в массиве, в свойстве mapValues.
        this.mapValues[row][col] = symbol;
        cell.textContent = symbol;
    }
    
    /**
     * Проверка есть ли выигрышная ситуация на линии.
     * @param {{x: int, y: int}} a 1-ая ячейка.
     * @param {{x: int, y: int}} b 2-ая ячейка.
     * @param {{x: int, y: int}} c 3-я ячейка.
     * @returns {boolean} Вернет true, если линия выиграна, иначе false.
     */
    isLineWon(a, b, c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    }
    
    /**
     * Проверка, что на поле есть выигрышная ситуация
     */
    hasWinningLine() {
        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
               this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
               this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

               this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
               this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
               this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

               this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
               this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    }
};