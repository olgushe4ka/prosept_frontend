import { MainPage, Page404, Extrapage } from "../../pages/index";
import { Switch, Route, useLocation } from "react-router-dom";

import AppHeader from "../app-header/app-header";

import { Location } from "history";
import AppFooter from "../app-footer/app-footer";

function App() {
  const location = useLocation<{ background: Location }>();

  const background = location.state && location.state?.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/extrapage" exact={true}>
          <Extrapage />
        </Route>

        <Route>
          <Page404 />
        </Route>
      </Switch>
      <AppFooter />
    </>
  );
}

export default App;
