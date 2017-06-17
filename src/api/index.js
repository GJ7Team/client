import emit, { createEmmiter, getMatchSocket } from './setup';

// GAME actions
const GAME_ENTER = 'game.enter';

// MATCH actions
const MATCH_ENTER = 'match.enter';
const MATCH_START = 'match.start';
const MATCH_FIND = 'match.find';

const MATCH_ATTACK = 'match.attack';
const MATCH_CAST = 'match.cast';

export const gameEnter = async ({ name }) => {
  const game = await emit(GAME_ENTER, {
    name,
  });

  return game;
};

export const matchFind = async function*() {
  const match = await emit(MATCH_FIND);

  yield match;

  const matchSocket = getMatchSocket(match.matchId);

  const matchEmit = createEmmiter(matchSocket);
  const matchEnvironment = await matchEmit(MATCH_ENTER);

  yield matchEnvironment;

  return {
    attack: async ({ point, value }) => {
      await matchEmit(MATCH_ATTACK, {
        point,
        value,
      });
    },
    cast: async ({ point, x, y, coords, spell }) => {
      await matchEmit(MATCH_CAST, {
        point,
        x,
        y,
        coords,
        spell,
      });
    },
  };
};

const run = async () => {
  try {
    console.log('gameEnter');
    const game = await gameEnter({
      name: 'tuchk4',
    });

    console.log('matchFind');
    const matchFinder = await matchFind();

    const matchDetails = (await matchFinder.next()).value;
    const matchEnvironment = (await matchFinder.next()).value;
    const matchActions = (await matchFinder.next()).value;

    console.log('matchDetails');
    console.log(matchDetails);

    console.log('matchEnvironment');
    console.log(matchEnvironment);

    console.log('matchActions');
    console.log(matchActions);

    matchActions.attack({
      point: 15,
      value: 60,
    });

    matchActions.cast({
      coords: [
        {
          x: 10,
          y: 15,
        },
        {
          x: 40,
          y: 30,
        },
      ],
      spell: 'ice-wall',
    });

    // -----
  } catch (e) {
    console.log(e);
  }
};

// run();
