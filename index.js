'use strict';

const grid = document.querySelector('.grid');

for (let i = 0; i < 100; i++) {
  const btn = document.createElement('button');
  btn.className = "btn";
  grid.appendChild(btn);
}
