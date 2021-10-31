import dayjs from "dayjs";

export const capitalizeFirstLetter = (str: string) => {
  const word = str.toLowerCase();

  return word.toUpperCase().charAt(0) + word.slice(1);
};

export const formatDate = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};
