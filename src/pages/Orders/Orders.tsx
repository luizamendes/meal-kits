import { useEffect, useState } from "react";
import { getOrders, getItems, getProteins } from "../../api";
import { IOrder } from "../../models/Order";
import { IItem } from "../../models/Item";
import { IProtein } from "../../models/Protein";
import { Button, ItemDisplay } from "../../components";
import { itemHasMeat, getMeatCode, capitalizeFirstLetter } from "../../utils";

import style from "./Orders.module.scss";

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [currentOrder, setOrder] = useState<IOrder>();
  const [itemsMap, setItemsMap] = useState<IItem[]>([]);
  const [proteinsOfOrder, setProteinsOfOrder] = useState<IProtein[]>([]);

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
      let { data: itemsList } = await getItems();

      if (itemsList && itemsList.length > 0) {
        itemsList = itemsList.filter((item) =>
          currentOrder?.items.includes(item.id)
        );
      }

      setItemsMap(itemsList);
    };

    if (currentOrder) {
      fetchItems();
    }
  }, [currentOrder]);

  useEffect(() => {
    const fetchMeatInfo = async (meatsOfOrder: string[]) => {
      let { data: meatTypes } = await getProteins();

      meatTypes = meatTypes.filter((meat) => meatsOfOrder.includes(meat.code));
      setProteinsOfOrder(meatTypes);
    };

    const meatsOfOrder = itemsMap
      .filter((item) => itemHasMeat(item.displayName))
      .map((item) => getMeatCode(item.displayName));

    if (meatsOfOrder.length) {
      fetchMeatInfo(meatsOfOrder);
    }
  }, [itemsMap]);

  const RenderOrder = () => {
    if (!currentOrder || !itemsMap.length) return <p>Loading</p>;
    const { id } = currentOrder;

    return (
      <section>
        <h3>Order # {id}</h3>
        <div className={`${style.grid} ${style.grid__general}`}>
          {itemsMap.map((item) => {
            if (item.id === 130) item.station = "B4";

            return (
              <ItemDisplay
                // item={item}
                className={`${style[`grid-${item.station}`]} ${style.item}`}
                key={item.id}
                station={item.station}
                outOfStock={item.volume <= 0}
              >
                <>
                  <p>
                    <span>Id:</span> {item.id}
                  </p>
                  <p>
                    <span>Name:</span>
                    {capitalizeFirstLetter(item.name)}
                  </p>
                  <p>
                    <span>Category:</span>
                    {capitalizeFirstLetter(item.category)}
                  </p>
                  <p>
                    <span>Quantity:</span>
                    {item.volume}
                  </p>
                </>
              </ItemDisplay>
            );
          })}
        </div>
        {proteinsOfOrder.length && (
          <>
            <h4>Proteins</h4>
            <div className={`${style.grid} ${style.grid__meats}`}>
              {proteinsOfOrder.map((protein) => (
                <ItemDisplay
                  className={`${style[`grid-${protein.station}`]} ${
                    style.item
                  }`}
                  key={protein.code}
                  station={protein.station}
                >
                  <>
                    <p>
                      <span>Protein name:</span>
                      {capitalizeFirstLetter(protein.name)}
                    </p>
                    <p>
                      <span>Protein code:</span>
                      {protein.code}
                    </p>
                  </>
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
    <section>
      <h1>Orders</h1>
      <RenderOrder />
      <Button onClick={nextOrder} className={style.button}>
        Next Order
      </Button>
    </section>
  );
};
