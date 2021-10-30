import { useEffect, useState } from "react";
import { getOrders, getItems, getProteins } from "../../api";
import { Order } from "../../models/Order";
import { Item } from "../../models/Item";
import { Protein } from "../../models/Protein";
import { Button, Loading } from "../../components";
import { itemHasMeat, getMeatCode } from "../../utils/Meat";
import { ProteinShelf } from "./components/ProteinShelf";
import { logger } from "../../services/sentry";

import style from "./Orders.module.scss";
import { GeneralShelf } from "./components/GeneralShelf";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [proteins, setProteins] = useState<Protein[]>([]);

  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<Order>();
  const [itemsOfOrder, setItemsOfOrder] = useState<Item[]>([]);
  const [proteinsOfOrder, setProteinsOfOrder] = useState<Protein[]>([]);

  // Fetch orders, items and meats from APIs
  useEffect(() => {
    getOrders()
      .then(({ data }) => setOrders(data))
      .catch((error) =>
        logger(`Logger :: Error fetching orders :: ${error.message}`)
      );

    getItems()
      .then(({ data }) => setItems(data))
      .catch((error) =>
        logger(`Logger :: Error fetching items :: ${error.message}`)
      );

    getProteins()
      .then(({ data }) => setProteins(data))
      .catch((error) =>
        logger(`Logger :: Error fetching proteins :: ${error.message}`)
      );
  }, []);

  // Getting current order
  useEffect(() => {
    const current = orders[currentOrderIndex];
    if (current) setCurrentOrder(current);
  }, [orders, currentOrderIndex]);

  // Getting items of the order
  useEffect(() => {
    if (currentOrder && items?.length) {
      const currentItems = items.filter((item) =>
        currentOrder?.items.includes(item.id)
      );
      setItemsOfOrder(currentItems);
    }
  }, [items, currentOrder]);

  // Getting meats of the order
  useEffect(() => {
    // Getting meat codes of current order
    const meatsOfOrder = itemsOfOrder
      .filter((item) => itemHasMeat(item.displayName))
      .map((item) => getMeatCode(item.displayName));

    // Getting information about the meats in the order
    const meatTypesOfOrder = proteins.filter((protein) =>
      meatsOfOrder.includes(protein.code)
    );

    setProteinsOfOrder(meatTypesOfOrder);
  }, [proteins, itemsOfOrder]);

  const RenderOrder = () => {
    return (
      <>
        <GeneralShelf items={itemsOfOrder} />
        {proteinsOfOrder.length > 0 && (
          <ProteinShelf proteins={proteinsOfOrder} />
        )}
      </>
    );
  };

  const nextOrder = () => {
    if (currentOrderIndex < orders.length - 1) {
      setCurrentOrderIndex(currentOrderIndex + 1);
    } else {
      setCurrentOrderIndex(0);
    }
  };

  if (!currentOrder || !itemsOfOrder.length) return <Loading />;

  return (
    <main className={style.main}>
      <div className={style.header}>
        <h1>Scanned orders</h1>
        <Button onClick={nextOrder} className={style.button}>
          Next Order
        </Button>
      </div>
      <section className={style.order}>
        <h2>Order #{currentOrder.id}</h2>
        <RenderOrder />
      </section>
    </main>
  );
};
