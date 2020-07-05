"use strict";

const ROWS = 10;
const COLUMNS = 10;
const WALL_CNT = 30;

const keys = {
  'ArrowUp': [0,-1], 
  'ArrowDown' : [0,1], 
  'ArrowLeft': [-1,0], 
  'ArrowRight': [1,0],
  // Дополнительные клавиши
  'Numpad8': [0,-1], 
  'Numpad2' : [0,1], 
  'Numpad4': [-1,0], 
  'Numpad6': [1,0],
  'Numpad3': [1, 1],
  'Numpad1': [-1, 1],
  'Numpad9': [1, -1],
  'Numpad7': [-1, -1]
};

let game_field;
let difficult;
let player;
let exit;
let game_objects = [];

// Типы игровых объектов
const C_PLAYER = 1;
const C_EXIT = 2;
const C_WALL = 3;

// Общая структура для объектов на поле
class GameObject{
  constructor(symbol, x, y) {
    this.symbol = symbol;
    this.x = Math.max(Math.min(x, COLUMNS * difficult - 1), 0);
    this.y = Math.max(Math.min(y, ROWS * difficult - 1), 0);
  }
}

// Тип игрок
class Player extends GameObject{
  constructor(symbol, x, y) {
    super(symbol, x, y);
    this.type = C_PLAYER;
  }
}

// Тип выход
class Exit extends GameObject{
  constructor(symbol, x, y) {
    super(symbol, x, y);
    this.type = C_EXIT;
  }
}

// Тип стена
class Wall extends GameObject{
  constructor(symbol, x, y) {
    super(symbol, x, y);
    this.type = C_WALL;
  }
}

// Отобразить объект на поле
function putObjectOnField(object) {
  let cell = document.getElementById(object.y+'_'+object.x);
  cell.innerHTML = object.symbol;
}

// Очистить ячейку
function clearCell(x, y) {
  let cell = document.getElementById(y+'_'+x);
  cell.innerHTML = '';
}

// Проверяем наличие объекта
function check_object_exists(object) {
  let object_exists = false;
  game_objects.forEach(function(item){
    if (item.x == object.x && item.y == object.y) {
      object_exists = true;
    }
  });
  
  return object_exists;
}

// Отрисовка объектов на поле
function drawObjects() {
  game_objects.forEach(function(item) {
    putObjectOnField(item);
  });
}

// Инициализация поля
function init_game() {
  difficult = +document.getElementById("difficult").value;
  let r_count = ROWS * difficult;
  let c_count = COLUMNS * difficult;
  let w_count = WALL_CNT * difficult * difficult;
  game_field = [r_count][c_count];
  game_objects = [];
  
  player = new GameObject('o', 0, 0);
  exit = new GameObject('x', c_count-1, r_count-1);
  
  let html_table = "<table class='game_field'>";
  for (let i = 0; i < r_count; i++) {
    html_table += '<tr>'
    for (let j = 0; j < c_count; j++) {
      html_table += "<td id='"+i+'_'+j+"'>";
    }
  }
  html_table += "</table>";
  
  document.getElementById("game_field").innerHTML = html_table;
  
  game_objects.push(player);
  game_objects.push(exit);
  
  // Рисуем стены
  for(let i = 0; i < w_count; i++) {
    let x = Math.floor(Math.random() * Math.floor(c_count));
    let y = Math.floor(Math.random() * Math.floor(r_count));
    let wall = new Wall('w', x, y);
    
    if (!check_object_exists(wall)) {
      game_objects.push(wall);
    }
  }
  
  drawObjects();
  // Передвижение
  let kinput = document.getElementById("kinput");
  kinput.onkeydown = handle;
}

// Обработка нажатия клавиш
function handle(event) {
    if (event.code in keys) {
      
      let move_x = keys[event.code][0];
      let move_y = keys[event.code][1];
    
      let game_obj = new GameObject('', player.x + move_x, player.y + move_y);
      if (!check_object_exists(game_obj)) {
        clearCell(player.x, player.y);
        player.x = player.x + move_x;
        player.y = player.y + move_y;
        putObjectOnField(player);
      }
      
      // Условие победы - дошли до выхода
      if (game_obj.x == exit.x && game_obj.y == exit.y) {
        alert('Congrats! You won!');
      }
    }
  }