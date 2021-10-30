export const itemHasMeat = (displayName: string) => {
  const [, meatCode] = displayName.split("-");

  return !!meatCode;
};
