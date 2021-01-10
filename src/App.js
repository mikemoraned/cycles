import React, { useContext } from "react";
import './App.scss';


import { observer } from "mobx-react-lite";
import { StoreProvider, StoreContext, Store } from "./model/contexts";

const Root = observer(() => {
  const { store } = useContext(StoreContext);

  return (
    <div className="App">
      <div className="timeline">
        <header className="timeline-header">
          <span className="tag is-medium is-primary">Start</span>
        </header>
        {store.tagged.map((taggedDate) => {
          return <div className="timeline-item" key={taggedDate.tag}>
              <div class="timeline-marker"></div>
              <div className="timeline-content">
                <p class="heading">January 2016</p>
                <p><span className="tag is-small is-primary">{taggedDate.tag}</span></p>
              </div>
            </div>
        })}
        <div className="timeline-header">
          <span className="tag is-medium is-primary">End</span>
        </div>
      </div>
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
