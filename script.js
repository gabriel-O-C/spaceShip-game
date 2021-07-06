let playerDirectionY, playerDirectionX;
let game;
let frame;
let player, speedPlayer, playerPositionY, playerPositionX; // player control variables
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let shotSpeed = 5;
let bombCounter;
let panelBombCounter;
let totalBombs;
let bombSpeed;
let planetLife = 100;
let timeCreateBomb; // interval to create a bomb

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

function createBomb(){
    if(game){
        let bombY = 0;
        let bombX = Math.floor(Math.random() * screenWidth);
        let bomb = document.createElement('div');
        let attribute1 = document.createAttribute('class');
        let attribute2 = document.createAttribute('style');
        attribute1.value = "bomb";
        attribute2.value = "top:" + bombY + "px; left:" + bombX + "px";
        bomb.setAttributeNode(attribute1);
        bomb.setAttributeNode(attribute2);
        document.body.appendChild(bomb);
        bombCounter--;
    }
}

function bombControl(){
    totalBombs = document.getElementsByClassName('bomb');
    let totalBombsLenght = totalBombs.length;
    for(let i = 0; i < totalBombsLenght; i++){
        if(totalBombs[i]){
            let positionI = totalBombs[i].offsetTop;
            positionI += bombSpeed;
            totalBombs[i].style.top = positionI + 'px';
            if(positionI > screenHeight){
                planetLife -= 10;
               totalBombs[i].remove(); 

            }
        }
    }
}
function colisionBombShot(shot){ // colision between a bomb and a shot
    let totalBombsLenght = totalBombs.length;
    for(let i = 0; i < totalBombsLenght; i++){
        if(totalBombs[i]){
            if(
                (
                    (shot.offsetTop <= (totalBombs[i].offsetTop + 40) // topside of shot with botside of bomb
                     && 
                     (shot.offsetTop + 6)) // botside of shot with topside of bomb
                    )
                    &&
                    (
                        (shot.offsetLeft <= (totalBombs[i].offsetLeft + 24)) // leftside shot with rightside of bomb
                        &&
                        ((shot.offsetLeft + 6) >= (totalBombs[i].offsetLeft)) // rightside of shot with leftside of bomb
                    )
                     )  {
                         totalBombs[i].remove();
                         shot.remove();

            }
        }
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
            colisionBombShot(shots[i]);
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
        bombControl();

    }
    frame = requestAnimationFrame(gameLoop);
}

function start(){
    game = true;

    //initialazing player variables
    playerDirectionX = playerDirectionY = 0;
    playerPositionX = screenWidth / 2;
    playerPositionY = screenHeight / 2;
    speedPlayer = 8;
    player = document.getElementById('play-ship');
    player.style.top = playerPositionY + 'px';
    player.style.left = playerPositionX + 'px';

    // initialazing bomb variables
    clearInterval(timeCreateBomb);
    bombSpeed = 3;
    bombCounter = 150;
    timeCreateBomb = setInterval(createBomb, 1500);



    gameLoop();
}


window.addEventListener('load', start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);