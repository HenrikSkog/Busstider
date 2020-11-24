import '../css/style.css';
import React, { useContext, useEffect } from 'react';
import Context from './Context';
import Clock from './Clock';
import NewRoute from './RouteCard/NewRoute';
import RouteCards from './RouteCard/RouteCards';

function App() {
  const { state } = useContext(Context);
  useEffect(() => {
    alert(
      JSON.stringify(state) +
        '----------------------' +
        JSON.stringify(localStorage.getItem('state'))
    );
  }, [state]);
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
