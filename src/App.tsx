import React from "react";
import { hot } from "react-hot-loader";
import { observer } from "mobx-react";

import Filters from "./components/Filters";
import Order from "./components/Order";
import { store } from "./store";

const App = observer(() => (
  <div className="container mx-auto">
    <Filters />
    {store.results.map((order) => (
      <Order key={order.Id} {...order} />
    ))}
  </div>
));

export default hot(module)(App);
