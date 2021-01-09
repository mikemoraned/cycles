import React from "react";
import { types } from "mobx-state-tree";

export const TaggedDate = types
  .model("TaggedDate", {
      tag: types.string
  })
  .actions((self) => ({}))
  .views((self) => ({}));

export const Store = types
  .model({
    tagged: types.array(TaggedDate)
  })
  .actions((self) => ({
      addTaggedDate(tagName) {
          self.tagged.push(TaggedDate.create({ tag: tagName }));
      }
  }))
  .views((self) => ({}));

export const StoreContext = React.createContext(null);

export const StoreProvider = ({ initialStore, children }) => {
  return (
    <StoreContext.Provider value={{ store: initialStore }}>
      {children}
    </StoreContext.Provider>
  );
};