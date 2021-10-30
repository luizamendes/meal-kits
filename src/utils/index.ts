import { meatCodes } from "../models/Protein";

export const itemHasMeat = (displayName: string) => {
  const [, meatCode] = displayName.split("-");

  return !!meatCode && meatCodes.includes(meatCode.toUpperCase());
};

export const getMeatCode = (displayName: string) => {
  const [, meatCode] = displayName.split("-");

  if (!meatCodes.includes(meatCode.toUpperCase())) return "";

  return meatCode.toUpperCase();
};

export const capitalizeFirstLetter = (str: string) => {
  const word = str.toLowerCase();

  return word.toUpperCase().charAt(0) + word.slice(1);
};
