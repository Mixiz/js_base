"use strict";

class Field{
    gameField;
    rows;
    columns;
    mapValues;
    length_win;
    
    // Координаты последнего хода
    last_x;
    last_y;
    
    constructor(divElement, settings = {'rows':3, 'columns': 3, 'length_win': 3}) {
        this.gameField = divElement;
        this.rows = settings['rows'];
        this.columns = settings['columns'];
        this.length_win = settings['length_win'];
        
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
          td.id = i + '_' + j;
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
        
        this.last_x = row;
        this.last_y = col;
    }
    
    colorWinningLine() {
        let x;
        let y;
        if (this.isLineWon(this.last_x, this.last_y, { x: 1, y: 0 })) {
            x = 1;
            y = 0;
        }
        else if (this.isLineWon(this.last_x, this.last_y, { x: 0, y: 1 })) {
            x = 0;
            y = 1;
        }
        else if (this.isLineWon(this.last_x, this.last_y, { x: 1, y: 1 })) {
            x = 1;
            y = 1;
        }
        else if (this.isLineWon(this.last_x, this.last_y, { x: -1, y: 1 })) {
            x = -1;
            y = 1;
        }
        
        let symbol = this.getMapValue(this.last_x, this.last_y);
        
        // Нашли направление, теперь найден нужные ячейки
        for (let i = 0; i < this.length_win; i++) {
            let tmp_x = this.last_x + x * i;
            let tmp_y = this.last_y + y * i;
            
            if (this.getMapValue(tmp_x, tmp_y) === symbol)
                document.getElementById(tmp_x + '_' + tmp_y).classList.add('win-line');
            else
                break;
        }
        
        for (let i = 0; i > -this.length_win; i--) {
            let tmp_x = this.last_x + x * i;
            let tmp_y = this.last_y + y * i;
            
            if (this.getMapValue(tmp_x, tmp_y) === symbol)
                document.getElementById(tmp_x + '_' + tmp_y).classList.add('win-line');
            else
                break;
        }
    }
    
    /**
     * Получить значение на поле, с учетом выхода за пределы массива
     * @param {integer} x
     * @param {integer} y
     */
    getMapValue(x, y) {
        if (x < 0 || y < 0)
            return '';
        
        if (x >= this.mapValues.length || y >= this.mapValues[0].length)
            return '';
        
        return this.mapValues[x][y];
    }
    
    /**
     * Проверка есть ли выигрышная ситуация на линии.
     * @param {integer} x
     * @param {integer} y
     * @param {{x: int, y: int}} type_line - горизонтальная линия / вертикальная / диагональная, указано смещение
     * @returns {boolean} Вернет true, если линия выиграна, иначе false.
     */
    isLineWon(x, y, type_line) {
        // Проверяем линию на наличие выигрышной комбинации
        let value = '';
        for (let i = -this.length_win; i <= this.length_win; i++ ) {
            let tmp_x = x + type_line.x * i;
            let tmp_y = y + type_line.y * i;
            value += this.getMapValue(tmp_x, tmp_y);
        }
        
        return value.includes('XXXXX') || value.includes('00000');
    }
    
    /**
     * Проверка, что на поле есть выигрышная ситуация
     * Если есть, то отметим ее на поле
     */
    hasWinningLine() {
        let hasWon = this.isLineWon(this.last_x, this.last_y, { x: 1, y: 0 }) ||
                     this.isLineWon(this.last_x, this.last_y, { x: 0, y: 1 }) ||
                     this.isLineWon(this.last_x, this.last_y, { x: 1, y: 1 }) ||
                     this.isLineWon(this.last_x, this.last_y, { x: -1, y: 1 });
                     
        if (hasWon) {
            this.colorWinningLine();
        }
        
        return hasWon;
    }
};