import React, { createContext } from "react";

export const CategoriaContext = createContext();

export const { Provider, Consumer } = CategoriaContext;

export const withContext = Component => props => (
  <Consumer>{value => <Component {...value} {...props} />}</Consumer>
);
