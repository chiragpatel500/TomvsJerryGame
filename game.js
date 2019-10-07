//PART:1 MAP GENERATION

//OBSTACLE
const obstacle = '<img src="images/obstacle.png" alt""/>';

// WEAPONS
const weapons = [
  '<img class="weapon" src="images/paintballgun.png" data-damage="15" alt=""/>',
  '<img class="weapon" src="images/racket.png" data-damage="20" alt=""/>',
  '<img class="weapon" src="images/basebat.png" data-damage="25" alt=""/>'
];

// PLAYER OBJECTS
const players = [
  {
    id: 1,
    name: "Tom",
    avatar: '<img id="player1" src="images/tom.png" alt=""/>',
    shield: false,
    health: 100,
    weapon: {
      image:
        '<img class="weapon" src="images/defaultweapon.png" data-damage="10" alt=""/>',
      damage: 10,
      oldWeapon: ""
    },
    position: {
      col: 0,
      row: 0
    }
  },
  {
    id: 2,
    name: "Jerry",
    avatar: '<img id="player2" src="images/jerry.png" alt=""/>',
    shield: false,
    health: 100,
    weapon: {
      image:
        '<img class="weapon" src="images/defaultweapon.png" data-damage="10" alt=""/>',
      damage: 10,
      oldWeapon: ""
    },
    position: {
      col: 0,
      row: 0
    }
  }
];

// FUNCTION TO GENERATE GAME MAP
const mapGenerator = () => {
  let column = 0;
  let row = 1;

  for (let i = 0; i < 81; i++) {
    column++;
    $("#map").append(`<div data-col="${column}" data-row="${row}"></div>`);

    if (column === 9) {
      row++;
      column = 0;
    }
  }
};

//THIS CALLING ACTUALLY GENERATES  A GAME MAP
mapGenerator();

//GRID SQUARE ARRAY which will convert  gridquare to an array.
const gridSquares = $("#map>div").toArray();

//FUNCTION WHICH RANDOMLY SELECTS GRID SQUARE AND PUTS OBSTCALES ON IT
function generateObstacle() {
  const randomSquare =
    gridSquares[Math.floor(Math.random() * gridSquares.length)];

  // IF THE CHOSEN SQUARE IS NOT FULL OR DIAGONAL TO ANOTHER OBSTACLE
  if (
    !randomSquare.classList.contains("full") &&
    !$(
      `[data-row="${Number(randomSquare.dataset.row) - 1}"][data-col="${Number(
        randomSquare.dataset.col
      ) + 1}"]`
    ).hasClass("full")
  ) {
    // FILL THE SQUARE AND GIVE IT A CLASS OF "full"
    randomSquare.innerHTML = obstacle;
    randomSquare.classList.add("full");
  } else {
    //OTHERWISE RERUN THE FUNCTION
    generateObstacle();
  }
}
//FUNCTION WHICH RAMDOMLY SELECTS GRID SQUARE AND  PUTS WEAPONS ON IT
function generateWeapons(index) {
  const randomSquare =
    gridSquares[Math.floor(Math.random() * gridSquares.length)];

  if (
    // IF THE CHOSEN SQUARE IS NOT FULL
    !randomSquare.classList.contains("full") &&
    !$(
      `[data-row="${Number(randomSquare.dataset.row) - 1}"][data-col="${Number(
        randomSquare.dataset.col
      ) + 1}"]`
    ).hasClass("full")
  ) {
    // FILLS THE SQUARES WITH WEAPONS
    randomSquare.innerHTML = weapons[index];
  } else {
    // OTHERWISE RERUN FUNCTION
    generateWeapons(index);
  }
}

//FUNCTION WHICH RAMDONLY SELECTS GRID SQUARE AND PUTS A PLAYER ON IT
function generatePlayers(index) {
  const randomSquare =
    gridSquares[Math.floor(Math.random() * gridSquares.length)];

  if (
    // IF THE CHOSEN SQURE IS NOT FULL
    !randomSquare.classList.contains("full") &&
    !$(
      `[data-row="${Number(randomSquare.dataset.row) - 1}"][data-col="${Number(
        randomSquare.dataset.col
      ) + 1}"]`
    ).hasClass("full")
  ) {
    // PLACE  PLAYER 1 AND GIVE IT CLASS "FULL"
    randomSquare.innerHTML = players[index].avatar;
    randomSquare.classList.add("full");
    //ASSIGN CURRENT POSITION TO  PLAYER OBJECT
    players[index].position.col = randomSquare.dataset.col;
    players[index].position.row = randomSquare.dataset.row;
  } else {
    //OTHERWISE RERUN THE FUNCTION
    generatePlayers(index);
  }
}

