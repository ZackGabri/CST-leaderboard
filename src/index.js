import './errorhandler.js';
import { getRatings } from './script.js';
import * as loading from './loading.js';
import * as leaderboard from './leaderboard.js';

loading.start();
leaderboard.initalize();
leaderboard.setHeaders(['Player', 'Rapid', 'Blitz', 'Bullet', 'Puzzles']);

getRatings()
  .then((players) => {
    for (const player of players) {
      leaderboard.addPlayer(player);
    }
  })
  .then(() => {
    leaderboard.finalize();
    leaderboard.sort(1); // sort by rapid
    loading.stop();
  });
