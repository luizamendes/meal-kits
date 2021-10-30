import { IProtein } from "../models/Protein";
import { httpClient } from "./client";

const baseURL = process.env.REACT_APP_COOKIT_API;

export const getItems = () => {
  return httpClient.get<IProtein[]>(`${baseURL}/proteins`);
};
