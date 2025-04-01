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

function getDistance(x1, y1, x2, y2){
    let xDistance =  x2 - x1;  
    let yDistance =  y2 - y1; 
    
    return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
}

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function (){
       
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

let circle1; 
let circle2; 
function init(){
    circle1 = new Circle(300, 300, 100, 'black');
    circle2 = new Circle(undefined, undefined, 30, 'red');
}

// animation loop implementation 
function animate(){
    requestAnimationFrame(animate); 
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    circle1.update();

    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius){
        circle1.color = 'red';
    } else {
        circle1.color = 'black';
    }

    console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y));
}

init();
animate(); 


