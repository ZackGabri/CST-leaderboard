import { getRatings } from './script.js';
import * as leaderboard from './leaderboard.js';

leaderboard.initalize();
leaderboard.setHeaders(['Player', 'Rapid', 'Blitz', 'Bullet', 'Puzzles']);

getRatings().then((players) => {
  for (const player of players) {
    leaderboard.addPlayer(player);
  }
  leaderboard.finalize();
  leaderboard.sort(1);
});
