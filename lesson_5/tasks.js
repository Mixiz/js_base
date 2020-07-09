"use strict";
function handler_3_add() {
  document.querySelector('.modal').classList.add('hidden');
}

function handler_3_remove() {
  document.querySelector('.modal').classList.remove('hidden');
}

function handler_4_toogle(elem) {
  elem.classList.toggle('hidden');
}

function handler_4() {
  let parent_div = this.parentElement;
  parent_div.querySelectorAll('.product-desc').forEach(handler_4_toogle);
  parent_div.querySelectorAll('.product-img').forEach(handler_4_toogle);
}

window.addEventListener('load', function() {
  // 3. Модальное окно
  let btn_modal = document.querySelector('.modal-button');
  btn_modal.addEventListener('click', handler_3_add);
  
  let btn_show = document.querySelector('.task_3');
  btn_show.addEventListener('click', handler_3_remove);
  
  // 4. Описание продукта
  let btn_products = document.querySelectorAll('.product-btn');
  btn_products.forEach(function(elem) {
    elem.addEventListener('click', handler_4);
  });
});

// 5. Шахматная доска
function task_5 () {
  let div_elem = document.getElementById('game_field');
  generate_field(div_elem);
}
