export async function onRequest(_context) {
  const playerListUrl = "https://api.npoint.io/be2d1995fe5315721c49";
  const playerList = await (await fetch(playerListUrl)).json();

  let ratings = [];
  const data = await Promise.all(playerList.map(player =>
    fetch(`https://www.chess.com/callback/member/stats/${player.account}`).then(res => res.json())
  ));

  for (let i in playerList) {
    let playerStats = data[i].stats;
    let player = playerList[i];

    let rating = {
      username: player.username,
      account: player.account,
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
        best: 0,
        current: 0
      }
    };

    for (const mode of playerStats) {
      const timecontrol = mode.key;
      const stats = mode.stats;

      if (timecontrol == "rapid") {
        rating.rapid.current = stats.rating;
        rating.rapid.best = stats.highest_rating;
      }

      if (timecontrol == "lightning") {
        rating.blitz.current = stats.rating;
        rating.blitz.best = stats.highest_rating;
      }

      if (timecontrol == "bullet") {
        rating.bullet.current = stats.rating;
        rating.bullet.best = stats.highest_rating;
      }

      if (timecontrol == "tactics") {
        rating.puzzles.current = stats.rating;
        rating.puzzles.best = stats.highest_rating;
      }
    }

    ratings.push(rating);
  };

  const options = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    }
  }
  return new Response(JSON.stringify(ratings), options);
}