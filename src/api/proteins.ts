import { Protein } from "../models/Protein";
import { httpClient } from "./client";

const baseURL = process.env.REACT_APP_COOKIT_API;

export const getProteins = () => {
  return httpClient.get<Protein[]>(`${baseURL}/proteins`);
};
