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
    let score = 0;
    return {
      getName() { return `Player ${this.getIndex() + 1}` },
      getPicks() { return currentPicks },
      addPick(spot) { currentPicks.push(spot) },
      getIndex() { return index },
      resetPicks() { currentPicks = [] },
      getSymbol() {if (getIndex() === 0) return "X"; else return "O"},
      getScore() {return score},
      addWin() {score += 1}
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
    if (player.getIndex() !== currentPlayerIndex) {DisplayController.openGameDialog("Illegal move: Not your turn"); return}
    if (Gameboard.getBoard()[spot]!== null) {DisplayController.openGameDialog("Illegal move: Space occupied"); return}
    Gameboard.addMove(spot,player)
    player.addPick(spot)    
    heartbeat()
  };

  function checkWin(player){
    const isSubset = (array1, array2) => {
      return array2.every((element) => array1.includes(element));
    };
    const sortedPlayer = player.getPicks().toSorted();
    for (const x of winConditions) {
      if (isSubset(sortedPlayer, x)){
        player.addWin()
        DisplayController.openGameDialog(`${player.getName()} has won.`)
        resetGame()
        return true
      }
    }
    return false
  };

  function checkTie(){
    if (!Gameboard.getBoard().includes(null)) {
      DisplayController.openGameDialog(`Game is a tie.`)
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

  function heartbeat(){
    DisplayController.renderBoard()
    if (checkTie()) return
    if (checkWin(players[currentPlayerIndex])) return
    currentPlayerIndex = 1 - currentPlayerIndex;
  }

  function resetGame(){
    Gameboard.resetBoard()
    for (const p of getPlayers()) {p.resetPicks()}
    currentPlayerIndex = 0
    DisplayController.renderBoard()
    DisplayController.updateScore()
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
    dialogBox: document.querySelector("#dialog-box"),
    dialogText: document.querySelector("#dialog-text"),
    dialogClose: document.querySelector("#dialog-close"),
    gameBox: document.querySelector("#game-box"),
    playerDisplay: document.querySelector("#player-display"),
    playerOneScore: document.querySelector("#player-one-score"),
    playerTwoScore: document.querySelector("#player-two-score"),
    changeNameOne: document.querySelector("#change-name-one"),
    changeNameTwo: document.querySelector("#change-name-two"),
    dialogOne: document.querySelector("#dialog-one"),
    dialogTwo: document.querySelector("#dialog-two"),
  }

  UI.dialogClose.addEventListener("click", () => UI.dialogBox.close());
  UI.changeNameOne.addEventListener("click", () => UI.dialogOne.showModal());
  UI.changeNameTwo.addEventListener("click", () => UI.dialogTwo.showModal());

  function renderBoard(){
    UI.gameBox.textContent = ''
    for (let i = 0; i < Gameboard.getBoard().length; i++){
      let element = Gameboard.getBoard()[i]
      let newSpot = document.createElement("div");
      if (element === null) {
        newSpot.classList.add("empty-spot")
      } 
      else if (element === 0) {
        newSpot.classList.add("player-one")
        newSpot.textContent = "X"
      }
      else if (element === 1) {
        newSpot.classList.add("player-two")
        newSpot.textContent = "O"
      }    
      newSpot.addEventListener("mouseenter", () => {
        if (newSpot.className === "empty-spot") {
          newSpot.classList.remove("empty-spot")
          if (GameController.getCurrentPlayerIndex() === 0) {
            newSpot.classList.add("hover-player-one")
            newSpot.textContent = "X"
            newSpot.style.opacity = 0.2
          } else {
            newSpot.classList.add("hover-player-two")
            newSpot.textContent = "O"
            newSpot.style.opacity = 0.2
          }
        //newSpot.textContent = `Player ${GameController.getCurrentPlayerIndex()}`
        }
      })
      newSpot.addEventListener("mouseleave", () => {
        if (newSpot.className === "hover-player-one" | newSpot.className === "hover-player-two") {
          newSpot.textContent = ''
          newSpot.classList.remove("hover-player-one")
          newSpot.classList.remove("hover-player-two")
          newSpot.classList.add("empty-spot")
          newSpot.style.opacity = 1
        }
        //newSpot.textContent = ''
      })
      newSpot.addEventListener("click", () => {
        GameController.makeMove(i, GameController.getPlayers()[GameController.getCurrentPlayerIndex()])
      })
      UI.gameBox.append(newSpot)
    }
    UI.playerDisplay.textContent = `Player ${GameController.getCurrentPlayerIndex() + 1}`
  }

  function openGameDialog(text){
    UI.dialogText.textContent = text
    UI.dialogBox.showModal()
  }

  function updateScore(){
    UI.playerOneScore.textContent = GameController.getPlayers()[0].getScore(),
    UI.playerTwoScore.textContent = GameController.getPlayers()[1].getScore()
  }

  
  
  renderBoard()
  
  return {
    updateScore,
    openGameDialog,
    renderBoard,
  }
})();
