//author: Jacob Moore

var playerUnits = [];
var computerUnits = [];
var allUnits = [];
setUpUnits();
var points = 0;
var unitSelected = [];
var selectPosition = true;
var playerSetObject = {};
var computerSetObject = {};

var computerUnitSet = false;
var playerUnitSet = false;

var playerTurns = 4;
var computerTurns = 4;

var numberOfUnitsPlaced = 0;
var currentElement = "";
var currentElementBackground = "";

function setUpGameboard() {
  var affinity = [];
  var gameElement = document.getElementById("gameBoard");
  var gameBoard = "";
  var count = 0;
  for (var i = 0; i < 20; i++){
    for(var j = 0; j < 50; j++){
      gameBoard += "|<span onclick=\"checkAction(this);\" onmouseover=\"getUnitInfo(this);\" onmouseout=\"clearUnitInfo();\" id=" + count + ">X</span>";
      count++;
    }
    gameBoard += "|<br>"

  }
  gameElement.innerHTML = gameBoard;


  affinityPercent = Math.ceil(0.25 * count);
  for (var i = 0; i < affinityPercent; i++){
    var random = Math.floor(Math.random() * count);
    if (affinity.indexOf(random) == -1) {
      affinity.push(random);
    }else{
      i--;
    }
  }

  var firstQuarter = affinity.length / 4;
  var secondQuarter = affinity.length / 2;
  var thirdQuarter = affinity.length - firstQuarter;
  for (var i = 0; i < affinity.length; i++){
    if (i < firstQuarter){
      document.getElementById(affinity[i]).style.backgroundColor = "#FF3A3A";
    }else if (i < secondQuarter){
      document.getElementById(affinity[i]).style.backgroundColor = "#3333FF";
    }else if (i < thirdQuarter){
      document.getElementById(affinity[i]).style.backgroundColor = "#9933FF";
    }else{
      document.getElementById(affinity[i]).style.backgroundColor = "#FFFF00";
    }
  }

}

function getUnitInfo(element) {
  var unitInfo = document.getElementById("unitInfo");
  if (element.innerHTML != "X"){
    var foundPlayerUnit = false;
    var foundComputerUnit = false;
    var unitIndex = 0;

    for(var i = 0; i < playerUnits.length; i++){
      if(playerUnits[i].position == element.id){
        foundPlayerUnit = true;
        unitIndex = i;
        break;
      }
    }

    if (!foundPlayerUnit){
      for(var i = 0; i < computerUnits.length; i++){
        if(computerUnits[i].position == element.id){
          foundComputerUnit = true;
          unitIndex = i;
          break;
        }
      }
    }

    if (foundPlayerUnit){
      unitInfo.innerHTML = "Name: " + playerUnits[unitIndex].name + "<br>Attack: " + playerUnits[unitIndex].attack + "<br>Defense: " + playerUnits[unitIndex].defense +
      "<br>Speed: " + playerUnits[unitIndex].speed + "<br>Range: " + playerUnits[unitIndex].range + "<br>Life: " + playerUnits[unitIndex].life +"<br>Affinity: "  + playerUnits[unitIndex].affinity + "<br>Owner: Player";

    }else if(foundComputerUnit){
      unitInfo.innerHTML = "Name: " + computerUnits[unitIndex].name + "<br>Attack: " + computerUnits[unitIndex].attack + "<br>Defense: " + computerUnits[unitIndex].defense +
      "<br>Speed: " + computerUnits[unitIndex].speed + "<br>Range: " + computerUnits[unitIndex].range + "<br>Life: " + computerUnits[unitIndex].life +"<br>Affinity: "  + computerUnits[unitIndex].affinity + "<br>Owner: Computer";
    }else{
      unitInfo.innerHTML = "";
    }
  }else{
    unitInfo.innerHTML = "";
  }


}

function clearUnitInfo() {
  var unitInfo = document.getElementById("unitInfo");
  unitInfo.innerHTML = "";
}

