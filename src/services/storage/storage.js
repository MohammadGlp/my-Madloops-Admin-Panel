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

export { setItem, getItem, removeItem, clearStorage };
