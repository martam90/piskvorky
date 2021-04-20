'use strict';

const grid = document.querySelector('.grid');

for (let i = 0; i < 100; i++) {
  let btn = document.createElement('button');
  btn.className = 'btn';
  grid.appendChild(btn);
}

let isPlaying = 'circle';

const buttons = document.querySelectorAll('.btn');
const playerCircle = document.querySelector('.circle--large');
const playerCross = document.querySelector('.cross--large');

for (let button of buttons) {
  button.addEventListener('click', () => {
    if (isPlaying === 'circle') {
      let circle = document.createElement('img');
      circle.src = 'images/circle.svg';
      circle.className = 'circle--black';
      button.appendChild(circle);
      button.setAttribute('disabled', true);
      playerCircle.classList.add('active');
      playerCross.classList.add('active');
      isPlaying = 'cross'; 
    } else if (isPlaying === 'cross') {
      let cross = document.createElement('img');
      cross.src = 'images/cross.svg';
      cross.className = 'cross--black';
      button.appendChild(cross);
      button.setAttribute('disabled', true);
      playerCircle.classList.remove('active');
      playerCross.classList.remove('active');
      isPlaying = 'circle'; 
    }
  });
}
