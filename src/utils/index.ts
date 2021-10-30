import { meatCodes } from "../models/Protein";

export const itemHasMeat = (displayName: string) => {
  const [, meatCode] = displayName.split("-");

  return !!meatCode && meatCodes.includes(meatCode);
};

export const getMeatCode = (displayName: string) => {
  const [, meatCode] = displayName.split("-");

  if (!meatCodes.includes(meatCode)) return "";

  return meatCode;
};

export const capitalizeFirstLetter = (str: string) => {
  const word = str.toLowerCase();

  return word.toUpperCase().charAt(0) + word.slice(1);
};
