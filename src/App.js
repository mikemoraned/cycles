import React, { useContext, useState } from "react";
import './App.scss';


import { observer } from "mobx-react-lite";
import { StoreProvider, StoreContext, Store } from "./model/contexts";

const Root = observer(() => {
  const { store } = useContext(StoreContext);

  return (
    <div className="App">
      <ul>
      {store.tagged.map((taggedDate) => {
        return <li key={taggedDate.tag}>{taggedDate.tag}</li>
      })}
      </ul>
      <button className="button" onClick={() => store.addTaggedDate("some_tag")}>Click Me</button>
    </div>
  );
});

const App = () => {
  const store = Store.create({});
  return <StoreProvider initialStore={store}>
    <Root />
  </StoreProvider>
};

export default App;
