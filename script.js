//global variables
let playerScore = 0 ;
let dealerScore = 0;
let bust = false; 
let bustDealer = false;
let cardsArray = [1,2,3,4,5,6,7,8,9,10,11,12,13]

//selectors
let buttonPlay = document.querySelector(".play");
let buttonStop = document.querySelector(".stop");

//event listeners
buttonPlay.addEventListener("click",turn)
buttonStop.addEventListener("click",stop)

//Functions

//shuffle the deck
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

//player hitsplays until he decides not to 
function playerTurn() {
cardsArrayShuffle = shuffle(cardsArray);
let playerCard = cardsArrayShuffle[0];
playerScore += playerCard;
document.querySelector(".player-draw").textContent = `You draw ${playerCard}`;   
if(playerScore > 21) 
{
    bust = true;
    document.querySelector(".player-score").textContent = `Your score :${playerScore} You bust, noob`
    buttonPlay.disabled = true;
} 
if (bust == false || playerScore == 21) {
    document.querySelector(".player-score").textContent = `Your score :${playerScore}`
    if(playerScore == 21)
    {
        buttonPlay.disabled = true;
    }
} 
}
//computer plays until he reaches 15
function dealerTurn(){
let cardsArrayShuffle = shuffle(cardsArray);
let dealerCard = cardsArrayShuffle[0];
dealerScore += dealerCard;
if(dealerScore > 21) 
{
    bustDealer = true;
}
document.querySelector(".computer-score").textContent = `Dealer score : ${dealerScore}`;
document.querySelector(".computer-draw").textContent = `The dealer draw: ${dealerCard}`;
}

//run one turn
function turn(e) {
    playerTurn();
    
    if(dealerScore < 15)
    {
        dealerTurn();
    }

}

//display who wins
function stop() {
    if((playerScore> dealerScore) && (playerScore< 22)) 
}

