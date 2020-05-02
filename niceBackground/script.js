let maxX = 1600;
let maxY = 900;
let canvas = document.getElementById('c1');
let screen = canvas.getContext('2d');
let timer;
let points = getPoints(30);

function randint(value) {
    return Math.floor(Math.random() * value + 1);
}

function getPoints(amount) {
    let result = [];
    for (let i = 0; i < amount; i++) {
        result.push([randint(maxX), randint(maxY), randint(10) - 5, randint(10) - 5]);
    }
    return result;
}

function getPosition(point, deltaTime) {
    point[0] = (point[0] + deltaTime * point[2] + maxX) % maxX;
    point[1] = (point[1] + deltaTime * point[3] + maxY) % maxY;
}

function distance(from, to) {
    return Math.sqrt((from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]));
}

function getColor(value) {
    let a = Math.max(0, 255 - value); 
    return 'rgb(' + a + ', ' + a + ', ' + a + ')';
}

function sortfunction(a, b){
    return (-a[0] + b[0]);
}

function main(points){
    screen.clearRect(0, 0, maxX, maxY);
    screen.lineWidth='4';
    screen.strokeStyle="white";
    screen.fillStyle = 'white';

    for (let i = 0; i < points.length; i++) {
        getPosition(points[i], 0.9);
    }

    let distList = []

    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i; j < points.length; j++) {
            let dist = distance(points[i], points[j]);
            distList.push([dist, getColor(dist), points[i], points[j]])
        }
    }

    distList.sort(sortfunction);

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
        screen.arc(points[i][0], points[i][1], 5, 0, 0.1, true);
        screen.fill();
        screen.stroke();
    }

    timer = setTimeout(main, 50, points);
}

main(points);