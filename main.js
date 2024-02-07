//Module
const Gameboard = (function Gameboard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  //Creates 2D array of the board. Adjust inner loop to push empty string for actual game
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(" ");
    }
  }

  const displayBoard = () => {
    return console.log(board);
  };

  return { displayBoard, board };
})();

// Factory function to create players, give them a name and assign X or O
const Player = (name, xo) => {
  const getName = () => name;
  const getXO = () => xo;

  return { getName, getXO };
};

function GameController(player1, player2) {
  const board = Gameboard.board;

  const players = [
    {
      name: player1.getName(),
      xo: player1.getXO(),
    },
    {
      name: player2.getName(),
      xo: player2.getXO(),
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    return (activePlayer =
      activePlayer === players[0] ? players[1] : players[0]);
  };

  const getActivePlayer = () => activePlayer;

  const checkWinner = (board) => {
    // Check rows
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] !== " " &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    // Check columns
    for (let j = 0; j < board.length; j++) {
      if (
        board[0][j] !== " " &&
        board[0][j] === board[1][j] &&
        board[0][j] === board[2][j]
      ) {
        return board[0][j];
      }
    }

    // Check diagonal
    if (
      board[0][0] !== " " &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return board[0][0];
    }

    // Check other diagonal
    if (
      board[0][2] !== " " &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      return board[0][2];
    }

    //Check for tie
      if (!board[0].includes(" ") && !board[1].includes(" ") && !board[2].includes(" ")) {
        return "tie";
      }
    

    // No winner
    return null;
    //   return false;
  };

  const playRound = (row, column) => {
    board[row][column] = activePlayer.xo;
    switchPlayerTurn();
    Gameboard.displayBoard();

    //Check winner and display winner name
    const winner = checkWinner(board);
    if (winner === "X") {
      for (let i = 0; i < players.length; i++) {
        if (players[i].xo === "X") {
          return console.log(`${players[i].name} wins!`);
        }
      }
    }
    if (winner === "O") {
      for (let i = 0; i < players.length; i++) {
        if (players[i].xo === "O") {
          return console.log(`${players[i].name} wins!`);
        }
      }
    }
    if (winner === "tie") {
      return console.log(`It's a tie. Try again`);
    }
  };
  return { getActivePlayer, playRound };
}

const andrew = Player("Andrew", "X");
const jerry = Player("Jerry", "O");
let game = GameController(andrew, jerry);