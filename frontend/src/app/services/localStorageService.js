export const setItem = (key, value) => {
  const data = JSON.stringify(value);
  window.localStorage.setItem(key, data);
  return true;
};

export const getItem = (key) => {
  const value = window.localStorage.getItem(key);
  return JSON.parse(value);
};
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
  return true;
};
