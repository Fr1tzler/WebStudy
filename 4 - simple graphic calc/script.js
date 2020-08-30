let minX = 0;
let maxX = 15;
let maxY = -3;
let minY = 3;
let func = "1 / Math.tan(x * x)"

function mathFunc(x) {
    return eval(func);
}

function parseFunction() {

}

function backgroundDrawingLoop(screen, iterationCount){
    if (iterationCount > 2000) return;
    screen.clearRect(0, 0, window.innerWidth, window.innerHeight);
    screen.lineWidth='1';
    screen.strokeStyle="white";
    screen.fillStyle = 'white';
    for (let i = 0; i < iterationCount; i++) {
        let alpha = (i + 1) / (iterationCount + 1);
        let realX = (maxX - minX) * alpha + minX;
        let screenX = window.innerWidth * alpha;
        let screenY = window.innerHeight * (maxY - mathFunc(realX)) / (maxY - minY);
        drawCircle(screen, screenX, screenY);
    }
    timer = setTimeout(backgroundDrawingLoop, 5, screen, iterationCount * 1.005);
}

function drawCircle(screen, x, y){
    screen.beginPath();
    screen.arc(x, y, 3, 0, 0.1, true);
    screen.fill();
    screen.stroke();
}

function backgroundDrawing(iterations){
    let canvas = document.getElementById('c1');
    let screen = canvas.getContext('2d');
    screen.clearRect(0, 0, window.innerWidth, window.innerHeight);
    backgroundDrawingLoop(screen, iterations);    
}

function build(){
    minX = Number(document.getElementById('minX').value);
    minY = Number(document.getElementById('minY').value);
    maxX = Number(document.getElementById('maxX').value);
    maxY = Number(document.getElementById('maxY').value);
    func = document.getElementById('func').value;
    parseFunction();
    backgroundDrawing(100);
}