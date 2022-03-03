//Globals
let playerScore = 0;
let dealerScore = 0;
let bust;
let bustDealer;
let cardsArray = [1,2,3,4,5,6,7,8,9,10,11,12,13];

//Selectors
let buttonPlay = document.querySelector(".play");
let buttonStop = document.querySelector(".stop");
let buttonAce1 = document.querySelector(".ace-one");
let buttonAce2 = document.querySelector(".ace-eleven");

//EventListeners
buttonPlay.addEventListener("click",turn);
buttonStop.addEventListener("click",stop);
buttonAce1.addEventListener("click",ace1Callback);
buttonAce2.addEventListener("click",ace11Callback);


//Shuffle cards
function shuffle(array) {
  let randomIndex;
  for (let i = array.length-1; i>=0; --i) {
    randomIndex = Math.floor(Math.random() * i);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  } 
  return array;
};

//Dealer hits
function dealerTurn() 
{
  bustDealer = false;
  let cardsArrayShuffle = shuffle(cardsArray);
  let dealerCard = cardsArrayShuffle[0];
  displayCard(dealerCard,"The dealer",".computer-draw",".computer-score", dealerScore);
  if (dealerScore > 21)
  {
    bustDealer = true;
  } 
    
};

//Player hits 
function playerTurn() 
{
  bust = false;
  cardsArrayShuffle = shuffle(cardsArray);
  let playerCard = cardsArrayShuffle[0];
  displayCard(playerCard,"You",".player-draw",".player-score",playerScore);
  if(playerScore > 21)
  {
    bust = true;
    //document.querySelector(".player-score").textContent += ` You  bust`;
    buttonPlay.disabled = true;
  }
  if(bust == false || playerScore == 21)
  {
    //document.querySelector(".player-score").textContent += ` You didn't bust`;
    if(playerScore == 21)
    {
      buttonPlay.disabled = true;
    }
  }
}

//Run one turn when click on hit me!
function turn(e)
{
  if(playerScore < 21)
  {
    playerTurn();
  }
  if(dealerScore < 15)
  {
    dealerTurn();
  }
  
  if(bust == true || bustDealer == true || dealerScore == 21)
  {
    stop();
  }
}

function busted() {
  if(bust == true)
  {
    alert("dealer won");
    return true;
  } else if (bustDealer == true && bust == false)
  {
    alert("player won");
    return true;
  }
  return false;
}

//Display who won
function stop(e)
{
  console.log(`P : ${bust} D : ${bustDealer}`);
  if (busted())
    return;

  /* dealer plays until 15 or more than player */
  while (playerScore > dealerScore && dealerScore < 15) {
    console.log("je suis dedans lol");
    dealerTurn();
    if (busted())
      return;
  }

  if(playerScore > dealerScore)
    alert("player won");
  else
    alert("dealer won");
}

function displayCard(cardP, nameP, classDrawNameP, classScoreP, scoreP)
{

  /* AS */
  if (cardP == 1) {
    if (nameP == "You")
    {
      document.querySelector(classDrawNameP).textContent = `You draw : An ace choose its value`;
      buttonAce1.style.visibility = "visible";
      buttonAce2.style.visibility = "visible";
      buttonPlay.disabled = true;
      buttonStop.disabled = true;
    }
    else
    {
      if ((dealerScore <=3) || (dealerScore > 5 && dealerScore < 11))
      {
        document.querySelector(classDrawNameP).textContent = `${nameP} draw : An ace and choosed 11 as its value`;
        dealerScore+=11;
        document.querySelector(classScoreP).textContent = `${nameP} score is : ${dealerScore}`;
      }
      else
      {
        document.querySelector(classDrawNameP).textContent = `${nameP} draw : An ace and choosed 1 as its value`;
        dealerScore+=cardP;
        document.querySelector(classScoreP).textContent = `${nameP} score is : ${dealerScore}`;
      }
    }
  } else {
    let cardsName = ['1','2','3','4','5','6','7','8','9','10','Jack','Queen', 'King' ];
    let cardsScore = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    let thisCardName = cardsName[cardP-1];
    let thisCardScore = cardsScore[cardP-1];

    scoreP+=thisCardScore;
    document.querySelector(classDrawNameP).textContent = `${nameP} draw : ${thisCardName}`;
    if(nameP == "You")
    {
      playerScore = scoreP;
      document.querySelector(classScoreP).textContent = `Your score is : ${playerScore}`;
    }
    else
    {
      dealerScore = scoreP;
      document.querySelector(classScoreP).textContent = `${nameP} score is : ${dealerScore}`;
    }

  }
}

function ace1Callback(e)
{
  console.log("test 1");
  document.querySelector(".player-draw").textContent = `You choosed 1`;
  playerScore+=1;
  aceStop();
}

function ace11Callback(e){
  console.log("test 11");
  document.querySelector(".player-draw").textContent = `You choosed 11`;
  playerScore+=11;
  aceStop();
}

function aceStop() 
{
  document.querySelector(".player-score").textContent = `Your score is : ${playerScore}`;
  buttonAce1.style.visibility = "hidden";
  buttonAce2.style.visibility = "hidden";
  buttonPlay.disabled = false;
  buttonStop.disabled = false;
}
