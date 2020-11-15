import './css/style.css';
import React, { useContext } from 'react';
import RouteForm from './RouteForm';
import ToggleChangeRoute from './ToggleChangeRoute';
import Context from './Context';
import BigRoute from './BigRoute';
import Clock from './Clock';
import NewRoute from './NewRoute';

function App() {
  const { state } = useContext(Context);
  return (
    <>
      <div className="App">
        <div className="container">
          <h1 className="logo">Bussruter#</h1>
          <Clock />
          {state.routes.map(route => (
            <BigRoute key={route.id} route={route} />
          ))}
          <NewRoute />
        </div>
      </div>
    </>
  );
}

export default App;
