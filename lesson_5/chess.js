"use strict";

const ROWS = 8;
const COLUMNS = 8;

// Рисует чистое поле шахматной доски в заданном элементе
function generate_field(div_elem) {
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");
  tbl.classList.add('game_field');
  
  for (let i = 0; i <= ROWS; i++) {
    let tr = document.createElement('tr');
    
    for (let j = 0; j <= COLUMNS; j++) {
      let val = '';
      let td_class;
      
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
      
      let td = document.createElement('td');
      td.classList.add(td_class);
      td.innerText = val;
      tr.appendChild(td);
    }
    
    tblBody.appendChild(tr);
  }
  
  tbl.appendChild(tblBody);
  let old_tbl = div_elem.querySelector('table');
  if (old_tbl != undefined) {
    old_tbl.remove();
  }
  div_elem.appendChild(tbl);
}
