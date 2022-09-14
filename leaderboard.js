let boardDiv = document.getElementById("leaderboard");
let headers = ["Player", "Rapid", "Blitz", "Bullet", "Puzzles"];

let table = document.createElement("table");
table.className = "leaderboardTable"

let tableHead = document.createElement("thead");
tableHead.className = "tableHead"

let tableHeadRow = document.createElement("tr");
tableHeadRow.className = "tableHeaderRow"

for(header of headers) {
	let cell = document.createElement("th");
	cell.innerText = header;
	cell.className = "tableHeader"

	cell.onclick = function() {
		console.log("Hi from " + header);
	};
	tableHeadRow.append(cell);
}

tableHead.append(tableHeadRow);
table.append(tableHead);

let tableBody = document.createElement("tbody");
tableBody.className = "tableBody";
table.append(tableBody);

getRatingsPublicAPI().then((players) => {
	players.sort((a,b) => b.rapid.current - a.rapid.current).forEach(player => {
		let tableRow = document.createElement("tr");
		tableRow.className = "leaderboardTableRow"

		let username = document.createElement("td");
		username.className = "username";
		username.innerText = player.username;

		let rapid = document.createElement("td");
		if(player.rapid.best == 0 && player.rapid.current == 0) {
			rapid.innerText = "?";
		} else {
			rapid.innerText = player.rapid.current + " / " + player.rapid.best;
		}

		let blitz = document.createElement("td");
		if(player.blitz.best == 0 && player.blitz.current == 0) {
			blitz.innerText = "?";
		} else {
			blitz.innerText = player.blitz.current + " / " + player.blitz.best;
		}

		let bullet = document.createElement("td");
		if(player.bullet.best == 0 && player.bullet.current == 0) {
			bullet.innerText = "?";
		} else {
			bullet.innerText = player.bullet.current + " / " + player.bullet.best;
		}

		let puzzles = document.createElement("td");
		if(player.puzzles.highest == 0) {
			puzzles.innerText = "?";
		} else {
			puzzles.innerText = player.puzzles.highest;
		}

		tableRow.append(username, rapid, blitz, bullet, puzzles);
		table.append(tableRow);

		console.log(player);
	});

	document.querySelector(".hide").style.display = "block";
});

boardDiv.append(table);