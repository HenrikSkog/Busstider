import React, { useContext, useEffect } from 'react';
import Context from '../Context';
import RouteCard from './index';

export default function RouteCards() {
  const { state } = useContext(Context);
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(console.log, console.log);
  });
  return (
    <div className="routeContainer">
      {state.routes.map(route => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
}
