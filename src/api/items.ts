import axios from "axios";
import { Item } from "../models/Item";

const baseURL = process.env.REACT_APP_COOKIT_API;

export const getItems = () => {
  return axios.get<Item[]>(`${baseURL}/items`);
};
