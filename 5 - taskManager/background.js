function randint(value) {
    return Math.floor(Math.random() * value + 1);
}

function getPoints(amount) {
    let result = [];
    for (let i = 0; i < amount; i++) {
        result.push([randint(window.innerWidth), randint(window.innerHeight), randint(10) - 5, randint(10) - 5]);
    }
    return result;
}

function getPosition(point, deltaTime) {
    point[0] = (point[0] + deltaTime * point[2] + window.innerWidth) % window.innerWidth;
    point[1] = (point[1] + deltaTime * point[3] + window.innerHeight) % window.innerHeight;
}

function distance(from, to) {
    return Math.sqrt((from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]));
}

function getColor(value) {
    let element = Math.max(0, 255 - value); 
    return 'rgb(' + element + ', ' + element + ', ' + element + ')';
}

function compare(a, b){
    return (-a[0] + b[0]);
}

function backgroundDrawingLoop(points, screen){
    screen.clearRect(0, 0, window.innerWidth, window.innerHeight);
    screen.lineWidth='3';
    screen.strokeStyle="white";
    screen.fillStyle = 'white';

    for (let i = 0; i < points.length; i++) {
        getPosition(points[i], 0.03);
    }

    let distList = []

    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i; j < points.length; j++) {
            let dist = distance(points[i], points[j]);
            if (dist < 255){
                distList.push([dist, getColor(dist), points[i], points[j]])
            }
        }
    }

    distList.sort(compare);

    for (let i = 0; i < distList.length - 1; i++) {
        screen.beginPath();
        screen.strokeStyle = distList[i][1];
        screen.moveTo(distList[i][2][0], distList[i][2][1]);
        screen.lineTo(distList[i][3][0], distList[i][3][1]);
        screen.stroke();
    }

    screen.strokeStyle="white";
    for (let i = 0; i < points.length; i++) {
        screen.beginPath();
        screen.arc(points[i][0], points[i][1], 3, 0, 0.1, true);
        screen.fill();
        screen.stroke();
    }

    timer = setTimeout(backgroundDrawingLoop, 10, points, screen);
}

function backgroundDrawing(){
    let canvas = document.getElementById('c1');
    let screen = canvas.getContext('2d');
    let timer;
    let points = getPoints(40);
    backgroundDrawingLoop(points, screen);    
}

backgroundDrawing();