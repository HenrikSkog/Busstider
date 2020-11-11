import BusTimes from './BusTimes';
import Clock from './Clock';
import './css/style.css';
import React, { useState, useEffect } from 'react';
import RouteForm from './RouteForm';
import RouteContex from './RouteContext';
import ToggleChangeRoute from './ToggleChangeRoute';
import useLocalStorage from './useLocalStorage';
import TimeTable from './TimeTable';

// Endre disse til egne verdier

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
    });
  }, []);

  const app_name = 'Busstider';
  // custom hook thats equivalent to useState, but persists state in localstorage. Arugments taken are local storage key and initial state value
  const [departingFrom, setDepartingFrom] = useLocalStorage(
    'departingFromName',
    'Ila'
  );
  const [arrivingAt, setArrivingAt] = useLocalStorage(
    'arrivingAtName',
    'Gløshaugen'
  );

  const [changeRoute, setChangeRoute] = useState(false);

  const [departingFromID, setDepartingFromID] = useLocalStorage(
    'departingFromID',
    'NSR:StopPlace:60890'
  );
  const [arrivingAtID, setArrivingAtID] = useLocalStorage(
    'arrivingAtID',
    'NSR:StopPlace:44085'
  );

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
      <ToggleChangeRoute />
      {changeRoute && <RouteForm />}
      <div className="App">
        <div className="container">
          <div className="header">
            <h1>
              {departingFrom} til {arrivingAt}
            </h1>
            <h1 className="logo">{app_name}#</h1>
          </div>
          <div className="clock">
            <Clock />
          </div>
          <TimeTable
            departingFrom={departingFrom}
            departingFromID={departingFromID}
            arrivingAt={arrivingAt}
            arrivingAtID={arrivingAtID}
          />
        </div>
      </div>
    </RouteContex.Provider>
  );
}

export default App;
