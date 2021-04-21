'use strict';

let isPlaying = 'circle';
const grid = document.querySelector('.grid');
const playerCircle = document.querySelector('.circle--large');
const playerCross = document.querySelector('.cross--large');

for (let i = 0; i < 100; i++) {
  let btn = document.createElement('button');
  btn.className = 'btn';
  btn.addEventListener('click', () => {
    if (isPlaying === 'circle') {
      btn.classList.add('board__field--circle');
      btn.disabled = true;
      playerCircle.classList.remove('active');
      playerCross.classList.add('active');
      isPlaying = 'cross'; 
    } else if (isPlaying === 'cross') {
      btn.classList.add('board__field--cross');
      btn.disabled = true;
      playerCircle.classList.add('active');
      playerCross.classList.remove('active');
      isPlaying = 'circle'; 
    }
  });
  grid.appendChild(btn);
}
