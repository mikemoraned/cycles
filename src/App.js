import React, { useContext, useState } from "react";
import DatePicker from 'react-date-picker';
import './App.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

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
  
  function dateClick(e) {
    console.log(e);
    store.addTaggedDate("tag", e.date)
  }

  return <FullCalendar
    plugins={[ dayGridPlugin, interactionPlugin ]}
    initialView="dayGridMonth"
    events={store.fullCalendarEvents}
    dateClick={dateClick}
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
