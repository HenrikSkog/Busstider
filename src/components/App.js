import '../css/style.css';
import React, { useContext } from 'react';
import Context from './Context';
import RouteCard from './RouteCard';
import Clock from './Clock';
import NewRoute from './RouteCard/NewRoute';
import Map from './Map';

function App() {
  const { state } = useContext(Context);
  return (
    <>
      <div className="App">
        <div className="container">
          <h1 className="logo">Busskjerm#</h1>
          <Clock />
          {state.routes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
          <NewRoute />
        </div>
        <Map />
      </div>
    </>
  );
}

export default App;
