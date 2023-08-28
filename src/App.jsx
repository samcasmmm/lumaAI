import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppMain from "./screen/App";
const App = () => {
  return (
    <Provider store={store}>
      <AppMain />
    </Provider>
  );
};

export default App;
