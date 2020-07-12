"use strict";

let cart;

function handle_position_del(event) {
  let tr = event.target.parentElement;
  cart.removeChild(tr);
  // Пересчитаем итого и добавим в конец таблицы
  count_total();
}

function count_total() {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  
  tr.id = 'total';
  td.colSpan = 3;
  td.innerText = 'Итого';
  tr.appendChild(td);
  
  let total = 0;
  
  cart.childNodes.forEach(function(elem){
    // Игнорируем строчку total
    if (elem.tagName == 'TR' && elem.id != 'total')
      total += +elem.childNodes[2].innerText.split(' ')[0];
  });
  
  td = document.createElement('td');
  td.innerText = total + ' руб';
  tr.appendChild(td);
  
  // Удалим старую строку Итого
  let exist_total = document.querySelector('#total');
  if (exist_total)
    cart.removeChild(exist_total);
  
  cart.appendChild(tr);
}

function addCart(elem) {
  let tr = document.createElement('tr');
  let id = elem.getAttribute('data-id');
  let name = elem.getAttribute('data-name');
  let price = elem.getAttribute('data-price');
  let count = 1;
  
  // Проверим существование
  let cart_elem = document.getElementById('cart_'+id);
  if (cart_elem) {
    let row = cart_elem.parentElement;
    let cur_price = row.childNodes[2];
    let cur_count = row.childNodes[3];
    
    cur_price.innerText = +cur_price.innerText.split(' ')[0] + +price + ' руб'; 
    cur_count.innerText = +cur_count.innerText + count;
  }
  else {
    let td = document.createElement('td');
    td.innerText = id;
    td.id = 'cart_' + id;
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.innerText = name;
    tr.appendChild(td);
  
    td = document.createElement('td');
    td.innerText = price + ' руб.';
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.innerText = count;
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.innerText = 'x';
    td.classList.add('pointer');
    td.addEventListener('click', handle_position_del);
    tr.appendChild(td);
  
    cart.appendChild(tr);
  }
  
  // Пересчитаем итого и добавим в конец таблицы
  count_total();
}

window.addEventListener('load', function() {
  cart = document.querySelector('.cart-position-tbl');
  
  let btn = document.querySelector('.cart-btn');
  btn.addEventListener('click', function() {
    document.querySelector('.cart-position-tbl').classList.toggle('hidden');
  });
  
  count_total();
});
