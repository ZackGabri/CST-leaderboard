const loadingText = document.getElementById("loading");
const playerListUrl = "https://api.npoint.io/be2d1995fe5315721c49";

function updateLoading(number, total) {
	loadingText.innerText = `Loading ${number} out of ${total} players...`
}

async function getRatingsPublicAPI() {
	let playerList = await (await fetch(playerListUrl)).json();
	let totalPlayers = playerList.length;
	let loadedCount = 1;
	let ratings = [];

	const chunkSize = 2;
	for (let i = 0; i < playerList.length; i += chunkSize) {
		const chunk = playerList.slice(i, i + chunkSize);

		let chunkData = await Promise.all(chunk.map(player =>
			fetch(`https://api.chess.com/pub/player/${player.account}/stats`).then(res => {
				updateLoading(loadedCount, totalPlayers);
				loadedCount++;
				if (res.ok) {
					return res.json()
				} else {
					console.error("Error while loading player: ", player);
					res.json();
				}
			})
		));

		let currentPlayerIndex = 0;
		for (data of chunkData) {
			let rating = {
				username: chunk[currentPlayerIndex].username,
				account: chunk[currentPlayerIndex].account,
				rapid: {
					best: 0,
					current: 0,
				},
				blitz: {
					best: 0,
					current: 0,
				},
				bullet: {
					best: 0,
					current: 0,
				},
				puzzles: {
					highest: 0,
					lowest: 0
				}
			};
			currentPlayerIndex++;

			if (data.chess_rapid) {
				rating.rapid.current = data.chess_rapid.last ? data.chess_rapid.last.rating : 0;

				if (data.chess_rapid.record.win == 0) {
					rating.rapid.best = rating.rapid.current;
				} else {
					rating.rapid.best = data.chess_rapid.best.rating;
				}
			}

			if (data.chess_blitz) {
				rating.blitz.current = data.chess_blitz.last ? data.chess_blitz.last.rating : 0;

				if (data.chess_blitz.record.win == 0) {
					rating.blitz.best = rating.blitz.current;
				} else {
					rating.blitz.best = data.chess_blitz.best.rating;
				}
			}

			if (data.chess_bullet) {
				rating.bullet.current = data.chess_bullet.last ? data.chess_bullet.last.rating : 0;


				if (data.chess_bullet.record.win == 0) {
					rating.bullet.best = rating.bullet.current;
				} else {
					rating.bullet.best = data.chess_bullet.best.rating;
				}
			}

			if (data.tactics) {
				if (data.tactics.highest) {
					// there is no way to actually get the current rating with the public api, so i'll be using the highest for both
					rating.puzzles.highest = data.tactics.highest.rating;
					rating.puzzles.lowest = data.tactics.lowest.rating;
				}
			}

			ratings.push(rating);
		}
	}

	return ratings;
}
