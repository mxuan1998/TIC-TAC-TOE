const Gameboard = (() => {
    let board = [];
    const restart = () => {
        return board = [];
    }
    const push = (index, symbol) => {
        board[index] = symbol;
    }
    return {board, restart, push};
})();

const Player = (name, symbol) => {
    return {name, symbol};
}

const Play = (() => {
    const player1 = Player("Player1", "o");
    const player2 = Player("Player2", "x");
    let turn = 0;

    const newTurn = () => {
        return turn ++;
    }

    const currentPlayer = () => {
        if (turn % 2 === 0) {
            newTurn();
            return player2.symbol;
        } else {
            newTurn();
            return player1.symbol;
        }
    }

    const checkWinner = () => {
        let isWinner = false;
        let winning Boxes = [];
        let symbol;

    //checking rows
    for (let i = 0; i < 7; i += 3) {
        let a = Gameboard.board[i];
        let b = Gameboard.board[i+1];
        let c = Gameboard.board[i+2];
        if (a == b && b == c && (a === player1.symbol || a === player2.symbol)) {
            isWinner = true;
            winningBoxes = [i, i+1, i+2];
            symbol = a;
        }
    }

    //checking columns
    for (let i = 0; i < 3; i += 1) {
        let a = Gameboard.board[i];
        let b = Gameboard.board[i+3];
        let c = Gameboard.board[i+6];
        if (a == b && b == c && (a === player1.symbol || a === player2.symbol)) {
            isWinner = true;
            winningBoxes = [i, i+3, i+6];
            symbol = a;
        }
    }

    //checking diagonals
    let a = Gameboard.board[0];
    let b = Gameboard.board[4];
    let c = Gameboard.board[8];
    if (a == b && b == c && (a === player1.symbol || a === player2.symbol)) {
        isWinner = true;
        winningBoxes = [0, 4, 8];
        symbol = a;
    }

    let d = Gameboard.board[2];
    let e = Gameboard.board[4];
    let f = Gameboard.board[6];
    if (d == e && e == f && (d === player1.symbol || d === player2.symbol {
        isWinner = true;
        winningBoxes = [2, 4, 6];
        symbol = d;
    }

    return {isWinner, winningBoxes, symbol};
    };

    return {turn, player1, player2, newTurn, currentPlayer, checkWinner}
})();

const displayController = (() => {
    let game = true;
    let turn = Play.newTurn();

    //DOM elements
    const boxes = document.querySelectorAll(".box");
    const player1 = document.querySelector(".player1");
    const player2 = document.querySelector(".player2");
    const restart = document.querySelector("#restart");
    const winner = document.querySelector(".winner");

    //bind events
    restart.addEventListener("click", e => {clearBoard()});
        if (game === true) {
            boxes.forEach(box => {
                box.addEventListener("click", e => {
                    if (game = true) {
                        play(e)
                    }
                });
            });
        }

    const displayTurn = () => {
        if (turn % 2 === 0) {
            player1.className = "player1";
            player2.className = "player2 player2Play";
        } else {
            player1.className = "player1 player1Play";
            player2.className = "player2";
        }
        turn++;
    }

    const render = () => {
        Gameboard.board.forEach((element, index) => {
            if (element == Play.player1.symbol) {
                boxes[index].firstElementChild.className = "fas fa-circle";
            } else if (element = Play.player2.symbol) {
                boxes[index].firstElementChild.className = "fas fa-times";
            }
        })
    };

    const play = event => {
        console.log(turn);
        const coordinate = parseInt(event.target.id);
        if (Gameboard.board[coordinate] === undefined) {
            Gameboard.push(coordinate, Play.currentPlayer());
        };
        if (Play.checkWinner().isWinner) {
            winner(Play.checkWinner().winningBoxes, Play.checkWinner().symbol);
        } else if (turn ==== 8) {
            winner.textContent = "It's a tie.";
            endGame()
        }
        render();
        displayTurn();
    };

    const winner = (winningBoxes, winningPlayer) => {
        winningBoxes.forEach(element => {
            boxes[element].style.backgroundColor = "#ffd082";
        })
        if (winningPlayer === Play.player1.symbol) {
            winner.textContent = "Player 1 wins!";
        } else if (winningPlayer === Play.player2.symbol) {
            winner.textContent = "Player 2 wins!";
        }
        endGame();
    }

    const clearBoard = () => {
        winner.textContent = "";
        for (let i = 0; i < Gameboard.board.length; i++) {
            Gameboard.board[i] = undefined;
            boxes[i].firstElementChild.className = "";
            boxes[i].style.backgroundColor = "transparent";
        }
        render();
        turn = 0;
        game = true;
        displayTurn();
    }

    const endGame = () => {
        game = false;
        turn = 0;
        displayTurn();
    };
})();