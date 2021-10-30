import { useEffect, useState } from "react";
import { getOrders, getItems } from "../../api";
import { IOrder } from "../../models/Order";
import { IItem } from "../../models/Item";
import { Button } from "../../components";
import style from "./Orders.module.scss";

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [currentOrder, setOrder] = useState<IOrder>();
  const [itemsMap, setItemsMap] = useState<any>(); // how to remove this any

  // try catch?
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getOrders();
      if (data) setOrders(data);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const current = orders[currentOrderIndex];
    if (current) setOrder(current);
  }, [orders, currentOrderIndex]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data: itemsList } = await getItems();
      const itemsMapTemp: Record<string, IItem> = {};

      if (itemsList && itemsList.length > 0) {
        itemsList.forEach((item) => {
          if (currentOrder?.items.includes(item.id)) {
            if (item.id === 130) item.station = "B4"; // verify this, duplicated station
            itemsMapTemp[item.station] = item;
          }
        });
      }

      setItemsMap(itemsMapTemp);
    };

    if (currentOrder) {
      fetchItems();
    }
  }, [currentOrder]);

  const RenderOrder = () => {
    if (!currentOrder) return <p>Loading</p>;
    const { id } = currentOrder;

    return (
      <section>
        <h3>Order # {id}</h3>
        <div className={style.grid}>
          <div className={style["grid-A1"]}>oi</div>
          <div className={style["grid-A3"]}>xau</div>
        </div>
      </section>
    );
  };

  const nextOrder = () => {
    if (currentOrderIndex < orders.length - 1) {
      setCurrentOrderIndex(currentOrderIndex + 1);
    }
  };

  return (
    <section>
      <h1>Orders</h1>
      <RenderOrder />
      <Button onClick={nextOrder}>Next Order</Button>
    </section>
  );
};
