const hash = () =>
  (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

let id = null;

const getUserLocalId = () => {
  if (!id) {
    id = localStorage.id || hash();
    localStorage.id = id;
  }

  return id;
};

export default getUserLocalId;
