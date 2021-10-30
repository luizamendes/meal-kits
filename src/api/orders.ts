import { Order } from "../models/Order";
import { httpClient } from "./client";

const baseURL = process.env.REACT_APP_COOKIT_API;

export const getOrders = () => {
  return httpClient.get<Order[]>(`${baseURL}/orders`);
};
