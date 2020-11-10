import React, { useContext } from 'react';
import RouteContex from './RouteContext';

export default function ToggleChangeRoute() {
  const { setChangeRoute, changeRoute } = useContext(RouteContex);

  return (
    <div
      onClick={() => setChangeRoute(!changeRoute)}
      className="toggleChangeRoute pointer"
    >
      Bytt rute
    </div>
  );
}
