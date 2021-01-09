import React from "react";
import { types } from "mobx-state-tree";

export const Store = types
  .model({})
  .actions((self) => ({}))
  .views((self) => ({}));

export const StoreContext = React.createContext(null);

export const StoreProvider = ({ initialStore, children }) => {
  return (
    <StoreContext.Provider value={{ store: initialStore }}>
      {children}
    </StoreContext.Provider>
  );
};