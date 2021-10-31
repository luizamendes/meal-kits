import axios from "axios";
import { Order } from "../models/Order";

const baseURL = process.env.REACT_APP_COOKIT_API;

export const getOrders = () => {
  return axios.get<Order[]>(`${baseURL}/orders`);
};
