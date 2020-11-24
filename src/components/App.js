import '../css/style.css';
import React from 'react';
import Clock from './Clock';
import NewRoute from './RouteCard/NewRoute';
import RouteCards from './RouteCard/RouteCards';

function App() {
  return (
    <>
      <div className="App">
        <div className="container">
          <h1 className="logo">Busskjerm#</h1>
          <Clock />
          <RouteCards />
          <NewRoute />
        </div>
      </div>
    </>
  );
}

export default App;
