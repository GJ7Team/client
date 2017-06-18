import { INITIAL_ACTIVE_POWER } from '../constants';

const initialStatistics = {
  me: {
    spawned: INITIAL_ACTIVE_POWER,
    attacked: 0,
  },
  enemy: {
    spawned: INITIAL_ACTIVE_POWER,
    attacked: 0,
  },
};
const local = {
  result: null,
  statistics: initialStatistics,
};

export default {
  setResult: result => (local.result = result),
  getResult: () => local.result,

  setMyStatistics: data => {
    Object.keys(data).forEach(key => {
      if (key in local.statistics.me) {
        local.statistics.me[key] += data[key];
      }
    });

    return local.statistics;
  },
  setEnemyStatistics: data => {
    Object.keys(data).forEach(key => {
      if (key in local.statistics.enemy) {
        local.statistics.enemy[key] += data[key];
      }
    });

    return local.statistics;
  },
  getStatistics: () => {
    const { me, enemy } = { ...local.statistics };

    const myEfficiency = Math.floor(me.attacked / me.spawned * 100);
    const enemyEfficiency = Math.floor(enemy.attacked / enemy.spawned * 100);

    me.efficiency = `${myEfficiency}%`;
    enemy.efficiency = `${enemyEfficiency}%`;

    return { me, enemy };
  },
  resetStatistics: () => (local.statistics = initialStatistics),
};
