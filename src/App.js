import React, { useContext, useState } from "react";
import DatePicker from 'react-date-picker';
import './App.scss';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

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

const TagView = observer(() => {
  const { store } = useContext(StoreContext);
  const events = store.tagged.map((taggedDate) => {
    return {
      title: taggedDate.name,
      date: taggedDate.date,
      allDay: true
    }
  });

  return <FullCalendar
    plugins={[ dayGridPlugin ]}
    initialView="dayGridMonth"
    events={events}
  />;
});

const Root = observer(() => {
  return (
    <div className="App">
      <Tagger />
      <TagView />
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