let currentPlayer = players[0].id;

//PART:2 PLAYER MOVEMENTS

//FUNCTION TO SHOW POSSIBLE PLAYER MOVES
const playerMovement = {
  north: function(player) {
    //CREATE CONST FOR 3 SQUARES NORTH OF PLAYER
    const north1 = Number(player.position.row) - 1;
    const north2 = Number(player.position.row) - 2;
    const north3 = Number(player.position.row) - 3;

    // IF THE CLOSEST SQUARE IS NOT FULL, HIGHLIGHT IT AND PROCEED TO NEXT MOVE
    if (
      !$(`[data-row="${north1}"][data-col="${player.position.col}"]`).hasClass(
        "full"
      )
    ) {
      $(`[data-row="${north1}"][data-col="${player.position.col}"]`).addClass(
        "highlight"
      );

      if (
        !$(
          `[data-row="${north2}"][data-col="${player.position.col}"]`
        ).hasClass("full")
      ) {
        $(`[data-row="${north2}"][data-col="${player.position.col}"]`).addClass(
          "highlight"
        );

        if (
          !$(
            `[data-row="${north3}"][data-col="${player.position.col}"]`
          ).hasClass("full")
        ) {
          $(
            `[data-row="${north3}"][data-col="${player.position.col}"]`
          ).addClass("highlight");
        }
      }
    }
  },
  //CREATE CONST FOR 3 SQUARES SOUTH OF PLAYER
  south: function(player) {
    const south1 = Number(player.position.row) + 1;
    const south2 = Number(player.position.row) + 2;
    const south3 = Number(player.position.row) + 3;

    // IF THE CLOSEST SQUARE IS NOT FULL, HIGHLIGHT IT AND PROCEED TO NEXT MOVE
    if (
      !$(`[data-row="${south1}"][data-col="${player.position.col}"]`).hasClass(
        "full"
      )
    ) {
      $(`[data-row="${south1}"][data-col="${player.position.col}"]`).addClass(
        "highlight"
      );

      if (
        !$(
          `[data-row="${south2}"][data-col="${player.position.col}"]`
        ).hasClass("full")
      ) {
        $(`[data-row="${south2}"][data-col="${player.position.col}"]`).addClass(
          "highlight"
        );

        if (
          !$(
            `[data-row="${south3}"][data-col="${player.position.col}"]`
          ).hasClass("full")
        ) {
          $(
            `[data-row="${south3}"][data-col="${player.position.col}"]`
          ).addClass("highlight");
        }
      }
    }
  },
  //CREATE CONST FOR 3 SQUARES WEST OF PLAYER
  west: function(player) {
    const west1 = Number(player.position.col) - 1;
    const west2 = Number(player.position.col) - 2;
    const west3 = Number(player.position.col) - 3;

    // IF THE CLOSEST SQUARE IS NOT FULL, HIGHLIGHT IT AND PROCEED TO NEXT MOVE
    if (
      !$(`[data-col="${west1}"][data-row="${player.position.row}"]`).hasClass(
        "full"
      )
    ) {
      $(`[data-col="${west1}"][data-row="${player.position.row}"]`).addClass(
        "highlight"
      );

      if (
        !$(`[data-col="${west2}"][data-row="${player.position.row}"]`).hasClass(
          "full"
        )
      ) {
        $(`[data-col="${west2}"][data-row="${player.position.row}"]`).addClass(
          "highlight"
        );

        if (
          !$(
            `[data-col="${west3}"][data-row="${player.position.row}"]`
          ).hasClass("full")
        ) {
          $(
            `[data-col="${west3}"][data-row="${player.position.row}"]`
          ).addClass("highlight");
        }
      }
    }
  },

  //CREATE CONST FOR 3 SQUARES EAST OF PLAYER
  east: function(player) {
    const east1 = Number(player.position.col) + 1;
    const east2 = Number(player.position.col) + 2;
    const east3 = Number(player.position.col) + 3;

    // IF THE CLOSEST SQUARE IS NOT FULL, HIGHLIGHT IT AND PROCEED TO NEXT MOVE
    if (
      !$(`[data-col="${east1}"][data-row="${player.position.row}"]`).hasClass(
        "full"
      )
    ) {
      $(`[data-col="${east1}"][data-row="${player.position.row}"]`).addClass(
        "highlight"
      );

      if (
        !$(`[data-col="${east2}"][data-row="${player.position.row}"]`).hasClass(
          "full"
        )
      ) {
        $(`[data-col="${east2}"][data-row="${player.position.row}"]`).addClass(
          "highlight"
        );

        if (
          !$(
            `[data-col="${east3}"][data-row="${player.position.row}"]`
          ).hasClass("full")
        ) {
          $(
            `[data-col="${east3}"][data-row="${player.position.row}"]`
          ).addClass("highlight");
        }
      }
    }
  },
  // ON PLAYER 1 MOUSE OVER, HIGHTLIGHT FUNCTION RUNS FOR PLAYER 1
  showPlayerMoves1: function() {
    playerMovement.north(players[0]);
    playerMovement.south(players[0]);
    playerMovement.west(players[0]);
    playerMovement.east(players[0]);

    //ENABLE HIGHLIGHTED SQUARES TO BE CLICKED
    $(".highlight").on("click", function() {
      playerMovement.movePlayer.call(this, players[0]);
    });
  },

  // // ON PLAYER 2 MOUSE OVER, HIGHTLIGHT FUNCTION RUNS FOR PLAYER 2
  showPlayerMoves2: function() {
    playerMovement.north(players[1]);
    playerMovement.south(players[1]);
    playerMovement.west(players[1]);
    playerMovement.east(players[1]);
    //ENABLE HIGHLIGHTED SQUARES TO BE CLICKED
    $(".highlight").on("click", function() {
      playerMovement.movePlayer.call(this, players[1]);
    });
  },

  // ON HIGHLIGHT CLICK, MOVE PLAYER/UPDATE WEAPON
  movePlayer: function(player) {
    if ($(this).hasClass("highlight")) {
      // REMOVE OLD PLAYER IMAGE AND LEAVE OLD WEAPON IN PREVIOUS SQUARE
      if (player.id == players[0].id) {
        $("img#player1")
          .parent()
          .append(player.weapon.oldWeapon);
        player.weapon.oldWeapon = "";
        $("img#player1").remove();
      } else {
        $("img#player2")
          .parent()
          .append(player.weapon.oldWeapon);
        player.weapon.oldWeapon = "";
        $("img#player2").remove();
      }

      $(
        `[data-col="${player.position.col}"][data-row="${player.position.row}"]`
      ).removeClass("full");

      // PLACE PLAYER IMAGE IN NEW LOCATION + UPDATE CLASS OF "FULL"
      $(this).prepend(player.avatar);
      $(this).addClass("full");

      // IF WEAPON IN GRID, SWAP WEAPONS AND UPDATE PLAYER PANEL
      if (
        $(this)
          .children()
          .is("img.weapon")
      ) {
        player.weapon.oldWeapon = player.weapon.image;
        player.weapon.damage = Number(
          $(this)
            .children("img.weapon")
            .data("damage")
        );

        player.weapon.image = `<img class="weapon" src="${$(this)
          .children("img.weapon")
          .attr("src")}" data-damage="${player.weapon.damage}" alt="" />`;

        $("#weapon" + player.id).html(player.weapon.image);
        $("#attack" + player.id).html(player.weapon.damage);

        $(this)
          .children(".weapon")
          .remove();
      }

      // UPDATE PLAYER POSITION
      player.position.col = this.dataset.col;
      player.position.row = this.dataset.row;

      // REMOVE HIGHLIGHT CLASS, DISABLING "CLICK" LISTENER
      $("#map > div").removeClass("highlight");
      $("#map > div").off("click");

      // MOVE ON TO DETECT BATTLE FUNCTION
      setTimeout(gameTurn.detectBattle, 500);
    }
  }
};

