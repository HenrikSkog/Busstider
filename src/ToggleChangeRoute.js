import React, { useContext } from 'react';
import Context from './Context';

export default function ToggleChangeRoute() {
  const { dispatch } = useContext(Context);

  return (
    <div
      onClick={() => dispatch({ type: 'TOGGLECHANGEROUTE' })}
      className="toggleChangeRoute pointer"
    >
      Bytt rute
    </div>
  );
}
