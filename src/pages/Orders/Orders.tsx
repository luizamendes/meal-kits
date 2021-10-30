import { useEffect, useState } from "react";
import { getOrders, getItems, getProteins } from "../../api";
import { Order } from "../../models/Order";
import { Item } from "../../models/Item";
import { Protein } from "../../models/Protein";
import {
  Button,
  ItemDisplay,
  GeneralDisplay,
  ProteinDisplay,
  Loading,
} from "../../components";
import { itemHasMeat, getMeatCode } from "../../utils";

import style from "./Orders.module.scss";

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
    const fetchOrders = async () => {
      const { data: ordersList } = await getOrders();
      if (ordersList) setOrders(ordersList);
    };

    const fetchItems = async () => {
      const { data: itemsList } = await getItems();

      if (itemsList) setItems(itemsList);
    };

    const fetchMeatInfo = async () => {
      const { data: meatTypes } = await getProteins();

      if (meatTypes) setProteins(meatTypes);
    };

    fetchOrders();
    fetchItems();
    fetchMeatInfo();
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
    if (!currentOrder || !itemsOfOrder.length) return <Loading />;
    const { id } = currentOrder;

    return (
      <section className={style.order}>
        <h2>Order #{id}</h2>
        <h3>General</h3>
        <div className={`${style.grid} ${style.grid__general}`}>
          {itemsOfOrder.map((item) => {
            if (item.id === 130) item.station = "B4";

            return (
              <ItemDisplay
                className={style[`grid-${item.station}`]}
                key={item.id}
                station={item.station}
                type="general"
                outOfStock={item.volume <= 0}
              >
                <GeneralDisplay item={item} />
              </ItemDisplay>
            );
          })}
        </div>
        {proteinsOfOrder.length && (
          <>
            <h3>Proteins</h3>
            <div className={`${style.grid} ${style.grid__meats}`}>
              {proteinsOfOrder.map((protein) => (
                <ItemDisplay
                  className={style[`grid-${protein.station}`]}
                  key={protein.code}
                  station={protein.station}
                  type="protein"
                >
                  <ProteinDisplay protein={protein} />
                </ItemDisplay>
              ))}
            </div>
          </>
        )}
      </section>
    );
  };

  const nextOrder = () => {
    if (currentOrderIndex < orders.length - 1) {
      setCurrentOrderIndex(currentOrderIndex + 1);
    } else {
      setCurrentOrderIndex(0);
    }
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <h1>Scanned orders</h1>
        <Button onClick={nextOrder} className={style.button}>
          Next Order
        </Button>
      </div>
      <RenderOrder />
    </main>
  );
};
