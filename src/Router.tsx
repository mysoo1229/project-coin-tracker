import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CoinEach from './Routes/CoinEach';
import CoinList from './Routes/CoinList';

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <CoinEach />
        </Route>
        <Route path="/">
          <CoinList />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
