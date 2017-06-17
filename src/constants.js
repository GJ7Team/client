export const STATES = {
  PLAY: 'play',
  VIDEO: 'video',
  MENU: 'menuState',
  LOGIN: 'loginState',
};

export const COLONY_TYPES = {
  ally: 'ally',
  neutral: 'neutral',
  enemy: 'enemy',
};

export const TYPE_TO_IMAGE = {
  [COLONY_TYPES.ally]: 'colony:ally',
  [COLONY_TYPES.neutral]: 'colony:neutral',
  [COLONY_TYPES.enemy]: 'colony:enemy',
};

export const GLOBAL_SPEED = 1;

export const WORLD_SIZE = {
  height: 414,
  width: 736,
};
