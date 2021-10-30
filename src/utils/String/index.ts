export const capitalizeFirstLetter = (str: string) => {
  const word = str.toLowerCase();

  return word.toUpperCase().charAt(0) + word.slice(1);
};
