import React, { useContext, useState } from "react";
import './App.css';
import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';

import { observer } from "mobx-react-lite";
import { StoreProvider, StoreContext, Store } from "./model/contexts";

const Root = observer(() => {
  const { store } = useContext(StoreContext);
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <div className="App">
      <button onClick={() => store.addTaggedDate("some_tag")}>Click Me</button>
      <ul>
      {store.tagged.map((taggedDate) => {
        return <li key={taggedDate.tag}>{taggedDate.tag}</li>
      })}
      </ul>
      <Calendar
        onChange={onChange}
        value={value}
      />
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
