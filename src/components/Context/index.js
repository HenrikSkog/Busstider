import React, { useReducer, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';
import {
  setOrGetLocalStorage,
  setLocalStorage,
} from '../hooks/useLocalStorage';

const initalState = setOrGetLocalStorage('state', {
  routes: [
    {
      id: uuidv1(),
      departing: {
        name: 'Ila',
        id: 'NSR:StopPlace:60890',
      },
      arriving: {
        name: 'Gløshaugen',
        id: 'NSR:StopPlace:44085',
      },
      beingEdited: false,
    },
  ],
  city: {
    name: 'Trondheim',
    lat: 63.43,
    lon: 10.395,
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'start new':
      return {
        ...state,
        routes: [
          ...state.routes,
          {
            beingEdited: true,
            id: uuidv1(),
          },
        ],
      };
    case 'delete':
      return {
        ...state,
        routes: state.routes.filter(route => route.id !== action.payload.id),
      };
    case 'start edit':
      return {
        ...state,
        routes: state.routes.map(route => {
          if (route.id === action.payload.id) {
            return { ...route, beingEdited: true };
          }
          return route;
        }),
      };
    case 'make edit':
      return {
        ...state,
        routes: state.routes.map(route => {
          if (route.id === action.payload.id) {
            return { ...route, ...action.payload.route, beingEdited: false };
          }
          return route;
        }),
      };
    case 'change city':
      return {
        ...state,
        city: {
          name: action.payload.name,
          lat: action.payload.lat,
          lon: action.payload.lon,
        },
      };
    default:
      console.error('Reducer did not get known type');
  }
  console.log(state);
};

const Context = React.createContext(initalState);

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    setLocalStorage('state', state);
  }, [state]);

  // custom hook thats equivalent to useState, but persists state in localstorage. Arugments taken are local storage key and initial state value

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export default Context;
