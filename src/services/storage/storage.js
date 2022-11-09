//Managing Local Storage ---------------------------------------------------------------

// save item in localStorage
const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

// get an item from localStorage with its key
const getItem = (key) => {
  if (localStorage.getItem(key)) return localStorage.getItem(key);
  return false;
};

// remove specific item with its key from localStorage
const removeItem = (key) => {
  if (getItem(key) === false) return false;
  localStorage.removeItem(key);
};

// cleare all localStorage of this site
const clearStorage = () => {
  localStorage.clear();
};

//Managing Session Storage ---------------------------------------------------------------

// save item in sessionStorage
const sessionSetItem = (key, value) => {
  sessionStorage.setItem(key, value);
};

// get an item from sessionStorage with its key
const sessionGetItem = (key) => {
  if (sessionStorage.getItem(key)) return sessionStorage.getItem(key);
  return false;
};

// remove specific item with its key from sessionStorage
const sessionRemoveItem = (key) => {
  if (sessionGetItem(key) === false) return false;
  sessionStorage.removeItem(key);
};

// cleare all sessionStorage of this site
const clearSessionStorage = () => {
  sessionStorage.clear();
};

export {
  setItem,
  getItem,
  removeItem,
  clearStorage,
  sessionSetItem,
  sessionGetItem,
  sessionRemoveItem,
  clearSessionStorage,
};
