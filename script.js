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

const GameController = (() => {
  function createPlayer(index){
    let currentPicks = (() => {
      const newBoard = []
      return newBoard
    })();
    return {
      getName() { return `Player ${this.getIndex() + 1}` },
      getPicks() { return currentPicks },
      addPick(spot) { currentPicks.push(spot) },
      getIndex() { return index },
      resetPicks() { currentPicks = [] }
    }
  }

  const players = [
    createPlayer(0),
    createPlayer(1)
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

  let currentPlayerIndex = 0;
  function makeMove(spot, player){
    console.log(`makeMove start${currentPlayerIndex}`)
    if (player.getIndex() !== currentPlayerIndex) {console.log("Illegal move: Not your turn"); return}
    if (Gameboard.getBoard()[spot]!== null) {console.log("Illegal move: Space occupied"); return}
    currentPlayerIndex = 1 - currentPlayerIndex;
    console.log(`makeMove mid${currentPlayerIndex}`)
    Gameboard.addMove(spot,player)
    player.addPick(spot)
    if (checkWin(player)) {return}
    if (checkTie()) {return}
    DisplayController.renderBoard()
    console.log("oi",spot,player.getIndex(), currentPlayerIndex)
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

  function getCurrentPlayerIndex(){
    return currentPlayerIndex
  }

  function getPlayers(){
    return players
  }

  function resetGame(){
    Gameboard.resetBoard()
    for (const p of getPlayers()) {p.resetPicks()}
    currentPlayerIndex = 0
    DisplayController.renderBoard()
  };

  return {
    getCurrentPlayerIndex,
    getPlayers,
    resetGame,
    makeMove
  }
})();

const DisplayController = (() => {
  const UI = {
    gameBox: document.querySelector("#game-box"),
    playerDisplay: document.querySelector("#player-display"),
  }

  function renderBoard(){
    UI.gameBox.textContent = ''
    for (let i = 0; i < Gameboard.getBoard().length; i++){
      console.log(`Player index ${GameController.getCurrentPlayerIndex()}`)
      let element = Gameboard.getBoard()[i]
      let newSpot = document.createElement("div");
      if (element === null) {
        newSpot.classList.add("empty-spot")
      } 
      else if (element === 0) {
        newSpot.classList.add("player-one")
      }
      else if (element === 1) {
        newSpot.classList.add("player-two")
      }           
      
      console.log(`render loop index ${i}`)
      newSpot.addEventListener("click", () => {
        GameController.makeMove(i, GameController.getPlayers()[GameController.getCurrentPlayerIndex()])
      })
      UI.gameBox.append(newSpot)
    }
    UI.playerDisplay.textContent = `Player ${GameController.getCurrentPlayerIndex() + 1}`
  }

  function updateBoard(){

  }

  return {
    UI,
    renderBoard,
  }
})();

DisplayController.renderBoard()