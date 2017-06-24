import { selectors } from '../store';
import { addOnlineText } from 'util/text';

export default game => {
  const online = selectors.onlinePlayersSelector();
  const playersText = addOnlineText(game, {
    text: `${online.length} Online - ${online}`,
  });
  return {
    update: () => {
      const online = selectors.onlinePlayersSelector();
      playersText.text = `${online.length} Online - ${online}`;
    },
  };
};
