import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route path="/:username" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