//PART:3  FIGHT

const gameTurn = {
  //START TURN BY ENABLING LISTENER FOR PLAYER MOVEMENT OBJECT FOR CURRENT PLAYER
  detectTurn: function() {
    console.log("fired DetectTurn func");
    console.log("currentPlayer", currentPlayer);

    //REMOVE CURRENTPLAYER PANEL HIGHLIGHT
    $("aside").removeClass("currentPlayer");
    if (currentPlayer == 1) {
      $(".tom").addClass("currentPlayer");
      $("#player1").mouseenter(playerMovement.showPlayerMoves1);
    } else {
      $(".jerry").addClass("currentPlayer");
      $("#player2").mouseenter(playerMovement.showPlayerMoves2);
    }
  },
  // FUNCTION WHICH DETECTS BATTLE BETWEEN BOTH PLAYERS.
  detectBattle: function() {
    console.log("detectBattle", "fired");
    const columnDif = players[0].position.col - players[1].position.col;
    const rowDif = players[0].position.row - players[1].position.row;

    if (
      (players[0].position.col == players[1].position.col &&
        (rowDif == -1 || rowDif == +1)) ||
      (players[0].position.row == players[1].position.row &&
        (columnDif == -1 || columnDif == +1))
    ) {
      // PLAYER 1 TURN
      if (currentPlayer == 1) {
        // IF PLAYER 2 DOES NOT HAVE SHIELD
        if (players[1].shield == false) {
          players[1].health == players[1].health - players[0].weapon.damage;
          $("#health2").html(players[1].health);
          // CHECK FOR DEFEAT BEFORE RETALIATION
          if (players[1].health <= 0) {
            setTimeout(gameOver, 800);
          } else {
            //RETALIATE
            players[0].health = players[0].health - players[1].weapon.damage;
            $("#health1").html(players[0].health);
          } // IF PLAYER 2 HAS SHEILD
        } else if (players[1].shield == true) {
          players[1].health = players[1].health - players[0].weapon.damage / 2;
          $("#health2").html(players[1].health);
        }
      } // PLAYER 2 TURN
      else {
        // IF PLAYER 1 DOES NOT HAVE SHIELD
        if (players[0].shield == false) {
          players[0].health == players[0].health - players[1].weapon.damage;
          $("#health1").html(players[0].health);
          // CHECK FOR DEFEAT BEFORE RETALIATION
          if (players[0].health <= 0) {
            setTimeout(gameOver, 800);
          } else {
            //RETALIATE
            players[1].health = players[1].health - players[0].weapon.damage;
            $("#health2").html(players[1].health);
          }
          // IF PLAYER 1 HAS SHEILD
        } else if (players[0].shield == true) {
          players[0].health = players[0].health - players[1].weapon.damage / 2;
          $("#health1").html(players[0].health);
        }
      }
      //CHECK FOR PLAYER DEFEAT
      if (players[0].health <= 0 || players[1].health <= 0) {
        setTimeout(gameOver, 800);
      } else {
        // IF NO ONE IS DEFEATED AS A RESULT OF SHEILDS.
        setTimeout(gameTurn.shieldStatus, 800);
      }
    } else {
      // IF NO ONE IS TOUCHING EACH OTHER AS A RESULT OF SHEILD
      setTimeout(gameTurn.shieldStatus, 800);
    }
  },
  //FUNCTION FOR SHIELDS
  shieldStatus: function() {
    $("#shieldModal").css("display", "block");
    $(".shieldBtn").on("click", function() {
      if ($(this).data("status") === "up") {
        players[currentPlayer - 1].shield = true;
        $("#shield" + currentPlayer).html("UP");
      } else {
        players[currentPlayer - 1].shield = false;
        $("#shield" + currentPlayer).html("DOWN");
      }

      $(".shieldBtn").off();
      $("#shieldModal").css("display", "none");

      setTimeout(gameTurn.changeTurn, 800);
    });
  },
  // FUNCTION FOR CHANGING TURNS - CURRENT PLAYER
  changeTurn: function() {
    console.log("fired ChangeTurn func");
    if (currentPlayer == 1) {
      currentPlayer = 2;
    } else {
      currentPlayer = 1;
    }
    setTimeout(gameTurn.detectTurn, 600);
  }
};

