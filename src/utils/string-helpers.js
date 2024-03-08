export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const regexDomain =
  // eslint-disable-next-line no-useless-escape
  /^(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

export const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
