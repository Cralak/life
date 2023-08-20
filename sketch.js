let square_size = 10;
let screen_size = 1000;
let squares = [];
let next_squares = []
let running = false;

function setup() {
  
  frameRate(10)
  
  createCanvas(screen_size, screen_size);
  
  for(x=-100;x<screen_size/square_size+100;x++){
    squares[x] = []
    next_squares[x] = []
    for(y=-100;y<screen_size/square_size+100;y++){
      squares[x][y] = 0;
      next_squares[x][y] = 0;
    }
  }
}

function draw() {
  background(255);
  stroke(155)  
  for(x=-1;x<screen_size/square_size+1;x++){
    for(y=-1;y<screen_size/square_size+1;y++){
      if(squares[x][y]==0){
        square(x*square_size,y*square_size,square_size)
      }
      if(squares[x][y]==1){
        fill(0)
        square(x*square_size,y*square_size,square_size)
        fill(255)
      }
    }
  }
  
  if(running){
    for(x=1;x<screen_size/square_size;x++){
      for(y=1;y<screen_size/square_size;y++){
        darwin(x,y)
      }
    }
  }
  if(running){
    for(x=1;x<screen_size/square_size;x++){
      for(y=1;y<screen_size/square_size;y++){
        squares[x][y] = next_squares[x][y]
      }
    }
  }
}

function countNeighbours(x,y){
  let count = 0;
  for(i=-1;i<2;i++){
    for(j=-1;j<2;j++){
      count += squares[x+i][y+j]
    }
  }
  if(squares[x][y] == 1){
    count -= 1
  }
  return count
}

function keyPressed() {
  if (keyCode == 32){
    if (running == true){
      running = false;      
    }
    else if (running == false){
      running = true;
    }
  } 
} 

function mouseClicked(){
  if(running == false){
    if(squares[Math.floor(mouseX/square_size)][Math.floor(mouseY/square_size)] == 0){
      squares[Math.floor(mouseX/square_size)][Math.floor(mouseY/square_size)] = 1
    }
    else if(squares[Math.floor(mouseX/square_size)][Math.floor(mouseY/square_size)] == 1){
      squares[Math.floor(mouseX/square_size)][Math.floor(mouseY/square_size)] = 0
    }
    
  }
    print("state " + squares[Math.floor(mouseX/square_size)][Math.floor(mouseY/square_size)] + "neighbours " + countNeighbours(Math.floor(mouseX/square_size),Math.floor(mouseY/square_size)))
}


function darwin(x,y){
  if(squares[x][y] == 1){
    if(countNeighbours(x,y)<=1){
      next_squares[x][y] = 0
    }
  }
    if(squares[x][y] == 1){
      if(countNeighbours(x,y)==2){
        next_squares[x][y] = 1
    }
  }
    if(squares[x][y] == 1){
      if(countNeighbours(x,y)==3){
        next_squares[x][y] = 1
    }
  }
    if(squares[x][y] == 1){
      if(countNeighbours(x,y)>=4){
        next_squares[x][y] = 0
    }
  }
    if(squares[x][y] == 0){
      if(countNeighbours(x,y)==3){
        next_squares[x][y] = 1
    }
  }
    if(squares[x][y] == 0){
      if(countNeighbours(x,y)!=3){
        next_squares[x][y] = 0
    }
  }
}