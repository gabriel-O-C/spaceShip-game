let playerDirectionY, playerDirectionX;
let game;
let frame;
let player, speedPlayer, playerPositionY, playerPositionX; // player control variables
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let shotSpeed = 5;

function keyDown(){
    let key = event.keyCode;
    if(key == 38){ // up
        playerDirectionY = -1;
    }else if(key == 40){ // down
        playerDirectionY = 1;
    }
     if(key == 37){ // left
        playerDirectionX = -1;
    }else if(key == 39){ // right
        playerDirectionX = 1;
    }
    if(key == 32){ // shoot
        // shoot
        shoot(playerPositionX + 17, playerPositionY)
    }
}


function keyUp(){
    let key = event.keyCode;
    if((key == 38) || (key == 40)){
        playerDirectionY = 0;
    }
    if((key == 37) || (key == 39)){
        playerDirectionX = 0;
    }

}
function shoot(x, y){ // X for x axis and Y y axis
    let shot = document.createElement("div");
    let attribute1 = document.createAttribute("class");
    let attribute2 = document.createAttribute("style");
    attribute1.value = "player-shot";
    attribute2.value = "top:" + y + "px; left: " + x + "px";
    shot.setAttributeNode(attribute1);
    shot.setAttributeNode(attribute2);
    document.body.appendChild(shot);
}
function controlShots(){
    let shots = document.getElementsByClassName('player-shot');
    let shotLenght = shots.length;
    for(let i = 0; i < shotLenght; i++){
        if(shots[i]){
            let shotPosition = shots[i].offsetTop;
            shotPosition -= shotSpeed;
            shots[i].style.top = shotPosition + 'px';
            if(shotPosition < 0){
                shots[i].remove();
            }
        }
    }
}

function playerControls(){
    playerPositionY += playerDirectionY * speedPlayer;
    playerPositionX += playerDirectionX * speedPlayer;
    player.style.top = playerPositionY + 'px';
    player.style.left = playerPositionX + 'px';
}

function gameLoop(){
    if(game){
        playerControls();
        controlShots();

    }
    frame = requestAnimationFrame(gameLoop);
}

function start(){
    game = true;

    //initialazing player variables
    playerDirectionX = playerDirectionY = 0;
    playerPositionX = screenWidth / 2;
    playerPositionY = screenHeight / 2;
    speedPlayer = 5;
    player = document.getElementById('play-ship');
    player.style.top = playerPositionY + 'px';
    player.style.left = playerPositionX + 'px';



    gameLoop();
}


window.addEventListener('load', start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);