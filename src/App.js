import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListPage from "./ListPage";
import ShowData from "./ShowData";
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ListPage} />
          <Route path="/show-data" component={ShowData} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
