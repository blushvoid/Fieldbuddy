import React from "react";
import { types } from "mobx-state-tree";
import { Colors, Status, Types } from "./constants";
import { fakeOrders } from "./fake";
import { IFilter, IOrder } from "./types";

const filtersMap = new Map<string, (...args: any[]) => boolean>();
filtersMap.set("Equals", (a: string, b: string) => a === b);
filtersMap.set("Or", (a: string[], b: string) => a.includes(b));

export const Order = types.model("Order", {
  Id: types.identifier,
  Name: "WO-0001",
  Status: types.enumeration("Status", Status),
  Type: types.enumeration("Type", Types),
  StartDate: "22-04-2016 13:00:00",
  EndDate: "22-04-2016 14:00:00",
  Color: types.enumeration("Color", Colors),
  Description: "Install new KoelKast SF-123",
});

export const Filter = types.model("Filter", {
  id: types.identifier,
  prop: types.string,
  condition: types.string,
  value: types.union(types.string, types.array(types.string)),
  active: types.boolean,
});

export const store = types
  .model("Root", {
    orders: types.array(Order),
    filters: types.array(Filter),
    activeFilters: types.array(Filter),
  })
  .actions((self) => ({
    toggleFilter(filterId: string, value?: string): void {
      const filter = self.filters.find((f) => f.id === filterId);
      // Or "|" type filters should always be active, and filter on an array of values
      // as to implement Or | or | or ... behaviour.
      if (filter && Array.isArray(filter.value) && value) {
        const ix = filter.value.indexOf(value);
        filter.value.includes(value)
          ? filter.value.splice(ix, 1)
          : filter.value.push(value);
        return void 0;
      }
      // Simple value filter.
      // This filter is either active or inactive.
      if (filter) {
        filter.active = !filter.active;
      }
    },
  }))
  .views((self) => ({
    get results(): IOrder[] {
      const activeFilters = self.filters.filter((f) => f.active) as IFilter[];
      console.log("active filters", activeFilters);
      return activeFilters.reduce((results: IOrder[], filter: IFilter) => {
        const condition = filtersMap.get(filter.condition);
        return results.filter((order) => {
          const value = order[filter.prop] as string;
          if (Array.isArray(filter.value)) {
            return filter.value.length > 0
              ? condition && condition(filter.value, value)
              : true;
          }
          return condition && condition(filter.value, value);
        });
      }, self.orders as IOrder[]);
    },
  }))
  .create({
    orders: [
      {
        Id: "uniqwo1",
        Name: "WO-0001",
        Status: "Open",
        Type: "Installation",
        StartDate: "22-04-2016 13:00:00",
        EndDate: "22-04-2016 14:00:00",
        Color: "Red",
        Description: "Install new KoelKast SF-123",
      },
      {
        Id: "uniqwo2",
        Name: "WO-0002",
        Status: "In Progress",
        Type: "Maintenance",
        StartDate: "22-04-2016 14:00:00",
        EndDate: "22-04-2016 15:00:00",
        Color: "Green",
        Description: "Check freon on split-system",
      },
      ...fakeOrders(999),
    ],
    filters: [
      {
        id: "open",
        prop: "Status",
        condition: "Equals",
        value: "Open",
        active: false,
      },
      {
        id: "type",
        prop: "Type",
        condition: "Or",
        value: [],
        active: true,
      },
    ],
  });

export const StoreContext = React.createContext(store);
