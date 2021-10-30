import { useEffect, useState } from "react";
import { getOrders } from "../../api/orders";
import { IOrder } from "../../models/Order";

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getOrders();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return <h1>Orders</h1>;
};
