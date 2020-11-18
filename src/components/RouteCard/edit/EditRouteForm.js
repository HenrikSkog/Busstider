import React, { useState, useContext } from 'react';
import InputWithAutoComplete from '../../InputWithAutoComplete';
import Context from '../../Context';

export default function EditRouteForm({ id }) {
  const { dispatch } = useContext(Context);
  const [route, setRoute] = useState({});

  return (
    <div className="EditRouteFormContainer">
      <InputWithAutoComplete
        routeID={id}
        route={route}
        setRoute={setRoute}
        inputProps={{ placeholder: 'Fra her' }}
        stopType="departing"
      />
      <InputWithAutoComplete
        routeID={id}
        route={route}
        setRoute={setRoute}
        inputProps={{ placeholder: 'Til her' }}
        stopType="arriving"
      />
      <button
        className="btn pointer"
        onClick={() =>
          dispatch({ type: 'make edit', payload: { route: route, id: id } })
        }
      >
        Lag rute
      </button>
    </div>
  );
}
