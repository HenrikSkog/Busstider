import React, { useContext } from 'react';
import EditRoute from './EditRoute';
import TimeTable from './TimeTable';
import Context from './Context';

export default function BigRoute({ route }) {
  const { dispatch } = useContext(Context);
  return (
    <div className="spesificRouteOuterContainer">
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
            &#10006;
          </span>
        </div>
      </div>
      {!route.beingEdited ? (
        <TimeTable route={route} />
      ) : (
        <EditRoute id={route.id} />
      )}
    </div>
  );
}
