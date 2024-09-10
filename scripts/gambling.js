//variables;
var bet = 0
var slots = [0, 0, 0]
var machine

//slotmachine;
function randSlot() {
  return Math.floor(Math.random() * 10)
}

function slotMachine() {
  //cost;
  if (getCB() >= 100) {
    changeCB(-100)
    //random start;
    slots = [randSlot(), randSlot(), randSlot()]
    //iterates multiple times;
    for (let i = 0; i < 40; i++){
      setTimeout(function() {
        //iterates between slots;
        for (let h = 0; h <= 2; h++) {
          //chance of changing;
          let slotChance = Math.random()
          if (slotChance >= (0.5/(h+1))) {
            slots[h] = (slots[h] + 1) % 10
          }
        }//changes on screen;
        machine.innerHTML = (slots[0] + " " + slots[1] + " " + slots[2])
      }, i*100);
    }
    //win conditions after delay;
    setTimeout(function() {
      if (slots == [7, 7, 7]) {
        activateCoins();
        changeCB(9000000000000000);
      } else if (slots[1] == slots[2] && slots[2] == slots[0]){
        changeCB(getCB() * getCB())
        playSound('prank2')
      } else if (slots[1] == slots[2] || slots[1] == slots[0]){
        changeCB(getCB() * 3)
        playSound('prank2')
      } else if (slots[0] == slots[2]){
        changeCB(getCB())
        playSound('prank2')
      } else {
        playSound('boowomp')
      }}, 4000)
  } else {
    machine.innerHTML = ("poor lol")
  }
}

setTimeout(function(){machine = document.getElementById("slots")}, 1000);