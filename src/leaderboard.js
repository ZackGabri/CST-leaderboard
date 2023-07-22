let leaderboardDiv, leaderboardTable;
let tableHead, tableHeadRow;
let tableBody;

/**
 * initalize the required variables, should be called before any of the other functions
 */
export function initalize() {
  leaderboardDiv = document.getElementById('leaderboard');
  leaderboardTable = document.createElement('table');
  leaderboardTable.className = 'leaderboardTable';

  tableHead = document.createElement('thead');
  tableHead.className = 'tableHead';

  tableBody = document.createElement('tbody');
  tableBody.className = 'tableBody';

  tableHeadRow = document.createElement('tr');
  tableHeadRow.className = 'tableHeaderRow';
}

/**
 * Adds the specificed headers to the leaderboard
 * @param {String[]} headers - The headers to add to the leaderboard
 */
export function setHeaders(headers) {
  headers;
  for (const header of headers) {
    let cell = document.createElement('th');
    cell.innerText = header;
    cell.classList.add('tableHeader', 'pointer');

    // sorting on click
    cell.addEventListener('click', (event) => {
      sort(event.target.cellIndex);
    });

    tableHeadRow.append(cell);
  }
}

let lastSortedBy, reverseSorting;
/**
 * sorts the leaderboard based on the given column index
 * for 0 it sorts player names alphabetically
 * and for everything else it sorts based on the current rating
 * requires finalize to be called
 * @param {Number} sortBy - the column index to sort by
 */
export function sort(sortBy) {
  // don't allow sorting by the first column (player names)
  // if (sortBy == 0) return;

  let tbody = leaderboardTable.tBodies[0];
  let rows = Array.from(tbody.rows);

  if (lastSortedBy == sortBy) {
    reverseSorting = !reverseSorting;
  } else {
    reverseSorting = false;
  }

  let sorted = rows.sort((a, b) => {
    // if it's the first column (player names) then sort alphabetically, otherwise compare ratings
    if (sortBy == 0) {
      return a.cells[sortBy].innerText.localeCompare(b.cells[sortBy].innerText);
    } else {
      let firstRating = a.cells[sortBy].innerText.split('/')[0].trim();
      let secondRating = b.cells[sortBy].innerText.split('/')[0].trim();
      return secondRating - firstRating;
    }
  });

  if (reverseSorting) {
    sorted.reverse();
  }

  // delete the elements then add them in the correct order
  for (const row of sorted) {
    tbody.removeChild(row);
    tbody.appendChild(row);
  }

  // update the sorting symbol to the correct state
  for (let cell of tableHeadRow.cells) {
    cell.classList.remove('asc', 'des');
    if (sortBy == cell.cellIndex) {
      cell.classList.add(reverseSorting ? 'des' : 'asc');
    }
  }
  lastSortedBy = sortBy;
}

/**
 * adds a player to the leaderboard
 * @param {Object} player - the player to add to the leaderboard, should be an object
 */
export function addPlayer(player) {
  let tableRow = document.createElement('tr');
  tableRow.className = 'leaderboardTableRow';

  let rank = document.createElement('td');
  rank.className = 'rank';

  let username = document.createElement('div');
  username.className = 'username';
  username.innerText = player.username;

  if (player.username != player.account) {
    let tooltiptext = document.createElement('span');
    tooltiptext.className = 'usernametooltip';
    tooltiptext.innerText = player.account;
    username.append(tooltiptext);
  }

  rank.append(username);

  let rapid = document.createElement('td');
  if (player.rapid.best == 0 && player.rapid.current == 0) {
    rapid.innerText = '?';
  } else {
    rapid.innerText = player.rapid.current + ' / ' + player.rapid.best;
  }

  let blitz = document.createElement('td');
  if (player.blitz.best == 0 && player.blitz.current == 0) {
    blitz.innerText = '?';
  } else {
    blitz.innerText = player.blitz.current + ' / ' + player.blitz.best;
  }

  let bullet = document.createElement('td');
  if (player.bullet.best == 0 && player.bullet.current == 0) {
    bullet.innerText = '?';
  } else {
    bullet.innerText = player.bullet.current + ' / ' + player.bullet.best;
  }

  let puzzles = document.createElement('td');
  if (player.puzzles.best == 0 && player.puzzles.current == 0) {
    puzzles.innerText = '?';
  } else {
    puzzles.innerText = player.puzzles.current + ' / ' + player.puzzles.best;
  }

  tableRow.append(rank, rapid, blitz, bullet, puzzles);
  tableBody.append(tableRow);
}

/**
 * adds the leaderboard elements to the document, should only be called once
 */
export function finalize() {
  tableHead.append(tableHeadRow);
  leaderboardTable.append(tableHead);
  leaderboardTable.append(tableBody);
  leaderboardDiv.append(leaderboardTable);
  document.querySelectorAll('.hide').forEach((element) => {
    element.classList.remove('hide');
  });
}
