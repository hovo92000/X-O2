window.onload = () => {
  let section1;
  let section2;
  let buttonX;
  let buttonPlay;
  let buttonO;
  let buttonRestart;
  let mainStatus;
  let status;
  let boxes;
  section1 = document.createElement("section");
  section1.id = `section1`;

  buttonX = document.createElement("div");
  buttonX.id = `buttonX`;
  buttonX.innerHTML = "X";
  section1.appendChild(buttonX);

  buttonPlay = document.createElement("div");
  buttonPlay.id = `buttonPlay`;
  buttonPlay.innerHTML = "PLAY";
  section1.appendChild(buttonPlay);

  buttonO = document.createElement("div");
  buttonO.id = `buttonO`;
  buttonO.innerHTML = "O";
  section1.appendChild(buttonO);

  document.body.appendChild(section1);
  section2 = document.createElement("section");
  section2.id = `section2`;
  section2.classList = "main";
  for (let i = 0; i < 9; i++) {
    boxes = document.createElement("div");
    boxes.classList = `boxes`;
    boxes.id = `box${i}`;
    section2.appendChild(boxes);
  }

  mainStatus = document.createElement("div");
  mainStatus.id = `divForGameStatus`;

  status = document.createElement("h2");
  status.id = `gameStatus`;
  mainStatus.appendChild(status);

  buttonRestart = document.createElement("button");
  buttonRestart.id = `buttonRestart`;
  buttonRestart.innerHTML = "RESTART GAME";
  mainStatus.appendChild(buttonRestart);

  document.body.appendChild(section2);
  document.body.appendChild(mainStatus);

  let allBoxes = document.querySelectorAll("#section2 div");
  let gameActive = true;
  let gameRestart = document.querySelector("button");
  let gameStatus = document.getElementById("gameStatus");
  let win = false;
  function createElements() {
    let count = 1;
    for (let i = 0; i < allBoxes.length; i++) {
      allBoxes[i].onclick = function () {
        if (this.innerHTML === "X" || this.innerHTML === "O") {
          return;
        }
        if (gameActive) {
          this.innerHTML = "X";
          count++;
          winMessage();
        } else {
          this.innerHTML = "O";
          winMessage();
        }
        if (win) {
          gameStop();
        }
        if (count === 6 && win === false) {
          for (let i = 0; i < allBoxes.length; i++) {
            allBoxes[i].style.backgroundColor = "aqua";
          }
          gameStatus.innerHTML = drawMessage();
          gameStop();
        }
        let indices = new Array();
        let index = 0;
        for (let i = 0; i < 9; i++) {
          if (allBoxes[i].innerHTML === "") {
            indices[index++] = i;
          }
        }
        let toAdd = Math.floor(Math.random() * indices.length);
        if (gameActive === true) {
          allBoxes[indices[toAdd]].innerHTML = "O";
          winMessageForRandoom();
        } else if (gameActive === false) {
          allBoxes[indices[toAdd]].innerHTML = "X";
          count++;
          if (count === 5 && win === false) {
            gameStatus.innerHTML = drawMessage();
          }
          winMessageForRandoom();
        }
      };
    }
  }
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function winMessageForRandoom() {
    for (let i = 0; i < winningConditions.length; i++) {
      if (
        allBoxes[winningConditions[i][0]].innerHTML === "X" &&
        allBoxes[winningConditions[i][1]].innerHTML === "X" &&
        allBoxes[winningConditions[i][2]].innerHTML === "X"
      ) {
        allBoxes[winningConditions[i][0]].style.backgroundColor = "red";
        allBoxes[winningConditions[i][1]].style.backgroundColor = "red";
        allBoxes[winningConditions[i][2]].style.backgroundColor = "red";
        gameStatus.innerHTML = winMessageForX();
        win = true;
        gameStop();
      }
      if (
        allBoxes[winningConditions[i][0]].innerHTML === "O" &&
        allBoxes[winningConditions[i][1]].innerHTML === "O" &&
        allBoxes[winningConditions[i][2]].innerHTML === "O"
      ) {
        allBoxes[winningConditions[i][0]].style.backgroundColor = "red";
        allBoxes[winningConditions[i][1]].style.backgroundColor = "red";
        allBoxes[winningConditions[i][2]].style.backgroundColor = "red";
        gameStatus.innerHTML = winMessageForO();
        win = true;
        gameStop();
      }
    }
  }

  function winMessage() {
    for (let i = 0; i < winningConditions.length; i++) {
      if (
        allBoxes[winningConditions[i][0]].innerHTML === "X" &&
        allBoxes[winningConditions[i][1]].innerHTML === "X" &&
        allBoxes[winningConditions[i][2]].innerHTML === "X"
      ) {
        allBoxes[winningConditions[i][0]].style.backgroundColor = "green";
        allBoxes[winningConditions[i][1]].style.backgroundColor = "green";
        allBoxes[winningConditions[i][2]].style.backgroundColor = "green";
        gameStatus.innerHTML = winMessageForX();
        win = true;
        gameStop();
      }
      if (
        allBoxes[winningConditions[i][0]].innerHTML === "O" &&
        allBoxes[winningConditions[i][1]].innerHTML === "O" &&
        allBoxes[winningConditions[i][2]].innerHTML === "O"
      ) {
        allBoxes[winningConditions[i][0]].style.backgroundColor = "green";
        allBoxes[winningConditions[i][1]].style.backgroundColor = "green";
        allBoxes[winningConditions[i][2]].style.backgroundColor = "green";
        gameStatus.innerHTML = winMessageForO();
        win = true;
        gameStop();
      }
    }
  }
  function gameStop() {
    gameActive = null;
    mySymbol = "";
    for (let i = 0; i < allBoxes.length; i++) {
      allBoxes[i].onclick = false;
    }
  }

  gameRestart.onclick = function () {
    for (let i = 0; i < allBoxes.length; i++) {
      allBoxes[i].innerHTML = "";
      allBoxes[i].style.backgroundColor = "rgb(209, 209, 0)";
      allBoxes[i].style.pointerEvents = "none";
    }
    win = false;
    gameActive = true;
    gameStatus.innerHTML = "";
    mySymbol = "";
    createElements();
    buttonX.style.pointerEvents = "painted";
    buttonO.style.pointerEvents = "painted";
  };
  const winMessageForX = () => `Player X has won!`;
  const drawMessage = () => `DRAW`;
  const winMessageForO = () => `Player O has won!`;

  let mySymbol = "";
  buttonX.onclick = function () {
    mySymbol = "X";
    gameActive = true;
    buttonX.style.backgroundColor = "rgb(110, 184, 0)";
    if (mySymbol === "X") {
      buttonO.style.backgroundColor = "rgb(173, 255, 47)";
    }
  };
  buttonO.onclick = function () {
    mySymbol = "O";
    gameActive = false;
    buttonO.style.backgroundColor = "rgb(110, 184, 0)";
    if (mySymbol === "O") {
      buttonX.style.backgroundColor = "rgb(173, 255, 47)";
    }
  };
  buttonPlay.onclick = function () {
    if (mySymbol === "O") {
      boxes.innerHTML = "X";
    }
    if (mySymbol === "X" || mySymbol === "O") {
      buttonX.style.pointerEvents = "none";
      buttonO.style.pointerEvents = "none";
      buttonX.style.backgroundColor = "rgb(173, 255, 47)";
      buttonO.style.backgroundColor = "rgb(173, 255, 47)";
      createElements();
      for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.pointerEvents = "painted";
      }
    }
  };
};




//popoxakani anunner
//funqcianers piti 1 hat sarqem u meji 2 ktor@ 1 ktor sarqem

