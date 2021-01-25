var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
setInterval(game, 1000 / 200);
var timer = 0, seconds = 0;
var score = 0;
var gameOver = false;
var size = 50;
var x = 15, y = 15;
var trunc = 15;
var bX, bY, bSize = 10;
var vBX = 0; vBY = 0;
var blueX, blueY, blueSize = 10;
var vBlueX = 0; vBlueY = 10;
var blueShot = false;
var blueDir;
var counter = 0;
var shot = false;
var vX = 0;
var vY = 0;
var dir = 'stop';
var targetSize = 30;
var targetX;
var targetY;
updateScore();
updateTime();
do {
    targetX = Math.random() * 800 - targetSize;
    targetY = Math.random() * 500 - targetSize;
} while (targetX < 0 || targetY < 0 );

document.addEventListener('keydown', keyPush);
document.getElementById('retry').addEventListener('click', function () {
    vX = 0;
    vY = 0;
    x = 15; y = 15;
    canvas.style.display = "initial";
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('retry').style.display = 'none';
    gameOver = false;
    dir = 'stop';
    score = 0;
    updateScore();
    timer = 0;
    seconds = 0;
    updateTime();
})

function updateScore() {
    document.getElementById('score').innerHTML = score;
}
function updateTime() {
    document.getElementById('time').innerHTML = seconds;
}

function keyPush(event) {
    switch (event.keyCode) {
        case 37: dir = 'left'; break;
        case 38: dir = 'up'; break;
        case 39: dir = 'right'; break;
        case 40: dir = 'down'; break;
        case 32: shot = true;
    }
}
function move() {
    switch (dir) {
        case 'left': vX = -1; vY = 0; break;
        case 'up': vX = 0; vY = -1; break;
        case 'right': vX = 1; vY = 0; break;
        case 'down': vX = 0; vY = 1; break;
    }
}


function game() {
    blueDir = Math.floor(Math.random() * 4);
    counter += 1;
    timer += 1;
    if (timer % 200 == 0&&!gameOver) {
        seconds += 1;
        updateTime();
    }
    if (counter > 200) {
        blueX = targetX + targetSize / 2 - blueSize / 2;
        blueY = targetY + targetSize / 2 - blueSize / 2;
        blueShot = true;
        counter = 0;
        if (blueDir == 0) {
            vBlueX = -3; vBlueY = 0;
        }
        if (blueDir == 1) {
            vBlueX = 0; vBlueY = -3;
        }
        if (blueDir == 2) {
            vBlueX = 3; vBlueY = 0;
        }
        if (blueDir == 3) {
            vBlueX = 0; vBlueY = 3;
        }
    }

    move();
    if (dir == 'left' && x - trunc < 0) {
        vX = 0;
    }
    if (dir == 'right' && x + size + trunc > 800) {
        vX = 0;
    }
    if (dir == 'up' && y - trunc < 0) {
        vY = 0;
    }
    if (dir == 'down' && y + size + trunc > 500) {
        vY = 0;
    }
    blueX += vBlueX;
    blueY += vBlueY;
    x += vX;
    y += vY;
    bX += vBX;
    bY += vBY;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 800, 500);

    ctx.fillStyle = 'lightblue';
    ctx.fillRect(targetX, targetY, targetSize, targetSize);

    if (x + size > targetX && y + size > targetY && x < targetX + targetSize && y < targetY + targetSize) {
        score += 100;
        updateScore();
        do {
            targetX = Math.random() * 800 - targetSize;
            targetY = Math.random() * 500 - targetSize;
        } while (targetX < 0 || targetY < 0);
    }
    if (bX + bSize > targetX && bY + bSize > targetY && bX < targetX + targetSize && bY < targetY + targetSize) {
        score += 100;
        updateScore();
        do {
            targetX = Math.random() * 800 - targetSize;
            targetY = Math.random() * 500 - targetSize;
        } while (targetX < 0 || targetY < 0);
    }

    if (blueX + blueSize > x && blueY + blueSize > y && blueX < x + size && blueY < y + size) {
        gameOver = true;
    }

    if (dir == 'stop') {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size / 2 - 5);
        ctx.lineTo(x + size + trunc, y + size / 2 - 5);
        ctx.lineTo(x + size + trunc, y + size / 2 + 5);
        ctx.lineTo(x + size, y + size / 2 + 5);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        ctx.closePath();
        ctx.fill();
    }
    if (dir == 'right') {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size / 2 - 5);
        ctx.lineTo(x + size + trunc, y + size / 2 - 5);
        ctx.lineTo(x + size + trunc, y + size / 2 + 5);
        ctx.lineTo(x + size, y + size / 2 + 5);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        ctx.closePath();
        ctx.fill();
    }

    if (dir == 'left') {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x, y + size / 2 + 5);
        ctx.lineTo(x - trunc, y + size / 2 + 5);
        ctx.lineTo(x - trunc, y + size / 2 - 5);
        ctx.lineTo(x, y + size / 2 - 5);
        ctx.closePath();
        ctx.fill();
    }

    if (dir == 'up') {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / 2 - 5, y);
        ctx.lineTo(x + size / 2 - 5, y - trunc);
        ctx.lineTo(x + size / 2 + 5, y - trunc);
        ctx.lineTo(x + size / 2 + 5, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        ctx.closePath();
        ctx.fill();
    }

    if (dir == 'down') {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x + size / 2 - 5, y + size);
        ctx.lineTo(x + size / 2 - 5, y + size + trunc);
        ctx.lineTo(x + size / 2 + 5, y + size + trunc);
        ctx.lineTo(x + size / 2 + 5, y + size);
        ctx.lineTo(x, y + size);
        ctx.closePath();
        ctx.fill();
    }

    if (shot) {
        switch (dir) {
            case 'stop': bX = x + size + trunc; bY = y + size / 2 - 5; vBX = 5; vBY = 0; shot = false; break;
            case 'right': bX = x + size + trunc; bY = y + size / 2 - 5; vBX = 5; vBY = 0; shot = false; break;
            case 'left': bX = x - trunc; bY = y + size / 2 - 5; vBX = -5; vBY = 0; shot = false; break;
            case 'up': bX = x + size / 2 - 5; bY = y - trunc; vBX = 0; vBY = -5; shot = false; break;
            case 'down': bX = x + size / 2 - 5; bY = y + size + trunc; vBX = 0; vBY = 5; shot = false; break;
        }
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(bX, bY, bSize, bSize);
    ctx.fillStyle = 'blue';
    ctx.fillRect(blueX, blueY, blueSize, blueSize);

    if (gameOver) {
        canvas.style.display = "none";
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('retry').style.display = 'block';
    }
}