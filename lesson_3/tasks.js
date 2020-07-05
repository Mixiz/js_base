"use strict";
// 2. Цикл for
function task_2() {
  for (let i = 0; i <= 10; i++) {
    if (i) {
      if (i % 2) {
        console.log(i + ' - это нечетное');
      }
      else {
        console.log(i + ' - это четное');
      }
    }
    else {
      console.log(i + ' - это ноль');
    }
  }
}

// 3. Вывод в консоль
function task_3() {
  const post = {
    author: "John", //вывести этот текст
    postId: 23,
    comments: [
      {
        userId: 10,
        userName: "Alex",
        text: "lorem ipsum",
        rating: {
          likes: 10,
          dislikes: 2 //вывести это число
        }
      },
      {
        userId: 5, //вывести это число
        userName: "Jane",
        text: "lorem ipsum 2", //вывести этот текст
        rating: {
          likes: 3,
          dislikes: 1
        }
      },
    ]
  }
  
  console.log(post.author);
  console.log(post.comments[0].rating.dislikes);
  console.log(post.comments[1].userId);
  console.log(post.comments[1].text);
}

// 4. Foreach скидка
function task_4() {
  const products = [
    {
      id: 3,
      price: 200,
    },
    {
      id: 4,
      price: 900,
    },
    {
      id: 1,
      price: 1000,
    },
  ];
  const discount = 0.15;
  
  // Применяем скидку
  products.forEach(function (elem) {
    elem.price_discount = elem.price * (1 - discount);
  });
  
  // Вывод результата в консоль
  console.table(products);
}

// 5. Работа с товарами
function task_5() {
  const products = [
    {
      id: 3,
      price: 127,
      photos: [
        "1.jpg",
        "2.jpg",
      ]
    },
    {
      id: 5,
      price: 499,
      photos: []
    },
    {
      id: 10,
      price: 26,
      photos: [
        "3.jpg"
      ]
    },
    {
      id: 8,
      price: 78,
    },
  ];
  
  let products_w_photo = products.filter(function(product) {
      return product.photos !== undefined && product.photos.length > 0;
  });
  
  console.log(products_w_photo);
} 

// 6. Цикл for
function task_6() {
  for (let i = 0; i < 10; console.log(i), i++) {}
} 

// 7. Лесенка
function task_7() {
   for (let i = 1, str = '*'; i <= 20; i++) {
     console.log(str);
     str += '*';
   }
} 