function setUpUnits() {
  allUnits.push(new unit("Ballista", 5, 0, 1, 20, 3,"red"));
  allUnits.push(new unit("Knight", 5, 8, 6, 2, 3,"blue"));
  allUnits.push(new unit("Peasant", 1, 1, 2, 1, 10,"purple"));
  allUnits.push(new unit("Goblin", 2, 1, 2, 1, 5,"yellow"));
  allUnits.push(new unit("Bear", 2, 10, 4, 1, 3,"red"));
  allUnits.push(new unit("Mage", 6, 2, 3, 10, 3,"blue"));
  allUnits.push(new unit("Battle-Mage", 4, 4, 3, 5, 3,"purple"));
  allUnits.push(new unit("Bowman", 3, 1, 2, 15, 3,"yellow"));
  allUnits.push(new unit("Crossbowman", 6, 2, 2, 10, 3,"red"));
  allUnits.push(new unit("Orc", 8, 8, 2, 1, 5,"blue"));
  allUnits.push(new unit("Orc-Rider", 8, 5, 6, 2, 3,"purple"));
  allUnits.push(new unit("Spearman", 8, 2, 3, 2, 3,"yellow"));
  allUnits.push(new unit("Swordsman", 4, 10, 2, 1, 5,"red"));
  allUnits.push(new unit("Goblin-Shooters", 2, 2, 2, 8, 6,"blue"));
  allUnits.push(new unit("Catapult", 9, 3, 1, 15, 2,"purple"));
  allUnits.push(new unit("Shaman", 5, 2, 3, 10, 3,"yellow"));

}

function checkAction(element){
  if (element.innerHTML != "X" && !selectPosition && currentElement == ""){
    var foundPlayerUnit = false;
    var foundComputerUnit = false;
    var unitIndex = 0;

    for(var i = 0; i < playerUnits.length; i++){
      if(playerUnits[i].position == element.id){
        foundPlayerUnit = true;
        unitIndex = i;
        break;
      }
    }

    if (!foundPlayerUnit){
      for(var i = 0; i < computerUnits.length; i++){
        if(computerUnits[i].position == element.id){
          foundComputerUnit = true;
          unitIndex = i;
          break;
        }
      }
    }

    if (foundPlayerUnit){
      document.getElementById("playerSelectedInfo").innerHTML = "Name: " + playerUnits[unitIndex].name + "<br>Attack: " + playerUnits[unitIndex].attack + "<br>Defense: " + playerUnits[unitIndex].defense +
      "<br>Speed: " + playerUnits[unitIndex].speed + "<br>Range: " + playerUnits[unitIndex].range + "<br>Life: " + playerUnits[unitIndex].life +"<br>Affinity: "  + playerUnits[unitIndex].affinity + "<br>Owner: Player";
      playerSetObject = playerUnits[unitIndex];

    }else if(foundComputerUnit){
      document.getElementById("computerSelectedInfo").innerHTML = "Name: " + computerUnits[unitIndex].name + "<br>Attack: " + computerUnits[unitIndex].attack + "<br>Defense: " + computerUnits[unitIndex].defense +
      "<br>Speed: " + computerUnits[unitIndex].speed + "<br>Range: " + computerUnits[unitIndex].range + "<br>Life: " + computerUnits[unitIndex].life +"<br>Affinity: "  + computerUnits[unitIndex].affinity + "<br>Owner: Computer";
      computerSetObject = computerUnits[unitIndex];

    }
  }else{
    if(selectPosition && element.innerHTML == "X" && (element.id % 50) <= 20){
      element.innerHTML = "<b><u>" + playerUnits[numberOfUnitsPlaced].attack + "</b></u>";
      playerUnits[numberOfUnitsPlaced].position = element.id;
      numberOfUnitsPlaced++;
      if (numberOfUnitsPlaced >= playerUnits.length) {
        selectPosition = false;
        document.getElementById("setUnitPosition").innerHTML = "Actions: 4";
        selectPositions();
      }else{
        document.getElementById("setUnitPosition").innerHTML = "SET UNIT ON LEFT HALF" + "<br>Name: " + playerUnits[numberOfUnitsPlaced].name + "<br>Attack: " + playerUnits[numberOfUnitsPlaced].attack + "<br>Defense: " + playerUnits[numberOfUnitsPlaced].defense +
        "<br>Speed: " + playerUnits[numberOfUnitsPlaced].speed + "<br>Range: " + playerUnits[numberOfUnitsPlaced].range + "<br>Life: " + playerUnits[numberOfUnitsPlaced].life +"<br>Affinity: "  + playerUnits[numberOfUnitsPlaced].affinity + "<br>Owner: Player";
      }
    }else if (document.getElementById("playerSelectedInfo").innerHTML != "" && playerTurns > 0 && element.innerHTML == "X") {
      if (currentElement != ""){
        currentElement.style.backgroundColor = currentElementBackground;
      }
      currentElement = element;
      currentElementBackground = element.style.backgroundColor;
      element.style.backgroundColor = "Black";
      document.getElementById("computerSelectedInfo").innerHTML = "";
      document.getElementById("confirmAttack").style.display = "none";
      document.getElementById("confirmMove").style.display = "inline";
      document.getElementById("confirmPlacement").style.display = "inline";
    }
  }
  if (document.getElementById("playerSelectedInfo").innerHTML != "" && document.getElementById("computerSelectedInfo").innerHTML != "" && playerTurns > 0){
    document.getElementById("confirmMove").style.display = "none";
    document.getElementById("confirmAttack").style.display = "inline";
    document.getElementById("confirmPlacement").style.display = "inline";
  }
}

