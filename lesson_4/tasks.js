"use strict";
// 1. Число в объект
// es6
class MyInteger {
    constructor(number) {
      if (Number.isInteger(number)) {
        if (number >= 0 && number < 1000) {
          let tmp = number;
          this.units = tmp % 10;
          tmp = Math.floor(tmp/10);
          this.tens = tmp % 10;
          tmp = Math.floor(tmp/10);
          this.hundreds = tmp;
        }
        else {
          console.log('Введенное значение ' + number + ' не попадает в диапазон [0, 999]');
        }
      }
      else {
        console.log('Введенное значение ' + number + ' не является целочисленным');
      }
    }
}

function task_1() {
  let value = +document.getElementById("task_1_num").value;
  let myInteger = new MyInteger(value);
  console.log(myInteger);
}

// 1.1. Конструктор Product
// es5
function Product_es5(name, price) {
  if (price >= 0) {
    this.name = name;
    this.price = +price;
  }
  else {
    console.log('Введенное значение ' + price + ' некорректно');
  }
}

Product_es5.prototype.make25PercentDiscount = function() {
  this.price_w_discount = this.price * 0.75;
}

// es6
class Product {
    constructor(name, price) {
      if (price >= 0) {
        this.name = name;
        this.price = +price;
        this.make25PercentDiscount();
      }
      else {
        console.log('Введенное значение ' + price + ' некорректно');
      }
    }
    
    make25PercentDiscount() {
      this.price_w_discount = this.price * 0.75;
    }
}

function task_1_1() {
  let name = document.getElementById("task_1_1_name").value;
  let price = document.getElementById("task_1_1_price").value;
  
  let myProduct = new Product(name, price);
  console.log(myProduct);
  
  let myProduct_2 = new Product_es5(name, price);
  myProduct_2.make25PercentDiscount();
  console.log(myProduct_2);
}

// 1.2. Конструкторы продолжение
// es5
function Post_es5(author, text, date) {
  this.author = author;
  this.text = text;
  this.date = date;
}

function AttachedPost_es5(author, text, date) {
  Post_es5.call(this, author, text, date);
  this.highlighted = false;
}

AttachedPost_es5.prototype.makeTextHighlighted = function() {
  this.highlighted = true;
}

// es6
class Post {
    constructor(author, text, date) {
      this.author = author;
      this.text = text;
      this.date = date;
    }
}

class AttachedPost extends Post {
    constructor(author, text, date) {
      super(author, text, date);
      this.highlighted = false;
    }
    
    makeTextHighlighted () {
      this.highlighted = true;
    }
}

function task_1_2() {
  let author = document.getElementById("task_1_2_author").value;
  let text = document.getElementById("task_1_2_text").value;
  let date = document.getElementById("task_1_2_date").value;
  
  let myPost = new AttachedPost(author, text, date);
  console.log(myPost);
  myPost.makeTextHighlighted();
  console.log(myPost);
  
  let myPost_2 = new AttachedPost_es5(author, text, date);
  myPost_2.makeTextHighlighted();
  console.log(myPost_2);
}
