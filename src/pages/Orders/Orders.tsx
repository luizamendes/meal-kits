import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getOrders, getItems, getProteins } from "../../api";
import { Order } from "../../models/Order";
import { Item } from "../../models/Item";
import { Protein } from "../../models/Protein";
import { Button, Loading, Notification } from "../../components";
import { itemHasMeat, getMeatCode } from "../../utils/Meat";
import { ProteinShelf } from "./components/ProteinShelf";
import { logger } from "../../services/sentry";
import { GeneralShelf } from "./components/GeneralShelf";

import style from "./Orders.module.css";

export const Orders = () => {
  const history = useHistory();
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [proteins, setProteins] = useState<Protein[]>([]);

  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<Order>();
  const [itemsOfOrder, setItemsOfOrder] = useState<Item[]>([]);
  const [proteinsOfOrder, setProteinsOfOrder] = useState<Protein[]>([]);

  const [error, setError] = useState<{ title: string; message: string }>();
  const [finished, setFinished] = useState(false);

  // Fetch orders, items and meats from APIs
  useEffect(() => {
    getOrders()
      .then(({ data }) => setOrders(data))
      .catch((err) => {
        setError({ title: "Error", message: "Error fetching orders" });
        logger(`Logger :: Error fetching orders :: ${err.message}`);
      });

    getItems()
      .then(({ data }) => setItems(data))
      .catch((err) => {
        setError({ title: "Error", message: "Error fetching items" });
        logger(`Logger :: Error fetching items :: ${err.message}`);
      });

    getProteins()
      .then(({ data }) => setProteins(data))
      .catch((err) => {
        setError({ title: "Error", message: "Error fetching proteins" });
        logger(`Logger :: Error fetching proteins :: ${err.message}`);
      });
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

  useEffect(() => {
    if (currentOrderIndex === 8) setFinished(true);
  }, [currentOrderIndex]);

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
    if (currentOrderIndex < orders.length) {
      setCurrentOrderIndex(currentOrderIndex + 1);
    }

    if (currentOrderIndex === orders.length) {
      setFinished(true);
    }

    if (finished) history.push("/");
  };

  if (!currentOrder || !itemsOfOrder.length) return <Loading />;

  return (
    <main className={style.main}>
      <div className={style.header}>
        <h1>Scanned orders</h1>
        <Button onClick={nextOrder} className={style.button}>
          {finished ? "Finish" : "Next order"}
        </Button>
      </div>
      <section className={style.order}>
        {error && <Notification title={error.title} message={error.message} />}
        {!finished && (
          <>
            <h2>Order #{currentOrder.id}</h2>
            <RenderOrder />
          </>
        )}
      </section>
      {finished && (
        <p className={style.finished}>
          You have finished all the orders. Click on the finish button.
        </p>
      )}
    </main>
  );
};