function unit(name, attack, defense, speed, range, life, affinity) {
  this.position = -1
  this.owner = 0
  this.name = name;
  this.attack = attack;
  this.defense = defense;
  this.speed = speed;
  this.range = range;
  this.life = life;
  this.affinity = affinity;
  this.points = this.attack * 12 + this.defense * 5 + this.speed * 3 + this.range * 10 + this.life * this.defense + this.life * 2;
}

function createArmySelection(){
  for(var i = 0; i < allUnits.length; i++) {
    unitSelected.push(0);
    var tmp = i + 1;
    document.getElementById("unit" + tmp).innerHTML = "Name: " + allUnits[i].name + "<br>Attack: " + allUnits[i].attack + "<br>Defense: " + allUnits[i].defense +
    "<br>Speed: " + allUnits[i].speed + "<br>Range: " + allUnits[i].range + "<br>Life: " + allUnits[i].life +"<br>Affinity: "  + allUnits[i].affinity + "<br>Points: " + allUnits[i].points;
    switch(allUnits[i].affinity){
      case "red":
        var color = "#FF3A3A";
        break;
      case "yellow":
        var color = "#FFFF00";
        break;
      case "purple":
        var color = "#9933FF";
        break;
      case "blue":
        var color = "#3333FF";
        break;
    }
    document.getElementById("unit" + tmp).style.backgroundColor = color;
  }
}

function updatePoints() {
  points = 0;
  for(var i = 0; i < allUnits.length; i++){
    var tmp = i + 1;
    points += parseInt(document.getElementById("input" + tmp).value) * allUnits[i].points;
  }

  if (points > 1500){
    document.getElementById("points").innerHTML = "Points: " + points + "<br>Max: 1500";
    document.getElementById("points").style.color = "red";
  }else{
    document.getElementById("points").innerHTML = "Points: " + points;
    document.getElementById("points").style.color = "#000000";
  }
}

function checkTotalPoints() {
  if(points <= 1500) {
    for(var i = 0; i < allUnits.length; i++){
      var tmp = i + 1;
      unitSelected[i] = parseInt(document.getElementById("input" + tmp).value);
    }
     setCookie("player", unitSelected, 1);
     sessionStorage.playerTotalPoints = points;
    window.location.href = "gameboard.html";
  }else{
    alert("Max points is 1500");
  }
}

function checkTroops() {
  unitSelected = getCookie("player").split(",");
  for(var i = 0; i < allUnits.length; i++) {
    var tmp = i + 1;

    for(var j = 0; j < parseInt(unitSelected[i]); j++) {
      playerUnits.push(Object.assign({},allUnits[i]));
      playerUnits[playerUnits.length - 1].owner = 1;
    }
  }
  if (playerUnits.length == 0){
    window.location.href = "index.html";
  }

  var computerPoints = 0;
  while(computerPoints < 1400){
    var randomNum = Math.floor(Math.random() * (allUnits.length - 1));
    var computerUnit = Object.assign({},allUnits[randomNum]);
    computerUnit.owner = 2;
    computerPoints += computerUnit.points;
    computerUnits.push(computerUnit);
  }

  sessionStorage.computerTotalPoints = computerPoints;

  document.getElementById("setUnitPosition").innerHTML = "SET UNIT ON LEFT HALF" + "<br>Name: " + playerUnits[0].name + "<br>Attack: " + playerUnits[0].attack + "<br>Defense: " + playerUnits[0].defense +
  "<br>Speed: " + playerUnits[0].speed + "<br>Range: " + playerUnits[0].range + "<br>Life: " + playerUnits[0].life +"<br>Affinity: "  + playerUnits[0].affinity + "<br>Owner: Player";

  setCookie("player","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",1);
}

