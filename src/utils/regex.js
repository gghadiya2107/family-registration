export const isAlphanumericKey = (key) => {
    return /^[a-zA-Z0-9 ]+$/.test(key);
  };
export const isAlphabateKey = (key) => {
    return /^[a-zA-Z ]+$/.test(key);
  };