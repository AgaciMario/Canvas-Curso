var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// retangulo
// fillRect => Desenha um retangulo usando as propriedades informadas
// fillStyle => Defini a cor de preenchimento do retangulo *sempre pega o ultimo valor definido ou padrão preto

ctx.fillStyle = "rgba(255,0,0,.5)";
ctx.fillRect(100,100,100,100);

ctx.fillStyle = "rgba(0,255,0,.5)";
ctx.fillRect(400,100,100,100);

ctx.fillStyle = "rgba(0,0,255,.5)";
ctx.fillRect(500,300,100,100);


/* Lines 
 * beinPath => indica que iniciaremos o desenho de uma linha
 * MoveTo => move o "pincel" para o ponto inicial da linha
 * lineTo => define o ponto para a onde a linha será desenhada. Não há limite para adição de pontos 
 * stroke => método final, desenha a linha connectando definidos com o lineTo
 * */ 

ctx.beginPath();
ctx.moveTo(50,300); 
ctx.lineTo(300, 100);
ctx.lineTo(400, 300); 
ctx.strokeStyle = "#fa34a3" // troca a cor da linha
ctx.stroke(); // método final, desenha a linha connectando os pontos acima

/* Arc | Circle
 * arc(x, y, raio, anguloInicial, anguloFinal, Antiorário)
 * anguloInicial e anguloFinal são definidos em radianos
 */

ctx.beginPath(); // necessário pois linha e arcos são na verdade path(caminhos) assim para separar o circulo da linha
ctx.strokeStyle = 'blue'
ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
ctx.stroke();

// Drawing multiples itens
for(let i = 0; i < 100; i++){
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    ctx.beginPath();
    ctx.strokeStyle = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')'
    ctx.arc(x, y, 30, 0, Math.PI * 2, false);
    ctx.stroke();
}








