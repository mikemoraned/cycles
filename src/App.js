import React, { useContext, useState } from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import { observer } from "mobx-react-lite";
import { StoreProvider, StoreContext, Store } from "./model/contexts";

import './App.scss';

const Tagger = observer(() => {
  const { store } = useContext(StoreContext);
  const [tag, setTag] = useState("your tag");
  
  return <div>
      <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
      <button className="button" onClick={() => store.addTaggedDate(tag, new Date())}>Add tag</button>
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
