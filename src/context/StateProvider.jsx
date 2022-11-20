import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StatePorvider = ({ reducer, initialState, children }) => (
    // updates components and userdata to access them all over the components
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);