function selectPositions () {


  for(var i = 0; i < computerUnits.length; i++){
    var randomPosition = Math.floor(Math.random() * 20 + 29);
    randomPosition += (50 * Math.floor(Math.random() * 20));
    var html = document.getElementById(randomPosition).innerHTML;
    if(html == "X"){
      computerUnits[i].position = randomPosition;
      document.getElementById(randomPosition).innerHTML = "<b>" + computerUnits[i].attack + "</b>";
     }else{
       i--;
     }
  }
}

function moveUnit(){
  var moveElement = currentElement;
  var unit = playerSetObject;
  var distance = getDistance(moveElement, unit);

  if (distance <= unit.speed){
    document.getElementById("confirmMove").style.display = "none";
    document.getElementById("confirmPlacement").style.display = "none";
    moveElement.style.backgroundColor = currentElementBackground;
    moveElement.innerHTML = "<b><u>" + unit.attack + "</b></u>"
    document.getElementById(unit.position).innerHTML = "X"
    unit.position = moveElement.id;
    document.getElementById("playerSelectedInfo").innerHTML = "";
    playerTurns--;
    document.getElementById("setUnitPosition").innerHTML = "Actions: " + playerTurns;
    currentElementBackground = "";
    currentElement = "";
    updateSummary(playerSetObject.name + " moved " + distance + " spaces", 1);
    if (playerTurns <= 0){
      computerTurn();
    }
  }else{
    document.getElementById("confirmMove").style.display = "none";
    document.getElementById("confirmPlacement").style.display = "none";
    moveElement.style.backgroundColor = currentElementBackground;
    window.alert("Move is out of range.");
    currentElementBackground = "";
    currentElement = "";
  }

}

function playerAttack(){
  var distance = getDistance(document.getElementById(playerSetObject.position), computerSetObject);
  if(distance > playerSetObject.range){
    window.alert("Out of range.");
    clearSelections();
    return;
  }

  playerTurns--;
  document.getElementById("setUnitPosition").innerHTML = "Actions: " + playerTurns;
  var affinity = getAffinity(playerSetObject,computerSetObject);

  var attack = playerSetObject.attack;
  var defense = computerSetObject.defense;
  var attackHits = 0;
  var defenseHits = 0;

  if (affinity.playerAffinity == document.getElementById(playerSetObject.position).style.backgroundColor){
    attack += 2;
  }

  if (affinity.computerAffinity == document.getElementById(computerSetObject.position).style.backgroundColor){
    defense += 2;
  }

  for(var i = 0; i < attack; i++){
    var random = getRandom();
    if (random == 1){
      attackHits++;
    }
  }

  for(var i = 0; i < defense; i++){
    var random = getRandom();
    if (random == 0){
      defenseHits++;
    }
  }
  var damage = attackHits - defenseHits;

  var dead = false;
  if (damage > 0){
    computerSetObject.life = computerSetObject.life - damage;
    if (computerSetObject.life <= 0){
      dead = true;
      document.getElementById(computerSetObject.position).innerHTML = "X";
      for(var i = 0; i < computerUnits.length; i++){
        if(computerUnits[i].position == computerSetObject.position){
          computerUnits.splice(i,1);
          break;
        }
      }
    }
  }else{
    damage = 0;
  }
  if (dead){
    updateSummary(playerSetObject.name + " attacked " + computerSetObject.name + " and defeated them with " + damage + " damage", 1);
  }else{
    updateSummary(playerSetObject.name + " attacked " + computerSetObject.name + " and did " + damage + " damage", 1);
  }

  if(computerUnits.length == 0){
    sessionStorage.computerRemainingPoints = 0;
    var playerRemainingPoints = 0;
    for(var i = 0; i < playerUnits.length; i++) {
      playerRemainingPoints += playerUnits[i].points;
    }
    sessionStorage.playerRemainingPoints = playerRemainingPoints;
    window.location.href = "summary.html";
  }
  clearSelections();
  if (playerTurns <= 0) {
    computerTurn();
  }
}

function getCoordinate(position){
  var unitLocation = {x: position % 50  ,y: Math.floor(position / 50)};
  return unitLocation;
}

function getSetPlayerUnit(){
  if (document.getElementById("playerSelectedInfo").innerHTML == ""){
    return -1;
  }else{
    for(var i = 0; i < playerUnits.length; i++){
      if(playerUnits[i].position == playerSetObject.position){
        return i;
      }
    }

  }
}

