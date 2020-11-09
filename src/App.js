import BusTimes from './BusTimes';
import Clock from './Clock';
import './css/style.css';
import React, { useState } from 'react';
import RouteForm from './RouteForm';

// Endre disse til egne verdier

function App() {
  const app_name = 'Busstider';
  const [departingFrom, setDepartingFrom] = useState('Ila');
  const [arrivingAt, setArrivingAt] = useState('Gløshaugen');

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>
            {departingFrom} til {arrivingAt}
          </h1>
          <h1 className="logo">{app_name}#</h1>
        </div>

        <h1 className="clock">
          <RouteForm
            departingFrom={departingFrom}
            setDepartingFrom={setDepartingFrom}
            arrivingAt={arrivingAt}
            setArrivingAt={setArrivingAt}
          />
          <Clock />
        </h1>
        <div className="routesHeader">
          <h3>Linje</h3>
          <h3>Rute</h3>
          <h3>Ankommer {departingFrom}</h3>
          <h3>Ankommer {arrivingAt}</h3>
        </div>
        <hr />
        <BusTimes />
      </div>
    </div>
  );
}

export default App;
