import { IItem } from "../models/Item";
import { httpClient } from "./client";

const baseURL = process.env.REACT_APP_COOKIT_API;

export const getItems = () => {
  return httpClient.get<IItem[]>(`${baseURL}/items`);
};