function clearSelections(){
  if (currentElement != ""){
    currentElement.style.backgroundColor = currentElementBackground;
    currentElement = "";
    currentElementBackground = "";
  }
  document.getElementById("playerSelectedInfo").innerHTML = ""
  document.getElementById("computerSelectedInfo").innerHTML = "";
  document.getElementById("confirmAttack").style.display = "none";
  document.getElementById("confirmMove").style.display = "none";
  document.getElementById("confirmPlacement").style.display = "none";
}

function getDistance(element, unit){
  var unitLocation = getCoordinate(unit.position);
  var elementLocation = getCoordinate(parseInt(element.id));
  return Math.abs(unitLocation.x - elementLocation.x) + Math.abs(unitLocation.y - elementLocation.y);
}

function getAffinity(playerObject, computerObject) {
  switch(playerObject.affinity){
    case "red":
      var playerAffinity = hexToRgb("#FF3A3A");
      break;
    case "yellow":
      var playerAffinity = hexToRgb("#FFFF00");
      break;
    case "purple":
      var playerAffinity = hexToRgb("#9933FF");
      break;
    case "blue":
      var playerAffinity = hexToRgb("#3333FF");
      break;
  }

  switch(computerObject.affinity){
    case "red":
      var computerAffinity = hexToRgb("#FF3A3A");
      break;
    case "yellow":
      var computerAffinity = hexToRgb("#FFFF00");
      break;
    case "purple":
      var computerAffinity = hexToRgb("#9933FF");
      break;
    case "blue":
      var computerAffinity = hexToRgb("#3333FF");
      break;
  }
  return {playerAffinity: "rgb(" + playerAffinity.r + ", " + playerAffinity.g + ", " +playerAffinity.b + ")", computerAffinity: "rgb(" + computerAffinity.r + ", " + computerAffinity.g + ", " +computerAffinity.b + ")"};
}

