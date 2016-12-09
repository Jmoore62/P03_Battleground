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

var playerTurns = 5;
var computerTurns = 5;

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
      document.getElementById(affinity[i]).style.backgroundColor = "yellow";
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
  if (element.innerHTML != "X" && !selectPosition){
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

    }else{
      if (playerUnitSet) {

      }
    }
  }else{
    if(selectPosition && element.innerHTML == "X" && (element.id % 50) <= 20){
      element.innerHTML = "<b><u>" + playerUnits[numberOfUnitsPlaced].attack + "</b></u>";
      playerUnits[numberOfUnitsPlaced].position = element.id;
      numberOfUnitsPlaced++;
      if (numberOfUnitsPlaced >= playerUnits.length) {
        selectPosition = false;
        document.getElementById("setUnitPosition").innerHTML = "Actions: 5";
        selectPositions();
      }else{
        document.getElementById("setUnitPosition").innerHTML = "SET UNIT ON LEFT HALF" + "<br>Name: " + playerUnits[numberOfUnitsPlaced].name + "<br>Attack: " + playerUnits[numberOfUnitsPlaced].attack + "<br>Defense: " + playerUnits[numberOfUnitsPlaced].defense +
        "<br>Speed: " + playerUnits[numberOfUnitsPlaced].speed + "<br>Range: " + playerUnits[numberOfUnitsPlaced].range + "<br>Life: " + playerUnits[numberOfUnitsPlaced].life +"<br>Affinity: "  + playerUnits[numberOfUnitsPlaced].affinity + "<br>Owner: Player";
      }
    }else if (document.getElementById("playerSelectedInfo").innerHTML != "" && playerTurns > 0) {
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
  this.points = this.attack * 10 + this.defense * 5 + this.speed * 5 + this.range * 5 + this.life * this.defense + this.life * 2;
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
        var color = "yellow";
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
  var unitLocation = getCoordinate(unit.position);
  var moveElementLocation = getCoordinate(parseInt(moveElement.id));
  var distance = Math.abs(unitLocation.x - moveElementLocation.x) + Math.abs(unitLocation.y - moveElementLocation.y);
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
  }else{
    document.getElementById("confirmMove").style.display = "none";
    document.getElementById("confirmPlacement").style.display = "none";
    moveElement.style.backgroundColor = currentElementBackground;
    window.alert("Move is out of range.");
    currentElementBackground = "";
    currentElement = "";
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
