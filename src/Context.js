import React, { useState, useReducer } from 'react';
import { getLocalStorage } from './useLocalStorage';

const Context = React.createContext();

export function ContextProvider({ children }) {
  const initalState = {
    routes: [
      {
        id: 0,
        departing: {
          name: 'Ila',
          id: 'NSR:StopPlace:60890',
        },
        arriving: {
          name: 'Gløshaugen',
          id: 'NSR:StopPlace:44085',
        },
      },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'NEWROUTE':
        return {
          ...state,
          routes: [
            ...state.routes,
            {
              id: action.payload.id,
              departing: {
                name: action.payload.departing.name,
                id: action.payload.departing.id,
              },
              arriving: {
                name: action.payload.arriving.name,
                id: action.payload.arriving.id,
              },
            },
          ],
        };
      default:
        console.error('Reducer did not get known type');
    }
  };

  const [state, dispatch] = useReducer(reducer, initalState);

  // custom hook thats equivalent to useState, but persists state in localstorage. Arugments taken are local storage key and initial state value

  const [changeRoute, setChangeRoute] = useState(false);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        setChangeRoute,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