function getRandom() {
  return Math.floor(Math.random() * 2);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function computerTurn(){
  while(computerTurns > 0){
    var randomIndex = Math.floor(Math.random() * computerUnits.length);
    var computerObject = computerUnits[randomIndex];
    var distance = [];
    for(var i = 0; i < playerUnits.length; i++){
      distance.push({distance: getDistance(document.getElementById(playerUnits[i].position), computerObject), object: playerUnits[i]});
    }

    var smallestDistanceIndex = 0;
    var smallestDistance = distance[0].distance
    for (var i = 1; i < distance.length; i++){
      if (distance[i].distance < smallestDistance){
        smallestDistance = distance[i].distance;
        smallestDistanceIndex = i;
      }
    }

    var playerObject = distance[smallestDistanceIndex].object;
    var distanceBetween = distance[smallestDistanceIndex].distance;

    if (distanceBetween <= computerObject.range){
      computerAttack(playerObject, computerObject);

    }else{
      computerMove(playerObject, computerObject);

    }

  }
  computerTurns = 4;
  playerTurns = 4;
  document.getElementById("setUnitPosition").innerHTML = "Actions: " + playerTurns;
}

function computerAttack(playerObject, computerObject) {
  computerTurns--;
  var affinity = getAffinity(playerObject, computerObject);
  var attack = computerObject.attack;
  var defense = playerObject.defense;
  var attackHits = 0;
  var defenseHits = 0;

  if (affinity.computerAffinity == document.getElementById(playerObject.position).style.backgroundColor){
    attack += 2;
  }

  if (affinity.playerAffinity == document.getElementById(computerObject.position).style.backgroundColor){
    defense += 2;
  }

  for(var i = 0; i < attack; i++){
    var random = getRandom();
    if (random == 1){
      attackHits++;
    }
  }

  for(var i = 0; i < defense; i++){
    var random = getRandom();
    if (random == 0){
      defenseHits++;
    }
  }
  var damage = attackHits - defenseHits;
  var dead = false;
  if (damage > 0){
    playerObject.life = playerObject.life - damage;
    if (playerObject.life <= 0){
      document.getElementById(playerObject.position).innerHTML = "X";
      for(var i = 0; i < playerUnits.length; i++){
        if(playerUnits[i].position == playerObject.position){
          playerUnits.splice(i,1);
          dead = true;
          break;
        }
      }
    }
  }else{
    damage = 0;
  }

  if (dead){
    updateSummary(computerObject.name + " attacked " + playerObject.name + " and defeated them with " + damage + " damage", 2);
  }else{
    updateSummary(computerObject.name + " attacked " + playerObject.name + " and did " + damage + " damage", 2);
  }
  if(playerUnits.length == 0){
    sessionStorage.playerRemainingPoints = 0;
    var computerRemainingPoints = 0;
    for(var i = 0; i < computerUnits.length; i++) {
      computerRemainingPoints += computerUnits[i].points;
    }
    sessionStorage.computerRemainingPoints = computerRemainingPoints;
    window.location.href = "summary.html";
  }

}

function computerMove(playerObject, computerObject){
  computerTurns--;
  var speed = computerObject.speed;
  var moveDistance = 0;
  var playerCoordinate = getCoordinate(playerObject.position);
  while (speed > 0 && getDistance(document.getElementById(playerObject.position), computerObject) > 1){
    var computerCoordinate = getCoordinate(computerObject.position);
    if(playerCoordinate.x > computerCoordinate.x && document.getElementById(computerObject.position + 1).innerHTML == "X"){
      document.getElementById(computerObject.position).innerHTML = "X";
      document.getElementById(computerObject.position + 1).innerHTML = "<b>" + computerObject.attack + "</b>";
      computerObject.position += 1;
      speed--;
      moveDistance++;
    }else if (playerCoordinate.x < computerCoordinate.x && document.getElementById(computerObject.position - 1).innerHTML == "X"){
      document.getElementById(computerObject.position).innerHTML = "X";
      document.getElementById(computerObject.position - 1).innerHTML = "<b>" + computerObject.attack + "</b>";
      computerObject.position -= 1;
      speed--;
      moveDistance++;
    }else if (playerCoordinate.y > computerCoordinate.y && document.getElementById(computerObject.position + 50).innerHTML == "X"){
      document.getElementById(computerObject.position).innerHTML = "X";
      document.getElementById(computerObject.position + 50).innerHTML = "<b>" + computerObject.attack + "</b>";
      computerObject.position += 50;
      speed--;
      moveDistance++;
    }else if (playerCoordinate.y < computerCoordinate.y && document.getElementById(computerObject.position - 50).innerHTML == "X"){
      document.getElementById(computerObject.position).innerHTML = "X";
      document.getElementById(computerObject.position - 50).innerHTML = "<b>" + computerObject.attack + "</b>";
      computerObject.position -= 50;
      speed--;
      moveDistance++;
    }else{
      speed--;
    }
  }
  if (moveDistance != 0){
    updateSummary(computerObject.name + " moved " + moveDistance + " spaces", 2);
  }else{
    computerTurns++;
  }

}

function updateSummary(newSummary, owner){
  var summary2 = document.getElementById("summary2").innerHTML;
  var summary3 = document.getElementById("summary3").innerHTML;
  var summary4 = document.getElementById("summary4").innerHTML;
  var summary5 = document.getElementById("summary5").innerHTML;

  document.getElementById("summary1").innerHTML = summary2;
  document.getElementById("summary1").style.backgroundColor = document.getElementById("summary2").style.backgroundColor;
  document.getElementById("summary2").innerHTML = summary3;
  document.getElementById("summary2").style.backgroundColor = document.getElementById("summary3").style.backgroundColor;
  document.getElementById("summary3").innerHTML = summary4;
  document.getElementById("summary3").style.backgroundColor = document.getElementById("summary4").style.backgroundColor;
  document.getElementById("summary4").innerHTML = summary5;
  document.getElementById("summary4").style.backgroundColor = document.getElementById("summary5").style.backgroundColor;
  document.getElementById("summary5").innerHTML = newSummary;
  if(owner == 1){
    document.getElementById("summary5").style.backgroundColor = "lightGreen";
  }else{
    document.getElementById("summary5").style.backgroundColor = "#FF4D4D";
  }
}

function ending(){
  if(sessionStorage.playerRemainingPoints == "0"){
    document.getElementById("winOrLose").innerHTML = "DEFEAT!";
  }else{
    document.getElementById("winOrLose").innerHTML = "VICTORY!";
  }
  document.getElementById("playerSummary").innerHTML = "Player<br>Total Points: " + sessionStorage.playerTotalPoints + "<br>Remaining Points: " + sessionStorage.playerRemainingPoints;
  document.getElementById("computerSummary").innerHTML = "Computer<br>Total Points: " + sessionStorage.computerTotalPoints + "<br>Remaining Points: " + sessionStorage.computerRemainingPoints;
 }

//cookie functions courtesy of w3schools
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
