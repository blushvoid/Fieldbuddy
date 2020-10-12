import faker from "faker";
import { IOrder } from "./types";
import { Status, Colors, Types } from "./constants";

const mkOrder = (): IOrder => ({
  Id: faker.random.uuid(),
  Name: `WO-${faker.random.alphaNumeric(4)}`,
  Status: faker.random.arrayElement(Status),
  Type: faker.random.arrayElement(Types),
  Color: faker.random.arrayElement(Colors),
  StartDate: faker.date.soon().toISOString(),
  EndDate: faker.date.soon().toISOString(),
  Description: faker.random.words(10),
});

export const fakeOrders = (max: number = 9) =>
  [...new Array(faker.random.number(max))].map(mkOrder);
