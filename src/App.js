import React, { useContext } from "react";
import './App.css';

import { observer } from "mobx-react-lite";
import { StoreProvider, StoreContext, Store } from "./model/contexts";

const Root = observer(() => {
  const { store } = useContext(StoreContext);
  return (
    <div className="App">
      <button onClick={() => store.addTaggedDate("some_tag")}>Click Me</button>
      <ul>
      {store.tagged.map((taggedDate) => {
        return <li key={taggedDate.tag}>{taggedDate.tag}</li>
      })}
      </ul>
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
