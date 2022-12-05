// Configuration Functions
function openConfig (event) {
    const selectedPlayerId = +event.target.dataset.player;
    edittingPlayer = selectedPlayerId;
    backDropSectionElement.style.display = 'block';
    backDropOverLayElement.style.display = 'block';
}

function closeConfig () {
    backDropSectionElement.style.display = 'none';
    backDropOverLayElement.style.display = 'none';
    backDropSectionElement.firstElementChild.children[1].classList.remove('error');
    inputError.textContent = '';
    formElemnt.children[1].children[1].value = '';

}

function savePlayerConfig (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('playerName').trim();

    if(!enteredPlayerName) {
        event.target.children[1].classList.add('error');
        inputError.textContent = 'Please, enter valid name!';
        inputError.style.margin = '0.2rem 0';
        inputError.style.fontSize = '1.5rem';
        return;
    }

    const player = document.getElementById("p-" + edittingPlayer);
    player.children[1].textContent = enteredPlayerName;
    players[edittingPlayer-1].name = enteredPlayerName;

    closeConfig();

}

function gameRestart () {
    edittingPlayer = 0;
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;


    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            game[i][j] = 0;
        }
    }

    for(const list of gameListElement) {
        list.textContent = '';
        list.classList.remove('disable');
        list.classList.remove('winner');
        list.classList.add('items');
     }


     gameAreaElement.children[0].style.display = 'block'; 
     winningSection.firstElementChild.innerHTML = '<h2>Winner is <span class="winner-name">Player Name!!</span></h2>';
     winningSection.style.display = 'none';
     headerSection.style.display = 'block';



}

function startGame() {
    gameRestart();
    playerName.textContent = players[activePlayer].name;

    if(players[0].name === '' || players[1].name === '') {
        alert('Please, enter custom player name for both fields!');
       return;
    } 


    if(!(players[0].name === '' || players[1].name === '')) {
        editSection.style.display = 'none';
        shortFormSection.style.display = 'block';
    }
    counterElement1.textContent = '| ' + counter1 + ' |';
    counterElement2.textContent = '| ' + counter2 + ' |';
        playerNameElement1.textContent = players[0].name;
        playerNameElement2.textContent = players[1].name;

        gameAreaElement.style.display = 'block';
    
}

function switchPlayer () {
    if(activePlayer == 0) {
        activePlayer = 1;
    }
    else {
        activePlayer = 0;
    }

    playerName.textContent = players[activePlayer].name;
}

function gamePlay (event) {
    const selectedField = event.target;
    const selectedRow = selectedField.dataset.row;
    const selectedCol = selectedField.dataset.col;
    if (gameIsOver) {
        return;
    }

    if ( game[selectedRow-1][selectedCol-1] > 0) {
        alert('Please, click only in empty fields!')
        return;
    }
    selectedField.textContent = players[activePlayer].symbole;
    selectedField.classList.add('disable');

    game[selectedRow-1][selectedCol-1] = activePlayer + 1;
    // console.log(game);
    const winnerId = gameOver();
    // console.log(winnerId);
    if(winnerId != 0) {
        gameEnd(winnerId);
        // console.log(winnerId);
    }

    currentRound++;
    switchPlayer();

}

function gameOver () {
    //Checking row
    for(let i = 0; i < 3; i++) {
        if (
            game[i][0] > 0 &&
            game[i][0] == game[i][1] &&
            game[i][0] == game[i][2]
        ) {

            return game[i][0];

        }

    }

     //Checking col
     for(let i = 0; i < 3; i++) {
        if (
            game[0][i] > 0 &&
            game[0][i] == game[1][i] &&
            game[0][i] == game[2][i]
        ) {
            return game[0][i];

        }
    }

    //Checking diagonal 1
    if (
        game[0][0] > 0 &&
        game[0][0] == game[1][1] &&
        game[1][1] == game[2][2]
    ) {
        return game[0][0];
    }

    //Checking diagonal 2
    if (
        game[0][2] > 0 &&
        game[0][2] == game[1][1] &&
        game[1][1] == game[2][0]
    ) {
        return game[2][0];
    }

    if(currentRound == 9) {
        return -1;
    }

    return 0;

}


