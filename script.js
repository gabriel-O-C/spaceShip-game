let playerDirectionY, playerDirectionX;
let game;
let frame;
let player, speedPlayer, playerPositionY, playerPositionX; // PLAYER CONTROL VARIABLES
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let shotSpeed = 5;
let bombCounter;
let panelBombCounter;
let totalBombs;
let bombSpeed;
let planetLife = 300;
let timeCreateBomb; // INTERVAL TO CREATE BOMB
let indexExplosion = indexSound = 0;
let planetLifeBar = document.getElementById('planet-bar');
planetLifeBar.style.width = planetLife + 'px';


// FUNCTIONS TO GET KEY VALUES
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
// END OF FUNCTIONS TO GET KEY VALUES

// FUNCTIONS TO CREATE AND MANIPULATE THE BOMBS

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
function gameManagement(){
    planetLifeBar.style.width = planetLife + 'px';
    if(bombCounter <= 0){
        game = false;
        clearInterval(timeCreateBomb);
        window.open('win.html');
    }else if(planetLife == 0){
        window.open('lost.html');
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
                gameManagement();
                createExplosion(2, totalBombs[i].offsetLeft, null);
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
                         createExplosion(1, totalBombs[i].offsetLeft - 25,  totalBombs[i].offsetTop);
                         totalBombs[i].remove();
                         shot.remove();

            }
        }
    }

}

// END OF FUNCTIONS TO CREATE AND MANIPULATE THE BOMBS

// FUNCTIONS TO CREATE AND MANIPULATE SHOTS

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

// END OF FUNCTIONS TO CREATE AND MANIPULATE SHOTS

function createExplosion(type, x, y){ // type == 1 air explosion / type == 2 ground explosion
    if(document.getElementById('explosion'+ (indexExplosion - 1))){
        document.getElementById('explosion' + (indexExplosion - 1)).remove();
    }
    let explosion = document.createElement('div');
    let img = document.createElement('img');
    let sound = document.createElement('audio');
    // DIV ATTRIBUTES

    let attribute1 = document.createAttribute('class');
    let attribute2 = document.createAttribute('style');
    let attribute3 = document.createAttribute('id');

    // IMG ATTRIBUTES

    let attribute4 = document.createAttribute('src');

    // AUDIO ATTRIBUTES
    let attribute5 = document.createAttribute('src');
    let attribute6 = document.createAttribute('id');

    attribute3.value = 'explosion' + indexExplosion;

    if(type === 1){
        attribute1.value = 'explosion-air';
        attribute2.value = 'top:' + y + 'px; left:' + x + 'px;';
        attribute4.value = 'assets/explosao_ar.gif?'+ new Date();
    }else{
        attribute1.value = 'assets/explosion-ground';
        attribute2.value = 'top:' + (screenHeight - 57) + 'px; left:' + (x - 17) + 'px;';
        attribute4.value = 'assets/explosao_chao.gif?' + new Date();

    }
    attribute5.value = 'assets/exp1.mp3?' + new Date();
    attribute6.value = 'sound' + indexSound;
    explosion.setAttributeNode(attribute1);
    explosion.setAttributeNode(attribute2);
    explosion.setAttributeNode(attribute3);
    img.setAttributeNode(attribute4);
    sound.setAttributeNode(attribute5);
    sound.setAttributeNode(attribute6);

    explosion.appendChild(img);
    explosion.appendChild(sound);
    document.body.appendChild(explosion);
    document.getElementById("sound" + indexSound).play();


    indexExplosion++;
    indexSound++;

}

// CONTROL SHIP 
function playerControls(){
    playerPositionY += playerDirectionY * speedPlayer;
    playerPositionX += playerDirectionX * speedPlayer;
    player.style.top = playerPositionY + 'px';
    player.style.left = playerPositionX + 'px';
}
// MAINTAIN THE GAME "ON"
function gameLoop(){
    if(game){
        playerControls();
        controlShots();
        bombControl();

    }
    frame = requestAnimationFrame(gameLoop);
}
// STARTING GAME
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

// EVENTS

window.addEventListener('load', start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);