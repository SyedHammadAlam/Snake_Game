    document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("heading").textContent = "Let's play the game";
  
    setTimeout(function() {
        document.getElementById("heading").style.display = "none";
        document.getElementById("controls").style.display = "flex";              // Show the control buttons side by side
    }, 1000);   
    playground = document.getElementById("playground");
    playground.style.display = "block";
    
    playground.width = cols * unitSize;
    playground.height = rows * unitSize;
    context = playground.getContext("2d");
    document.addEventListener("keydown", changeDir);
    spawnFood();
    interval = setInterval(draw, 1000 / movesPerSec);
  });

  document.getElementById("pauseButton").addEventListener("click", function() {
    clearInterval(interval);                      
    document.getElementById("pauseButton").style.display = "none";               // Pause the game
    document.getElementById("continueButton").style.display = "inline-block";
  });
  
  document.getElementById("continueButton").addEventListener("click", function() {
    interval = setInterval(draw, 1000 / movesPerSec);                   // Continue the game
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "inline-block";
  });
  
  let playground;
  let rows = 17;
  let cols = 17;
  let unitSize = 25;
  let context;
  let movementX = 0;
  let movementY = 0;
  let movesPerSec = 4; 
  let playerBody = [];
  let gameOver = false;
  let interval;
  const speedIncrease = 0.6; 
  const snakeHeadImg = new Image();
  snakeHeadImg.src = "./snake.svg"; 
  
  const fruitImg = new Image();
  fruitImg.src = "./fruit.svg";
  
  const snakeBody = new Image();
  snakeBody.src = "./snakeBody.svg";
  
  let playerX = Math.floor(Math.random() * 10) * unitSize;
  let playerY = Math.floor(Math.random() * 10) * unitSize;
  
  let foodX;
  let foodY;
  
  function spawnFood() {
    foodX = Math.floor(Math.random() * 10) * unitSize;
    foodY = Math.floor(Math.random() * 10) * unitSize;
  }
  
  function draw() {
    context.fillStyle="#f0f0f0";
    context.fillRect(0,0,playground.width, playground.height);
  
    if (playerX ===foodX &&playerY===foodY) {
        playerBody.push([foodX, foodY]);
        spawnFood();
        increaseSpeed();                    // Increase speed when snake eats food
    }
  
    for (let i = playerBody.length-1;i>0;i--) {
        playerBody[i]=playerBody[i-1];
    }
    if (playerBody.length){
        playerBody[0] = [playerX, playerY];
    }
    context.drawImage(fruitImg,foodX,foodY,unitSize,unitSize);
  
    playerX += movementX * unitSize;
    playerY += movementY * unitSize;
  
    context.drawImage(snakeHeadImg,playerX,playerY,unitSize,unitSize);
  
    for (let i = 0;i<playerBody.length;i++) {
        context.drawImage(snakeBody, playerBody[i][0], playerBody[i][1], unitSize, unitSize);
    }
  
    if (playerX<0 ||playerY<0||playerX >=cols * unitSize ||playerY>=rows * unitSize) {
        gameOver = true;
    }
  
    for (let i=0;i<playerBody.length;i++){
        if (playerX==playerBody[i][0]&&playerY==playerBody[i][1]) {
            gameOver=true;
        }
    }
    if (gameOver===true) {
        clearInterval(interval);
        alert("Game Over!");
        location.reload();
    }
  }
  function changeDir(e) {
    if (e.code==="ArrowUp"&&movementY!=1) {
        movementY=-1;
        movementX=0;
    } else if (e.code==="ArrowRight"&&movementX!=-1) {
        movementY=0;
        movementX=1;
    } else if (e.code==="ArrowDown"&&movementY!=-1) {
        movementY=1;
        movementX=0;
    } else if (e.code ==="ArrowLeft"&&movementX!=1) {
        movementY = 0;
        movementX = -1;
    }
  }
  
  function increaseSpeed() {
    movesPerSec += speedIncrease; 
    clearInterval(interval); 
    interval = setInterval(draw, 1000 / movesPerSec); 
  }
  