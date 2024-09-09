//variables
var bet = 0;
var slots = [0, 0, 0];
var machine;

//slotmachine

function slotMachine() {
  if (getCB() >= 100) {
    changeCB(-100);
    for(let i = 0; i < 40; i++){
      setTimeout(function(){
        machine.innerHTML = (slots[0] + " " + slots[1] + " " + slots[2]);
        slots = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      }, 100*i);
    }
    setTimeout(function(){
      if(slots == [7, 7, 7]) {
        activateCoins();
        changeCB(9000000000000000);
      }else if (slots[1] == slots[2] && slots[2] == slots[0]){
        changeCB(getCB() * getCB());
        playSound('prank2');
      }else {
        playSound('boowomp');
      }}, 4000);
  } else {
    machine.innerHTML = ("poor lol");
  }
}

setTimeout(function(){machine = document.getElementById("slots");}, 1000);