"use strict";

const ROWS = 8;
const COLUMNS = 8;

// Рисует чистое поле шахматной доски в заданном элементе
function generate_field(div_elem) {
  let html_table = "<table class='game_field'>";
  let td_class;
  for (let i = 0; i <= ROWS; i++) {
    html_table += '<tr>';
    
    for (let j = 0; j <= COLUMNS; j++) {
      let val = '';
      
      if (i != ROWS && j != 0) {
        // Не края, у клеток есть цвет
        if ((i + j) % 2) {
          td_class ="white_field";
        }
        else {
          td_class ="black_field";
        }
      }
      else {
        // Для краев выставляем цифры и буквы
        td_class = 'no_border';
        if (i != ROWS) {
          val = ROWS - i;
        }
        else if(j != 0) {
          val = String.fromCharCode(64 + j);
        }
      }
      
      html_table += "<td class="+td_class+">"+val;
    }
  }
  html_table += "</table>";
  
  div_elem.innerHTML = html_table;
}
