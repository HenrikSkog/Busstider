import Clock from './Clock';
import './css/style.css';
import React, { useState, useEffect, useContext } from 'react';
import RouteForm from './RouteForm';
import ToggleChangeRoute from './ToggleChangeRoute';
import TimeTable from './TimeTable';
import RouteContext, { RouteContextProvider } from './RouteContext';

// Endre disse til egne verdier

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
    });
  }, []);

  const app_name = 'Busstider';

  const { changeRoute } = useContext(RouteContext);

  return (
    <RouteContextProvider>
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
    </RouteContextProvider>
  );
}

export default App;
