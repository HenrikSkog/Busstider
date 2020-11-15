import React, { useContext } from 'react';
import Context from './Context';

export default function NewRoute() {
  const { state, dispatch } = useContext(Context);

  const handleClick = () => {
    dispatch({ type: 'start new' });
    console.log(state);
    setTimeout(() => console.log(state), 300);
  };

  return (
    <div className="newRoute pointer" onClick={handleClick}>
      Ny rute
    </div>
  );
}
