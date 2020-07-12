"use strict";

let slider;
let loadIcon;
let leftArrow;
let rightArrow;
let images;

slider = document.querySelector('.slider');

// Создаем иконку загрузки
loadIcon = document.createElement('i');
loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement("afterbegin", loadIcon);

document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');
  
// Создаем левую стрелку
leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

// Создаем правую стрелку
rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);

/**
* Функция скрывает иконку загрузки
* @param {HTMLElement} loadIcon 
*/
function hideLoadIcon(loadIcon) {
  loadIcon.style.display = "none";
}

/**
* Функция берет у элемента слайдера его data-атрибуты размеров,
* и если они определены, то самому слайдеру меняет размеры.
* @param {HTMLDivElement} slider 
*/
function setSizes(slider) {
  let width = slider.getAttribute("data-width");
  let height = slider.getAttribute("data-height");
  if (width !== null && width !== "") {
      slider.style.width = width;
  }
  if (height !== null && height !== "") {
      slider.style.height = height;
  }
}
setSizes(slider);

window.addEventListener('load', function() {
  // Объект слайдера
  images = {
      /* {int} Номер текущего изображения */
      currentIdx: 0,
  
      /* {HTMLDivElement[]} slides элементы слайдов */
      slides: [],
      
      /** Получаем все слайды и показываем первый слайд. */
      init() {
          this.slides = document.querySelectorAll('.slider-item');
          this.showImageWithCurrentIdx();
          
          // При завершении анимации пролистываем картинки
          this.slides.forEach(function (item) {
            item.addEventListener('animationend', () => {
              if (item.classList.contains('animate__bounceOutLeft')) {
                document.querySelector('.animate__bounceOutLeft').classList.remove('animate__bounceOutLeft');
                images.currentIdx = images.nextIndex();
                images.hideVisibleImages();
                images.showImageWithCurrentIdx();
              }
              else if (item.classList.contains('animate__bounceOutRight')){
                document.querySelector('.animate__bounceOutRight').classList.remove('animate__bounceOutRight');
                images.currentIdx = images.prevIndex();
                images.hideVisibleImages();
                images.showImageWithCurrentIdx();
              }
              else if (item.classList.contains('animate__bounceInRight')){
                document.querySelector('.animate__bounceInRight').classList.remove('animate__bounceInRight');
              }
              else if (item.classList.contains('animate__bounceInLeft')){
                document.querySelector('.animate__bounceInLeft').classList.remove('animate__bounceInLeft');
              }
            })
          });
      },
  
      /** Берем слайд с текущим индексом и убираем у него класс
       * hidden-slide. */
      showImageWithCurrentIdx(direction) {
          this.slides[this.getIndex(direction)].classList.remove('hidden-slide');
      },
  
      /** Всем слайдам добавляем класс hidden-slide. */
      hideVisibleImages() {
          this.slides.forEach(function (slide) {
              slide.classList.add('hidden-slide');
          });
      },
  
      prevIndex() {
        let newIndex;
        if (this.currentIdx == 0) {
            newIndex = this.slides.length - 1;
        } else {
            newIndex = this.currentIdx - 1;
        }
        
        return newIndex;
      },
      
      nextIndex() {
        let newIndex;
        if (this.currentIdx == this.slides.length - 1) {
            newIndex = 0;
        } else {
            newIndex = this.currentIdx + 1;
        }
        
        return newIndex;
      },
      
      getIndex(direction) {
        if (direction < 0)
          return this.prevIndex();
        else if (direction > 0)
          return this.nextIndex();
        else
          return this.currentIdx;
      },
  
      /** Переключиться на предыдущее изображение. */
      setNextLeftImage() {
          // Анимация
          images.showImageWithCurrentIdx(1);
          this.slides[this.nextIndex()].classList.add('animate__bounceInRight');
          this.slides[this.currentIdx].classList.add('animate__bounceOutLeft');
      },
  
      /** Переключиться на следующее изображение. */
      setNextRightImage() {
          // Анимация
          images.showImageWithCurrentIdx(-1);
          this.slides[this.prevIndex()].classList.add('animate__bounceInLeft');
          this.slides[this.currentIdx].classList.add('animate__bounceOutRight');
      },
  }
  
  leftArrow.addEventListener('click', function () {
    images.setNextLeftImage();
  });

  rightArrow.addEventListener('click', function () {
    images.setNextRightImage();
  });

  // Инициализация слайдера
  images.init();
  // Скрываем иконку загрузки
  hideLoadIcon(loadIcon);
});