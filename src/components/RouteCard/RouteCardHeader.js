import React, { useContext } from 'react';
import Context from '../Context';

export default function RouteCardHeader({ route }) {
  const { dispatch } = useContext(Context);
  return (
    <div className="header">
      <h1>
        {!route.beingEdited &&
          `${route.departing.name} til ${route.arriving.name}`}
      </h1>
      <div>
        <span
          className="delete pointer"
          onClick={() =>
            dispatch({ type: 'delete', payload: { id: route.id } })
          }
        >
          &#128465;
        </span>
      </div>
    </div>
  );
}
