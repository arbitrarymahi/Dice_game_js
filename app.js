/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, activePlayer, roundScore, gamePlaying, scoreTarget,previousScore1, previousScore2;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
  if(gamePlaying){
    //1. random no
    var dice1 = Math.floor(Math.random()*6)+1;
    var dice2 = Math.floor(Math.random()*6)+1;

    //2.display dice
    var diceDOM1 = document.querySelector('.dice1');
    var diceDOM2 = document.querySelector('.dice2');

    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    //3. score count and gameplay
    if (dice1 !== 1 && dice2 !==1) {
          if((previousScore1 === 6 || previousScore2 === 6) && (dice1 === 6 || dice2 === 6)){
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
            changePlayer();
            previousScore1 = 0;
            previousScore2 = 0;

          }
          else {
            //count score
            previousScore1 = dice1;
            previousScore2 = dice2;
            roundScore += dice1+dice2;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
          }
    }
    else {
      //change turn
      changePlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
if (gamePlaying) {
  //1. update score
  scores[activePlayer] += roundScore;

  //2. UI change in score

  document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

  //3. Declare Winner
  if(scores[activePlayer] >= scoreTarget ){
    document.getElementById('name-'+activePlayer).textContent = '! WINNER !';
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
    document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
    //roundScore = 0;
    document.getElementById('current-'+activePlayer).textContent = roundScore;
    gamePlaying = false;
  }
else {
  //4. Change Player
  changePlayer();
}
}
});

function changePlayer(){
  roundScore = 0;
  document.getElementById('current-'+activePlayer).textContent = roundScore;

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  roundScore = 0;
  document.getElementById('current-'+activePlayer).textContent = roundScore;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

}

function init(){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  scoreTarget = document.getElementById('scoreTarget').value;
  previousScore2 = 0;
  previousScore1 = 0;

  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}

document.querySelector('.btn-new').addEventListener('click',init);