//GAMEOVER FUNCTION
function gameOver() {
  let winner = "Draw";
  if (players[0].health <= 0) {
    winner = players[1].name;
  } else if (players[1].health <= 0) {
    winner = players[0].name;
  }

  $("#winner").html(winner);
  $("#gameModal").css("display", "block");

  $("#closeModal").on("click", function() {
    $("#gameModal").css("display", "none");
  });
}
//NEWGAME FUNCTION
function newGame() {
  $("#map>div").empty();
  $("#map>div").removeClass("full highlight");

  $("#health1").text("100");
  $("#health2").text("100");
  $("#shield1").text("down");
  $("#shield2").text("down");
  $("#attack1").text(players[0].weapon.damage);
  $("#attack2").text(players[1].weapon.damage);
  $("#weapon1").html(players[0].weapon.image);
  $("#weapon2").html(players[1].weapon.image);

  for (let count = 0; count <= 14; count++) {
    generateObstacle();
  }

  generatePlayers(0);
  generatePlayers(1);

  generateWeapons(0);
  generateWeapons(1);
  generateWeapons(2);

  gameTurn.detectTurn();
}

$("#newGame").on("click", newGame);

//DISPLAYING RULES WHILE CLICKING ON RULES BUTTON
$("#rules").on("click", function() {
  $("#rulesModal").css("display", "block");
});

//CLOSE THE RULES BOX ON CLOSING RULES BOX
$("#closeRules").on("click", function() {
  $("#rulesModal").css("display", "none");
});
