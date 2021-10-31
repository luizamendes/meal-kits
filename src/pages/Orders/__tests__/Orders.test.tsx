import { AxiosResponse } from "axios";
import { render, screen, act } from "@testing-library/react";
import { Orders } from "../Orders";
import { getProteins, getOrders, getItems } from "../../../api";
import { Item } from "../../../models/Item";
import { Order } from "../../../models/Order";
import { Protein } from "../../../models/Protein";

jest.mock("../../../api");

jest.mock("axios");

const orders: Order[] = [
  {
    id: 1,
    items: [321, 124],
    "package-date": "2021-10-01",
  },
  {
    id: 2,
    items: [124],
    "package-date": "2021-10-01",
  },
];

const items: Item[] = [
  {
    id: 321,
    name: "Chicken sandwich",
    displayName: "2P-C-321",
    volume: 1000,
    deliveryWeek: "2021-08-09",
    station: "A1",
    category: "RECETTE",
  },
  {
    id: 124,
    name: "Aiglefin aux épices jerk",
    displayName: "2P-F-124",
    volume: 999,
    deliveryWeek: "2021-08-09",
    station: "A2",
    category: "RECETTE",
  },
];

const proteins: Protein[] = [
  {
    name: "boeuf",
    code: "M",
    station: "C1",
  },
  {
    name: "poulet",
    code: "C",
    station: "C2",
  },
  {
    name: "poisson",
    code: "F",
    station: "C3",
  },
  {
    name: "fruits de mer",
    code: "S",
    station: "C4",
  },
];

const mockedOrdersResponse: AxiosResponse = {
  data: orders,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

const mockedItemsResponse: AxiosResponse = {
  data: items,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

const mockedProteinsResponse: AxiosResponse = {
  data: proteins,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

describe("Testing Orders page", () => {
  const mockGetOrders = getOrders as jest.MockedFunction<typeof getOrders>;
  const mockGetItems = getItems as jest.MockedFunction<typeof getItems>;
  const mockGetProteins = getProteins as jest.MockedFunction<
    typeof getProteins
  >;

  it("Renders Orders correctly", async () => {
    mockGetOrders.mockResolvedValue(mockedOrdersResponse);
    mockGetItems.mockResolvedValue(mockedItemsResponse);
    mockGetProteins.mockResolvedValue(mockedProteinsResponse);

    act(() => {
      render(<Orders />);
    });

    expect(mockGetOrders).toBeCalledTimes(1);
    expect(mockGetItems).toBeCalledTimes(1);
    expect(mockGetProteins).toBeCalledTimes(1);

    const totalScanned = await screen.findByText("2 orders scanned");
    const orderOne = await screen.findByText("Order #1");
    const dish1 = await screen.findByText("Chicken sandwich");
    const protein1 = await screen.findByText("Poulet");
    expect(totalScanned).toBeInTheDocument();
    expect(orderOne).toBeInTheDocument();
    expect(dish1).toBeInTheDocument();
    expect(protein1).toBeInTheDocument();

    const nextButton = screen.getByText(/Next order/i);
    nextButton.click();

    const order2 = await screen.findByText("Order #2");
    const protein2 = await screen.findByText("Poisson");
    const dish2 = await screen.findByText(/Aiglefin/i);
    expect(order2).toBeInTheDocument();
    expect(dish2).toBeInTheDocument();
    expect(protein2).toBeInTheDocument();
  });
});
