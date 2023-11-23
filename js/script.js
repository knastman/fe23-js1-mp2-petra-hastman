/*********************************
 FORM - GET NAME
**********************************/

const form = document.querySelector('form');
let getNameSection = document.querySelector('#getname');
let gamediv = document.querySelector('#game');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const playerNname = document.querySelector('#nameinput').value;
  
  let h3Name = document.querySelector('#playername');
  h3Name.innerText = playerNname;
  
  form.reset();
  getNameSection.style.display = 'none';
  gamediv.style.display ='block';
});

/******************************************
        GAME - variables
******************************************/

const divItems = document.querySelector('#items');

const rockDiv = document.querySelector('#rock');
const paperDiv = document.querySelector('#paper');
const scissorsDiv = document.querySelector('#scissors');

const cRockDiv = document.querySelector('#crock');
const cPaperDiv = document.querySelector('#cpaper');
const cScissorsDiv = document.querySelector('#cscissors');
const itemsArray = ['Rock', 'Paper', 'Scissors'];  

const computerPickP = document.querySelector('#computerpick');
const playerPickP = document.querySelector('#playerpick');

let pPoints = 0;
let cPoints = 0;
const pPointsP = document.querySelector('#ppoints');
const cPointsP = document.querySelector('#cpoints');
const winner = document.querySelector('#winner');

const pScoreUl = document.querySelector('#pscore');
const cScoreUl = document.querySelector('#cscore');
let pLi = document.querySelectorAll('#pscore li');
let cLi = document.querySelectorAll('#cscore li');

const startOverBtn = document.querySelector('#startoverbutton');
const nextRoundBtn = document.querySelector('#roundsbutton');
startOverBtn.style.display = 'none';
nextRoundBtn.style.display = 'none';

const maxPoints = 3;

const roundHeader = document.querySelector('#rounds'); 
let round = 1;

/********************************************
      GAME - picks, score/points, winner
*********************************************/

divItems.addEventListener('click', (event)=>{
  winner.style.color='#b00707';
  const playerNname = document.querySelector('#playername').innerText;

  /********* PLAYER'S PICK ********/
  if(event.target.tagName === 'IMG'){
    const playerPick = event.target.getAttribute('pick');
    playerPickP.innerText = `Your pick: ${playerPick}`;

    if( playerPick != 'Rock'){
      rockDiv.style.display = 'none';
    }  
    if( playerPick != 'Paper'){
      paperDiv.style.display = 'none';
    }  
    if( playerPick != 'Scissors'){
      scissorsDiv.style.display = 'none';
    } 

    /********* COMPUTER'S PICK ********/
    const randomPick = Math.floor(Math.random() * itemsArray.length );
    const computersPick = itemsArray[randomPick];
    computerPickP.innerText = `Computer picked: ${computersPick}`;
    
    if( computersPick != 'Rock'){
      cRockDiv.style.display = 'none';
    }  
    if( computersPick != 'Paper'){
      cPaperDiv.style.display = 'none';
    }  
    if( computersPick != 'Scissors'){
      cScissorsDiv.style.display = 'none';
    } 
    
    /********* COUNT POINTS/ROUND WINNER ********/
    if(
      (( playerPick == 'Rock') &&  (computersPick == 'Scissors')) || 
      (( playerPick == 'Paper') && (computersPick == 'Rock')) || 
      (( playerPick == 'Scissors') && (computersPick == 'Paper')) ){
        pPoints++;
        winner.innerText = `${playerNname} wins this round!`;
        roundHeader.innerText = '';  
    }
    else if( 
      (( computersPick == 'Rock') &&  (playerPick == 'Scissors')) || 
      (( computersPick == 'Paper') && (playerPick == 'Rock')) || 
      (( computersPick == 'Scissors') && (playerPick == 'Paper')) ){
        cPoints++;
        winner.innerText = 'Computer wins this round!'; 
        roundHeader.innerText = '';  
    }
    else {
        winner.innerText = "It's a tie";
        roundHeader.innerText = '';  
    }
    
    nextRoundBtn.style.display = 'block';

    /********* SCORE/POINTS ********/
    pPointsP.innerText = `Your points: ${pPoints} p`;
    cPointsP.innerText = `Computer's points: ${cPoints} p`;

    /*********STARS  ********/
    for (let i=0;i<pPoints;i++){
      pLi[i].innerHTML = '<i class="fa-solid fa-star"></i>'; 
    }
    for (let i=0;i<cPoints;i++){
      cLi[i].innerHTML = '<i class="fa-solid fa-star"></i>'; 
    }

    /********* WINNER  ********/
    if (pPoints == maxPoints){
      winner.innerText = `${playerNname} wins the whole game!`;
    }
    else if (cPoints == maxPoints){
      winner.innerText = 'Computer wins the whole game!';
    }  

    if (cPoints == maxPoints || pPoints == maxPoints){
      pPoints = 0;
      cPoints = 0;
      nextRoundBtn.style.display = 'none';
      startOverBtn.style.display = 'block';
      round = 0;
      pPointsP.innerText = '';
      cPointsP.innerText = '';
      pLi.innerHTML = '';  
      cLi.innerHTML = '';  
    }  
  } 
})

/*********************************
        Next/reset round
**********************************/

nextRoundBtn.addEventListener('click', resetRound);

function resetRound(){
  rockDiv.style.display = 'block';
  paperDiv.style.display = 'block';
  scissorsDiv.style.display = 'block';

  cRockDiv.style.display = 'block';
  cPaperDiv.style.display = 'block';
  cScissorsDiv.style.display = 'block';

  playerPickP.innerText = '';
  computerPickP.innerText = '';
  winner.innerText = '';
  
  round++;
  roundHeader.innerText = `Round ${round}`;
}

/*********************************
        Reset game
**********************************/

let li = document.querySelectorAll('li');

startOverBtn.addEventListener('click', resetGame);

function resetGame(){
  rockDiv.style.display = 'block';
  paperDiv.style.display = 'block';
  scissorsDiv.style.display = 'block';

  cRockDiv.style.display = 'block';
  cPaperDiv.style.display = 'block';
  cScissorsDiv.style.display = 'block';

  playerPickP.innerText = '';
  computerPickP.innerText = '';
  winner.innerText = '';
  round = 1;
  roundHeader.innerText = `Round ${round}`;
  startOverBtn.style.display = 'none';
  
  for (let i=0;i<li.length; i++){
    li[i].innerHTML = '<li><i class="fa-regular fa-star"></i></li>';
  } 
}