
var rovers = {
  first: { direction: "S", 
   x:1,
   y:1,
     },
  second: {
   direction: "W",
   x: 2,
   y: 4,
 }};
 
 var travelLog =[]; 
 
 var obstacleGrid = [
   [null, null, "X", null, null, null, null, null, null, null ],
   [null, null, null, null, "X", null, null, null, null, null ],
   [null, null, "X", null, null, null, null, null, null, null ],
   [null, null, null, null, null, null, null, null, null, null ],
   [null, null, null, null, null, null, null, null, null, null ],
   [null, null, null, null, null, "X", null, null, null, null ],
   ["X", null, null, null, null, null, null, null, null, null ],
   [null, null, null, null, null, null, null, null, null, null ],
   [null, null, null, null, null, null, null, null, null, null ],
   [null, null, null, null, null, null, null, null, null, null ],
 
 ]
 
 
 // ======================
 // ======================
 function turnLeft(rover){  //turns the rover left
 
 switch (rover.direction) {
   case "N":
     rover.direction = "W";
     break;
 
   case "O":
     rover.direction = "N";
     break;
 
   case "S":
     rover.direction = "O";
     break;
   case "W":
     rover.direction = "S";
     break;
 }
 console.log("TurnLeft was called! Rovers new direction is " + rover.direction);
 }
 
 
 
 function turnRight(rover){ //turns the rover right
   switch (rover.direction) {
     case "N":
       rover.direction = "O";
       break;
 
     case "O":
       rover.direction = "S";
       break;
 
     case "S":
       rover.direction = "W";
       break;
     case "W":
       rover.direction = "N";
       break;
   }
   console.log("TurnRigth was called! Rovers new direction is " + rover.direction);
 }
 
 
 
 function moveForward(rover, rover2, obstacleGrid){  //puts the rover one step forward
   var previousX =rover.x;
   var previousY =rover.y;
 
 
   switch(rover.direction){
     case "N": rover.y = rover.y-1;
     break;
     case "O": rover.x = rover.x+1;
     break;
     case "S": rover.y = rover.y+1;
     break;
     case "W": rover.x = rover.x-1;
     break;
   }
 
   if (typeof obstacleGrid[rover.y] === "undefined" || typeof obstacleGrid[rover.y][rover.x] === "undefined"){ //checks if the rover is outside the grid https://stackoverflow.com/questions/2703102/typeof-undefined-vs-null
     rover.x = previousX;
     rover.y = previousY;
     console.log("%cYou are out of the grid! You jumped back to the previous position X: " +rover.x+ ", Y: " +rover.y, "color:red;");
     }
   else if (obstacleGrid[rover.y][rover.x] === "X"){ //checks if there is an obstacle
       rover.x = previousX;
       rover.y = previousY;
     console.log("%cYou hit an obstacle! You jumped back to the previous position X: " +rover.x+ ", Y: " +rover.y, "color:red;");
 
     }
   else if (obstacleGrid[rover.x] === obstacleGrid[rover2.x] && obstacleGrid[rover.y] === obstacleGrid[rover2.y]){ //checks if there`s another rover
     rover.x= previousX;
     rover.y=previousY;
     console.log("%cYou hit another rover! You jumped back to the previous position X: " +rover.x+ ", Y: " +rover.y, "color:red;");
 
   }
   else { //if none of this applies it puts the rover forward
     travelLog.push([rover.x, rover.y]);
     console.log("Moved forward. New position X: "+ rover.x + ", Y: " +rover.y)
   }
   }
 
 
 
 
 function moveBackward(rover,rover2, obstacleGrid){ //puts the rover one step backward
   var previousX =rover.x;
   var previousY =rover.y;
 
 
   switch(rover.direction){
     case "N": rover.y = rover.y+1;
     break;
     case "O": rover.x = rover.x-1;
     break;
     case "S": rover.y = rover.y-1;
     break;
     case "W": rover.x = rover.x+1;
     break;
   }
 
   if (typeof obstacleGrid[rover.y] === "undefined" || typeof obstacleGrid[rover.y][rover.x] === "undefined"){ //checks if the rover is outside the grid
     rover.x = previousX;
     rover.y = previousY;
     console.log("%cYou are out of the grid! You jumped back to the previous position X: " +rover.x+ ", Y: " +rover.y, "color:red;");
     }
   else if (obstacleGrid[rover.y][rover.x] === "X"){ //checks if there is an obstacle
       rover.x = previousX;
       rover.y = previousY;
     console.log("%cYou hit an obstacle! You jumped back to the previous position X: " +rover.x+ ", Y: " +rover.y, "color:red;");
     }
   else if (obstacleGrid[rover.x] === obstacleGrid[rover2.x] && obstacleGrid[rover.y] === obstacleGrid[rover2.y]){ //checks if there`s another rover
     rover.x = previousX;
     rover.y =previousY;
     console.log("%cYou hit another rover! You jumped back to the previous position X: " +rover.x+ ", Y: " +rover.y, "color:red;");
 
   }
   else { //if none of this applies, it puts the rover forward and pushs the rovers position to the travelLog
     travelLog.push([rover.x, rover.y]);
     console.log("Moved backwards. New position X: "+ rover.x + ", Y: " +rover.y)
   }
   }
 
 function travelPath(rover){
 console.log("This is the path your rover went: ");
 console.log(travelLog);
 }
 
 function command(string, rover, rover2, obstacleGrid){ //checks the command and calls the respective function
   for(var i=0; i<string.length; i++){
     if (string[i] == "f"){
       moveForward(rover, rover2, obstacleGrid);
     }
     if (string[i] == "r"){
       turnRight(rover, obstacleGrid);
     }
     if (string[i] == "l"){
       turnLeft(rover, obstacleGrid);
     }
     if (string[i] == "b"){
       moveBackward(rover, rover2, obstacleGrid);
     }
     else if (string[i]!="f" && string[i]!="b" && string[i]!="r"&&string[i]!="l") {console.log("This command doesnt exist!");}
   }
   travelPath();
 }
 