function gameEnd (winnerId) {
    let temp = winnerId;
    winningSection.style.display = 'block';
    headerSection.style.display = 'none';
    gameIsOver = true;
    painting(temp);
    
        if (winnerId == 1) {
            winningSection.firstElementChild.firstElementChild.firstElementChild.textContent = players[0].name;  
            winnerName.textContent = players[winnerId-1].name;
            counter1++;
            counterElement1.textContent = '| ' + counter1 + ' |';
            console.log(counterElement1);
        }
        else if(winnerId == 2) {
            winningSection.firstElementChild.firstElementChild.firstElementChild.textContent = players[1].name;
            winnerName.textContent = players[winnerId-1].name;
            counter2++; 
            counterElement2.textContent = '| ' + counter2 + ' |';
            console.log(counterElement2);
        }
       else {
        winningSection.firstElementChild.innerHTML = '<h2>It\'s a <span class="winner-name">Draw!!</span></h2>';
    }

    console.log('winnerId = ' + winnerId);

}



function painting (winnerId) {
          let list = [0,0,0,
                     0,0,0,
                     0,0,0];
    let counter = 0;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if (game[i][j] == winnerId) {
                list[counter] = game[i][j];
            }
            counter++;
        }
    }

    console.log('game array = ' + game);
    console.log('list array = ' + list);

    let flag1 = -1;
    let flag2 = -1;
    let flag3 = -1;
        //rows
        if(
            list[0] > 0 &&
            list[0] == list[1] &&
             list[1] == list[2]
        ) {
            flag1 = 0;
            flag2 = 1;
            flag3 = 2;
        }

        else if (
            list[3] > 0 &&
            list[3] == list[4] &&
             list[4] == list[5]
        ) {
            flag1 = 3;
            flag2 = 4;
            flag3 = 5;
        }
        else if (
            list[6] > 0 &&
            list[6] == list[7] &&
             list[7] == list[8]
        ) {
            flag1 = 6;
            flag2 = 7;
            flag3 = 8;
        }


        //cols
        else if (
             list[0] > 0 &&
             list[0] == list[3] &&
             list[3] == list[6]
        ) {
            flag1 = 0;
            flag2 = 3;
            flag3 = 6;
        }
        else if (
            list[1] > 0 &&
            list[1] == list[4] &&
             list[4] == list[7]
        ) {
            flag1 = 1;
            flag2 = 4;
            flag3 = 7;
        }
        else if (
            list[2] > 0 &&
            list[2] == list[5] &&
             list[5] == list[8]
        ) {
            flag1 = 2;
            flag2 = 5;
            flag3 = 8;
        }
        //diagonals
        else if (
            list[0] > 0 &&
            list[0] == list[4] &&
             list[4] == list[8]
        ) {
            flag1 = 0;
            flag2 = 4;
            flag3 = 8;
        }
        else if (
            list[2] > 0 &&
            list[2] == list[4] &&
             list[4] == list[6]
        ) {
            flag1 = 2;
            flag2 = 4;
            flag3 = 6;
        }

    

        if (flag1 == -1) {
            return;
        }
        gameAreaElement.children[0].style.display = 'none'; 

        gameAreaElement.children[1].children[flag1].classList.remove('disable');
        gameAreaElement.children[1].children[flag2].classList.remove('disable');
        gameAreaElement.children[1].children[flag3].classList.remove('disable');

        gameAreaElement.children[1].children[flag1].classList.remove('items');
        gameAreaElement.children[1].children[flag2].classList.remove('items');
        gameAreaElement.children[1].children[flag3].classList.remove('items');
   

        gameAreaElement.children[1].children[flag1].classList.add('winner');
        gameAreaElement.children[1].children[flag2].classList.add('winner');
        gameAreaElement.children[1].children[flag3].classList.add('winner');

    
}



