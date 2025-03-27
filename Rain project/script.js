
// Globals
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var grativy = 0.1;
var rainDropletArray = [];

// define canvas to the size of the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// utility
function randomNumberFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//events
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function RainDroplet(x1, y1, y2, dy) {
    this.x1 = x1;
    this.y1 = y1;
    this.y2 = y2;
    this.dy = dy;

    this.update = function(){

        this.dy += grativy; // velocity incresed by time simulating gravity

        this.y1 += this.dy;
        this.y2 += this.dy;

        this.draw();
    }

    this.draw = function (){
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x1, this.y2);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }
}

function init(){
    rainDropletArray = [];
    for(let i = 0; i < 1000; i++){
        let x = randomNumberFromRange(0, canvas.width);
        let dropletLength = randomNumberFromRange(3, 10);
        let dropletVelocity = randomNumberFromRange(1, 3);
        rainDropletArray.push(new RainDroplet(x, 0, dropletLength, dropletVelocity));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i = 0; i < rainDropletArray.length; i++){
        rainDropletArray[i].update();
    }

    // remove the droplet that are of the canvas and add new ones to the top
    for(let i = 0; i < rainDropletArray.length; i++){
        if(rainDropletArray[i].y1 > canvas.height){
            rainDropletArray.splice(i, 1);

            let x = randomNumberFromRange(0, canvas.width);
            let dropletLength = randomNumberFromRange(3, 20);
            let dropletVelocity = randomNumberFromRange(1, 3);
            rainDropletArray.push(new RainDroplet(x, 0, dropletLength, dropletVelocity));
        }
    }
}

init();
animate();