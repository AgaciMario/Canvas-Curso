var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

ctx.fillRect(100,100,100,100);
ctx.fillRect(400,100,100,100);
ctx.fillRect(500,300,100,100);
ctx.fillRect(300,300,100,100);