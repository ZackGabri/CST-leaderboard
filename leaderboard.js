let boardDiv = document.getElementById("leaderboard");
let headers = ["Player", "Rapid", "Blitz", "Bullet", "Puzzles"];

let leaderboardTable = document.createElement("table");
leaderboardTable.className = "leaderboardTable"

let tableHead = document.createElement("thead");
tableHead.className = "tableHead"

let tableHeadRow = document.createElement("tr");
tableHeadRow.className = "tableHeaderRow"


let lastSortedBy = 1;
let reverse = false;
for (const header of headers) {
	let cell = document.createElement("th");
	cell.innerText = header;
	cell.className = "tableHeader"

	// sorting on click
	cell.addEventListener('click', (event) => {
		let tbody = leaderboardTable.tBodies[0];
		let rows = Array.from(tbody.rows);
		let sortBy = event.target.cellIndex;
		let sorted = rows.sort((a, b) => {
			if (sortBy > 0) {
				let firstRating = a.cells[sortBy].innerText.split("/")[0].trim();
				let secondRating = b.cells[sortBy].innerText.split("/")[0].trim();

				return secondRating - firstRating;
			} else {
				return a - b;
			}
		});

		if (lastSortedBy == sortBy) {
			reverse = !reverse;
		} else {
			reverse = false;
		}

		if (reverse) {
			sorted.reverse();
		}

		for (const row of sorted) {
			// delete the elements then add them in the correct order
			tbody.removeChild(row);
			tbody.appendChild(row);
		}
		lastSortedBy = sortBy;
	});

	tableHeadRow.append(cell);
}

tableHead.append(tableHeadRow);
leaderboardTable.append(tableHead);

let tableBody = document.createElement("tbody");
tableBody.className = "tableBody";
leaderboardTable.append(tableBody);

getRatings().then((players) => {
	players.sort((a, b) => b.rapid.current - a.rapid.current).forEach((player, number) => {
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
	});

	document.querySelector("#loading").style.display = "none";
	document.querySelector(".hide").style.display = "block";
});

boardDiv.append(leaderboardTable);