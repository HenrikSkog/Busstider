import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';

const RouteContex = React.createContext();

export function RouteContextProvider({ children }) {
  // custom hook thats equivalent to useState, but persists state in localstorage. Arugments taken are local storage key and initial state value
  const [departingFrom, setDepartingFrom] = useLocalStorage(
    'departingFromName',
    'Ila'
  );
  const [arrivingAt, setArrivingAt] = useLocalStorage(
    'arrivingAtName',
    'Gløshaugen'
  );

  const [departingFromID, setDepartingFromID] = useLocalStorage(
    'departingFromID',
    'NSR:StopPlace:60890'
  );
  const [arrivingAtID, setArrivingAtID] = useLocalStorage(
    'arrivingAtID',
    'NSR:StopPlace:44085'
  );

  const [changeRoute, setChangeRoute] = useState(false);

  return (
    <RouteContex.Provider
      value={{
        departingFrom,
        setDepartingFrom,
        arrivingAt,
        setArrivingAt,
        departingFromID,
        setDepartingFromID,
        arrivingAtID,
        setArrivingAtID,
        changeRoute,
        setChangeRoute,
      }}
    >
      {children}
    </RouteContex.Provider>
  );
}

export default RouteContex;
