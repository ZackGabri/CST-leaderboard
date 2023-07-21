import { getRatings } from "./script.js";

let boardDiv = document.getElementById("leaderboard");
let headers = ["Player", "Rapid", "Blitz", "Bullet", "Puzzles"];

let leaderboardTable = document.createElement("table");
leaderboardTable.className = "leaderboardTable"

let tableHead = document.createElement("thead");
tableHead.className = "tableHead"

let tableHeadRow = document.createElement("tr");
tableHeadRow.className = "tableHeaderRow"



for (const header of headers) {
  let cell = document.createElement("th");
  cell.innerText = header;
  cell.classList.add("tableHeader", "pointer");

  // sorting on click
  cell.addEventListener('click', (event) => {
    sortTable(event.target.cellIndex);
  });

  tableHeadRow.append(cell);
}

let lastSortedBy;
let reverseSorting;
function sortTable(sortBy) {
  // don't allow sorting by the first column, aka player names
  // if (sortBy == 0) return;

  let tbody = leaderboardTable.tBodies[0];
  let rows = Array.from(tbody.rows);

  if (lastSortedBy == sortBy) {
    reverseSorting = !reverseSorting;
  } else {
    reverseSorting = false;
  }

  let sorted = rows.sort((a, b) => {
    let firstRating = a.cells[sortBy].innerText.split("/")[0].trim();
    let secondRating = b.cells[sortBy].innerText.split("/")[0].trim();

    if (sortBy == 0) {
      return a.cells[sortBy].innerText.localeCompare(b.cells[sortBy].innerText)
    } else {
      return secondRating - firstRating;
    }
  });

  if (reverseSorting) {
    sorted.reverse();
  }

  for (const row of sorted) {
    // delete the elements then add them in the correct order
    tbody.removeChild(row);
    tbody.appendChild(row);
  }

  for (let cell of tableHeadRow.cells) {
    cell.classList.remove("asc", "des");
    if (sortBy == cell.cellIndex) {
      cell.classList.add(reverseSorting ? "des" : "asc");
    }
  }
  lastSortedBy = sortBy;
}

tableHead.append(tableHeadRow);
leaderboardTable.append(tableHead);

let tableBody = document.createElement("tbody");
tableBody.className = "tableBody";
leaderboardTable.append(tableBody);

getRatings().then((players) => {
  for (const player of players) {
    let tableRow = document.createElement("tr");
    tableRow.className = "leaderboardTableRow";

    let rank = document.createElement("td");
    rank.className = "rank";

    let username = document.createElement("div");
    username.className = "username";
    username.innerText = player.username;

    if (player.username != player.account) {
      let tooltiptext = document.createElement("span");
      tooltiptext.className = "usernametooltip";
      tooltiptext.innerText = player.account;
      username.append(tooltiptext);
    }

    rank.append(username);

    let rapid = document.createElement("td");
    if (player.rapid.best == 0 && player.rapid.current == 0) {
      rapid.innerText = "?";
    } else { 
      rapid.innerText = player.rapid.current + " / " + player.rapid.best;
    }
    
    let blitz = document.createElement("td");
    if (player.blitz.best == 0 && player.blitz.current == 0) {
      blitz.innerText = "?";
    } else {
      blitz.innerText = player.blitz.current + " / " + player.blitz.best;
    }

    let bullet = document.createElement("td");
    if (player.bullet.best == 0 && player.bullet.current == 0) {
      bullet.innerText = "?";
    } else {
      bullet.innerText = player.bullet.current + " / " + player.bullet.best;
    }

    let puzzles = document.createElement("td");
    if (player.puzzles.best == 0 && player.puzzles.current == 0) {
      puzzles.innerText = "?";
    } else {
      puzzles.innerText = player.puzzles.current + " / " + player.puzzles.best;
    }

    tableRow.append(rank, rapid, blitz, bullet, puzzles);
    tableBody.append(tableRow);
  }

  sortTable(1);
  document.querySelector("#loading").style.display = "none";
  document.querySelector(".hide").style.display = "block";
});

boardDiv.append(leaderboardTable);