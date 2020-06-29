"use strict";
// 1. Арифметические операции
function task_1() {
  let a = 1, b = 1, c, d;
  // сначала происходит инкрементация (a = 2), затем присвоение
  c = ++a;
  alert(c);
  
  // сначала происходит присвоение (d = 1), затем инкрементация (b будет равно 2)
  d = b++;
  alert(d);
  
  // a=2; сначала происходит инкрементация (a = 3), затем присвоение
  c = 2 + ++a;
  alert(c);
  
  // b=2; сначала происходит присвоение (d = 2 + 2), затем инкрементация (b будет равно 3)
  d = 2 + b++;
  alert(d);
  
  alert(a);
  alert(b);
}

// 2. Выражение
function task_2() {
  let a = 2;
  // сначала разбор выражения в скобках (a = a * 2), затем остальная часть (x = 1 + a * 2 => x = 5)
  let x = 1 + (a *= 2);
  alert(x); // 5
}

// 3. Значения выражений
function task_3() {
  let num_1 = document.getElementById("task_3_num_1").value;
  let num_2 = document.getElementById("task_3_num_2").value;
  try {
    num_1 = Number(num_1);
    num_2 = Number(num_2);
    // Положительные
    if (num_1 >= 0 && num_2 >= 0) {
      alert(num_1 - num_2);
    }
    // Отрицательные
    else if (num_1 < 0 && num_2 < 0) {
      alert(num_1 * num_2);
    }
    // Разные знаки
    // Так проще, но можно и по-другому
    //else if (Math.sign(num_1) * Math.sign(num_2) === -1) {
    else {
      alert(num_1 + num_2);
    }
  } catch (err) {
    console.err(err.message);
  }
}

// 4. Арифметические операции
function sum(num_1, num_2) {
  return num_1 + num_2;
}

function sub(num_1, num_2) {
  return num_1 - num_2;
}

function mul(num_1, num_2) {
  return num_1 * num_2;
}

function div(num_1, num_2) {
  return num_1 / num_2;
}

// 5. Арифметические операции продолжение
function task_5() {
  let num_1 = document.getElementById("task_5_num_1").value;
  let num_2 = document.getElementById("task_5_num_2").value;
  let op = document.getElementById("task_5_operation").value;
  try {
    num_1 = Number(num_1);
    num_2 = Number(num_2);
    let res;
    switch (op) {
      case "sum":
        res = sum(num_1, num_2);
        break;
      case "sub":
        res = sub(num_1, num_2);
        break;
      case "mul":
        res = mul(num_1, num_2);
        break;
      case "div":
        res = div(num_1, num_2); 
        break;
      default:
        res = "Неизвестная операция";
    }
    alert('Результат: ' + res);
  } catch (err) {
    console.err(err.message);
  }
} 