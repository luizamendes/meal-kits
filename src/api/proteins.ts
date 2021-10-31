import axios from "axios";
import { Protein } from "../models/Protein";

const baseURL = process.env.REACT_APP_COOKIT_API;

export const getProteins = () => {
  return axios.get<Protein[]>(`${baseURL}/proteins`);
};
