"use strict";
// 1. Отображение температуры в Фаренгейтах
function task_1(value) {
  try {
    let temp_c = parseFloat(value);
    let temp_res = (9 / 5) * temp_c + 32;
    document.getElementById("fahrenheit").innerHTML = temp_res + '°F';
  } catch (err) {
      console.error(err.message);
      document.getElementById("fahrenheit").innerHTML = err.message;
  }
}

// 2. Админ Василий
function task_2() {
  let name = "Василий"
  let admin = name;
  console.log(admin);
}

// 3. Значения выражений
function task_3() {
  // Приведение типов (число + число + строка) отработает (первое и второе число сложатся, число приведется к строке) и получим 2010
  // 10+10 = 20; 20 + "10" = "2010"
  let exp_1 = 10 + 10 + "10";
  console.log(exp_1);
  
  // Приведение типов (число + строка + число) отработает (число приведется к строке, допишет число к полученной строке) и получим 101010
  // 10 + "10" = "1010"; "1010" + 10 = "101010"
  let exp_2 = 10 + "10" + 10;
  console.log(exp_2);
  
  // Использован унарный плюс, который приводит строку к числу. Результат: 30
  // +"10" = 10; 10 + 10 = 20; 20 + 10 = 30
  let exp_3 = 10 + 10 + +"10";
  console.log(exp_3);
  
  // Унарный минус приведет к -0, в результате деления будет -Infinity
  // -"" = -0; 10 / -0 = -Infinity
  let exp_4 = 10 / -"";
  console.log(exp_4);
  
  // Ошибка разбора строки (разделитель должен быть "."), получим NaN, значение всего выражения NaN
  // +"2,5" = NaN; 10 / NaN = NaN
  let exp_5 = 10 / +"2,5";
  console.log(exp_5);
}

// 4. Название переменных
// Закомментированы ошибочные
function task_4() {
  try {
    let mode = "normal"; // Ок
  } catch (err) {
    console.log('Ошибка наименования "mode", ' + err.message);
  }
  
  try {
    let my_valu3 = 102; // Ок
  } catch (err) {
    console.log('Ошибка наименования "my_valu3", ' + err.message);
  }
  
  /*try {
    let 3my_value3 = "102"; // Название начинается с числа, будет ошибка
  } catch (err) {
    console.log('Ошибка наименования "3my_value3", ' + err.message);
  }*/
  
  try {
    let __hello__ = "world"; // Нижнее подчеркивание допустимо
  } catch (err) {
    console.log('Ошибка наименования "__hello__", ' + err.message);
  }
  
  try {
    let $$$ = "money"; // Символ доллара допустим, но не рекомендуется использовать
    // Ecma Script (7.6 Identifiers, ECMA-262, 3rd Ed.) сказано: «Символ доллара предназначен для использования только в автоматически сгенерированном коде»
  } catch (err) {
    console.log('Ошибка наименования "$$$", ' + err.message);
  }
  
  /*try {
    let !0_world = true; // Недопустимый символ
  } catch (err) {
    console.log('Ошибка наименования "!0_world", ' + err.message);
  }*/
  
}