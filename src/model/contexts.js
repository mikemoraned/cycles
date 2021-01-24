import React from "react";
import { types } from "mobx-state-tree";

export const TaggedDate = types
  .model("TaggedDate", {
      name: types.string,
      date: types.Date
  })
  .actions((self) => ({}))
  .views((self) => ({}));

export const Store = types
  .model({
    tagged: types.array(TaggedDate)
  })
  .actions((self) => ({
      addTaggedDate(name, date) {
          self.tagged.push(TaggedDate.create({ name, date }));
      }
  }))
  .views((self) => ({
    get fullCalendarEvents() {
      return self.tagged.map((taggedDate) => {
        return {
          title: taggedDate.name,
          date: taggedDate.date,
          allDay: true
        }
      });
    }
  }));

export const StoreContext = React.createContext(null);

export const StoreProvider = ({ initialStore, children }) => {
  return (
    <StoreContext.Provider value={{ store: initialStore }}>
      {children}
    </StoreContext.Provider>
  );
};