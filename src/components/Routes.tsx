import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "../pages/Home";
import { Orders } from "../pages/Orders";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/orders" exact component={Orders} />
      </Switch>
    </BrowserRouter>
  );
};
