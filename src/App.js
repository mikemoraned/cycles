import React, { useContext, useState } from "react";
import DatePicker from 'react-date-picker';
import './App.scss';

import { observer } from "mobx-react-lite";
import { StoreProvider, StoreContext, Store } from "./model/contexts";

const Tagger = observer(() => {
  const { store } = useContext(StoreContext);
  const [tag, setTag] = useState("your tag");
  const [date, setDate] = useState(new Date());

  return <div>
      <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
      <div>
        <DatePicker
          onChange={setDate}
          value={date}
        />
      </div>
      <button className="button" onClick={() => store.addTaggedDate(tag, date)}>Add tag</button>
    </div>;
});

const Root = observer(() => {
  const { store } = useContext(StoreContext);
  
  return (
    <div className="App">
      <div className="timeline">
        <header className="timeline-header">
          <span className="tag is-medium is-primary">Start</span>
        </header>
        {store.tagged.map((taggedDate) => {
          const formattedDate = new Intl.DateTimeFormat("en-UK").format(taggedDate.date);
          return <div className="timeline-item" key={taggedDate.tag}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <p className="heading">{formattedDate}</p>
                <p><span className="tag is-small is-primary">{taggedDate.name}</span></p>
              </div>
            </div>
        })}
        <div className="timeline-header">
          <span className="tag is-medium is-primary">End</span>
        </div>
      </div>
      <Tagger />
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
