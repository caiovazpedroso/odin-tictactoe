const Gameboard =  (() => {
  function newBoard() {
    const newBoard = []
    for (let i = 0; i < 9; i++) { newBoard.push(null) }
    return newBoard
  }
  let currentBoard = ( newBoard() );
  function getBoard() { return currentBoard }
  function addMove(spot, player) {
    currentBoard[spot] = player.getIndex();
  }
  function resetBoard() { currentBoard = newBoard() }
  return {
    resetBoard,
    getBoard,
    addMove
  }
})();

const GameDirector = (() => {
  function playerFactory(index){
    let currentPicks = (() => {
      const newBoard = []
      return newBoard
    })();
    return {
      getName() {return `Player ${this.getIndex() + 1}`},
      getPicks() { return currentPicks },
      addPick(spot) { currentPicks.push(spot) },
      getIndex() { return index },
      resetPicks() { currentPicks = []}
    }
  }

  const players = [
    playerFactory(0),
    playerFactory(1)
  ]

  const winConditions = [ 
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
  ];

  let allowedPlayerIndex = 0;
  function makeMove(spot, player){
    if (player.getIndex() !== allowedPlayerIndex) {console.log("Illegal move: Not your turn"); return}
    if (Gameboard.getBoard()[spot]!== null) {console.log("Illegal move: Space occupied"); return}
    Gameboard.addMove(spot,player)
    player.addPick(spot)
    if (checkWin(player)) {return}
    if (checkTie()) {return}
    allowedPlayerIndex = 1 - allowedPlayerIndex;
  };

  function checkWin(player){
    const isSubset = (array1, array2) => {
      return array2.every((element) => array1.includes(element));
    };
    const sortedPlayer = player.getPicks().toSorted();
    for (const x of winConditions) {
      if (isSubset(sortedPlayer, x)){
        alert(`${player.getName()} has won.`)
        resetGame()
        return true
      }
    }
    return false
  };

  function checkTie(){
    if (!Gameboard.getBoard().includes(null)) {
      alert(`Game is a tie.`)
      resetGame()
      return true
    }
    return false
  };

  function resetGame(){
    Gameboard.resetBoard()
    for (const p of players) {p.resetPicks()}
    allowedPlayerIndex = 0
  };
  
  return {
    players,
    resetGame,
    makeMove
  }
})();