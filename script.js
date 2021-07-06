let playerDirectionY, playerDirectionX;

function keyDown(){
    let key = KeyboardEvent.code;
    if(key === 38){ // up
        playerDirectionY = -1;
    }else if(key === 40){ // down
        playerDirectionY = 1;
    }
     if(key === 37){ // left
        playerDirectionX = -1;
    }else if(key === 39){ // right
        playerDirectionX = 1;
    }
    if(key === 32){ // shoot
        // shoot
    }
}
function keyUp(){
    let key = KeyboardEvent.code;
    if((key == 38) || (key == 40)){
        playerDirectionY = 0;
    }
    if((key == 37) || (key == 39)){
        playerDirectionX = 0;
    }

}

