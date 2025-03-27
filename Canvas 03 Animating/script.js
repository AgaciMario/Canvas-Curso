var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// retangulo
// fillRect => Desenha um retangulo usando as propriedades informadas
// fillStyle => Defini a cor de preenchimento do retangulo *sempre pega o ultimo valor definido ou padrão preto

// ctx.fillStyle = "rgba(255,0,0,.5)";
// ctx.fillRect(100,100,100,100);

// ctx.fillStyle = "rgba(0,255,0,.5)";
// ctx.fillRect(400,100,100,100);

// ctx.fillStyle = "rgba(0,0,255,.5)";
// ctx.fillRect(500,300,100,100);


/* Lines 
 * beinPath => indica que iniciaremos o desenho de uma linha
 * MoveTo => move o "pincel" para o ponto inicial da linha
 * lineTo => define o ponto para a onde a linha será desenhada. Não há limite para adição de pontos 
 * stroke => método final, desenha a linha connectando definidos com o lineTo
 * */ 

// ctx.beginPath();
// ctx.moveTo(50,300); 
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300); 
// ctx.strokeStyle = "#fa34a3" // troca a cor da linha
// ctx.stroke(); // método final, desenha a linha connectando os pontos acima

/* Arc | Circle
 * arc(x, y, raio, anguloInicial, anguloFinal, Antiorário)
 * anguloInicial e anguloFinal são definidos em radianos
 */

// ctx.beginPath(); // necessário pois linha e arcos são na verdade path(caminhos) assim para separar o circulo da linha
// ctx.strokeStyle = 'blue'
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.stroke();

// // Drawing multiples itens
// for(let i = 0; i < 100; i++){
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.strokeStyle = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')'
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.stroke();
// }

var circleArray = [];

// using OOP to create a CircleObject
function ObjCircle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius
    this.fillStyle = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
    this.fillstroke = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.fillstroke;
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.stroke();
    }

    this.update = function(){
        // collision check
        if(this.x + radius > window.innerWidth || this.x - radius < 0){
            this.dx = -this.dx; // make the circle bounce of horizontaly by inverting its x velocity
            //this.addOneCircle();
        }
    
        if(this.y + radius > window.innerHeight || this.y - radius < 0){
            this.dy = -this.dy; // make the circle bounce of verticaly by inverting its y velocity
            //this.addOneCircle();
        }
    
        this.x += this.dx; // update the x position with the velocity thus making the circle move by the factor dx
        this.y += this.dy; // update the y position with the velocity thus making the circle move by the factor dy
        this.draw();
    }

    this.addOneCircle = function(){
        var radius = 40;
        var x = Math.random() * (window.innerWidth - radius * 2) + radius;
        var y = Math.random() * (window.innerHeight - radius * 2) + radius;
        var dx = (Math.random() * - 0.5) * 10; // velocidade na horizontal * -0.5 para que possamos ter valores negativos de velocidade
        var dy = (Math.random() * - 0.5) * 10; // velocidade na vertical
        
        circleArray.push(new ObjCircle(x, y, dx, dy, radius))
    }
}


//spawns a 100 circles on the canvas
for(let i = 0; i < 50; i++){
    var radius = 40;
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() * - 0.5) * 10; // velocidade na horizontal * -0.5 para que possamos ter valores negativos de velocidade
    var dy = (Math.random() * - 0.5) * 10; // velocidade na vertical
    
    circleArray.push(new ObjCircle(x, y, dx, dy, radius))
}

// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// var dx = (Math.random() * - 0.5) * 10; // velocidade na horizontal * -0.5 para que possamos ter valores negativos de velocidade
// var dy = (Math.random() * - 0.5) * 10; // velocidade na vertical
// var radius = 40;

function animate(){
    requestAnimationFrame(animate); // define a função de loop para criação dos frames de animação
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // limpa o canvas ou area informada

    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

animate(); // inicia o loop de criação de frames


