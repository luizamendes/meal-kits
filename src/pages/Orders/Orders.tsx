import { useEffect, useState } from "react";
import { getOrders, getItems, getProteins } from "../../api";
import { IOrder } from "../../models/Order";
import { IItem } from "../../models/Item";
import { IProtein } from "../../models/Protein";
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
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [proteins, setProteins] = useState<IProtein[]>([]);

  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [currentOrder, setOrder] = useState<IOrder>();
  const [itemsMap, setItemsMap] = useState<IItem[]>([]);
  const [proteinsOfOrder, setProteinsOfOrder] = useState<IProtein[]>([]);
  const [loading, setLoading] = useState(false);

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
    if (current) setOrder(current);
  }, [orders, currentOrderIndex]);

  // Getting items of the order
  useEffect(() => {
    if (currentOrder && items?.length) {
      const currentItems = items.filter((item) =>
        currentOrder?.items.includes(item.id)
      );
      setItemsMap(currentItems);
    }
  }, [items, currentOrder]);

  // Getting meats of the order
  useEffect(() => {
    // Getting meat codes of current order
    const meatsOfOrder = itemsMap
      .filter((item) => itemHasMeat(item.displayName))
      .map((item) => getMeatCode(item.displayName));

    // Getting information about the meats in the order
    const meatTypesOfOrder = proteins.filter((protein) =>
      meatsOfOrder.includes(protein.code)
    );

    setProteinsOfOrder(meatTypesOfOrder);
  }, [proteins, itemsMap]);

  const RenderOrder = () => {
    if (!currentOrder || !itemsMap.length) return <Loading />;
    const { id } = currentOrder;

    return (
      <section className={style.order}>
        <h2>Order #{id}</h2>
        <h3>General</h3>
        <div className={`${style.grid} ${style.grid__general}`}>
          {itemsMap.map((item) => {
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
      {loading && <Loading />}
      <h1>Scanned orders</h1>
      <RenderOrder />
      <Button onClick={nextOrder} className={style.button}>
        Next Order
      </Button>
    </main>
  );
};
