import Io from 'socket.io-client';
import getUserLocalId from './utils/getUserLocalId';

// const SOCKET_ENTRY_POINT = 'https://bacterium666.herokuapp.com/';

const SOCKET_ENTRY_POINT = 'https://bacterium666.herokuapp.com/';

const socket = Io(SOCKET_ENTRY_POINT);

export const USER_LOCAL_ID = getUserLocalId();

const getMatchChannelEntryPoint = matchId => SOCKET_ENTRY_POINT + matchId;

export const getMatchSocket = matchId => {
  const matchChannelEntryPoint = getMatchChannelEntryPoint(matchId);
  return Io(matchChannelEntryPoint);
};

export const createEmmiter = socket => {
  // one rule - data should be always object
  return (event, data = {}) =>
    new Promise((resolve, reject) => {
      // Automatically add USER_ID if exists
      const sendData = USER_LOCAL_ID
        ? {
            ...data,
            id: USER_LOCAL_ID,
          }
        : {
            ...data,
          };

      socket.emit(event, sendData, response => resolve(response));
    });
};

export default createEmmiter(socket);
