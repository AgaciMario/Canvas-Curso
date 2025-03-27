var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var colorArrays = [
    '#223843',
    '#eff1f3',
    '#8390FA',
    '#F93943',
    '#00BD9D',
];

var grativy = 1;
var friction = 0.99;
// track mouse position
window.addEventListener('mousemove', function (event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('click', function (event){
    init();
});

//tracks the resize of the page 
window.addEventListener('resize', function (event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// utility
function randomNumberFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColorFromArray(colorArray){
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function (){
        if(this.y + this.radius + this.dy > canvas.height)
            this.dy = -this.dy * friction; // each time the ball hit the floor it loses part of the velocity due to friction
        else 
            this.dy += grativy;// add velocity thus making the ilusion of gravity 

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0)
            this.dx = -this.dx;

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.stroke();
        ctx.fill();
    }
}

// initialization
var ball;
var ballArray = [];
function init(){
    ballArray = [];
    for(let i = 0; i < 400; i++){
        let radius = randomNumberFromRange(8, 20);
        let x = randomNumberFromRange(radius, canvas.width - radius);
        let y = randomNumberFromRange(0, canvas.height - radius);
        let dx = randomNumberFromRange(-2, 2);
        let dy = randomNumberFromRange(-2, 2);
        let randomColor = randomColorFromArray(colorArrays);
        ballArray.push(new Ball(x, y, dx, dy, radius, randomColor));
    }
}

// animation loop implementation 
function animate(){
    requestAnimationFrame(animate); 
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    for(let i = 0; i < ballArray.length; i++){
        ballArray[i].update();
    }
}

init();
animate(); 


