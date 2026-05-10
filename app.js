let boxes = document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");

let newGameBtn= document.querySelector("#new-btn");

let msgContainer= document.querySelector(".msg-container");

let msg = document.querySelector("#msg");


let turnO = true;   // PlayerX  PlayerO
let isGameOver= false;   // game over check krna ka lea


const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8]
]


const resetGame=()=>{

  turnO= true;
  isGameOver= false;
  enableBoxes();
  msgContainer.classList.add("hide");

}


boxes.forEach((box)=>{

  box.addEventListener("click",()=>{

    // Agr game over hu geae tu click ni huga
    if(isGameOver) return;

    // Sirf empty box pr click huga
    if(turnO==true && box.innerText==""){

      box.innerText= "O";
      box.disabled= true;
      turnO= false;
      checkWinner();

      // Ab machine ki bari
      if(!isGameOver){
         setTimeout(computerMove,  500);

 }

    }

  })

})

const computerMove=()=>{

  let emptyBoxes=[];
  boxes.forEach((box)=>{
    if(box.innerText===""){
      emptyBoxes.push(box);

    }

  })

  if(emptyBoxes.length>0 && !isGameOver){

    let randomIndex= Math.floor(Math.random()*emptyBoxes.length);
    let selectBox= emptyBoxes[randomIndex];
    selectBox.innerText= "X";
    selectBox.disabled= true;
    turnO= true;
    checkWinner();

  }

}
const disableBoxes= ()=>{

  for(let box of boxes){
     box.disabled= true;

  }

};

const enableBoxes= ()=>{
  
    for(let box of boxes){
    box.disabled= false;
    box.innerText= "";

  }

}

const showWinner=(winner)=>{

  msg.innerText= `Congratulations winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  isGameOver= true;

}



const checkWinner=()=>{

  for(let pattern of winPatterns){

    let pos1Val= boxes[pattern[0]].innerText;
    let pos2Val= boxes[pattern[1]].innerText;
    let pos3Val= boxes[pattern[2]].innerText;


    if(pos1Val!="" && pos2Val!="" && pos3Val!=""){

      if(pos1Val===pos2Val && pos2Val===pos3Val){

        showWinner(pos1Val);
        return;

      }

    }

  }

}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
