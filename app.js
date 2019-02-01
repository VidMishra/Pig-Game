
var scores, roundScore, activePlayer, gamePlaying;
var prevDice1, prevDice2;

init();

/*console.log(dice);

//This will simply set the dice value to the text
document.querySelector('#current-'+activePlayer).textContent = dice;

//If wanted to set some style to the text 'innerHTML'
// document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>';

//Also we can get the text vlue like this
var x = document.querySelector('#current-'+activePlayer).textContent;
console.log(x); */


//Adding click event listener
document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {
        // 1. Random dice number
        var dice1 = Math.floor(Math.random()*6) + 1;
        var dice2 = Math.floor(Math.random()*6) + 1;
      
        // 2. Display the result
        setDiceVisible(true);
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the roundScore if the rolled number was not 1
        if(dice1 !== 1 && dice2 !== 1) {

            if(prevDice1 === 6 && dice1 === 6
                && prevDice2 === 6 && dice2 === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-'+activePlayer).textContent = '0';
                nextPlayer();
            } else {
                // Add score
                roundScore += dice1 + dice2;
                document.querySelector('#current-'+activePlayer).textContent = roundScore;

                prevDice1 = dice1;
                prevDice2 = dice2;
            }
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        var winningScore = document.querySelector('.winning-score').value;

        if(!winningScore) {
            winningScore = 100;
        } 

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            setDiceVisible(false);
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDice1 = 0;
    prevDice2 = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    setDiceVisible(false);
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    prevDice1 = 0;
    prevDice2 = 0;
    
    setDiceVisible(false);

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function setDiceVisible(isVisible) {
    if(isVisible) {
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
    } else {
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
    }
}
