import React, { useContext } from 'react';
import RouteContext from './RouteContext';
import InputWithAutoComplete from './InputWithAutoComplete';

export default function RouteForm() {
  const {
    setDepartingFrom,
    setArrivingAt,
    setDepartingFromID,
    setArrivingAtID,
  } = useContext(RouteContext);

  // prettier-ignore
  return (
    <div className="changeRouteForm">
      <InputWithAutoComplete
        setID={setDepartingFromID}
        setName={setDepartingFrom}
        initialValue={''}
        inputProps= {
          {placeholder: "Fra her"}
        }
      />
      <InputWithAutoComplete
        setID={setArrivingAtID}
        setName={setArrivingAt}
        initialValue={''}
      inputProps= {
        {placeholder: "Til her"}
      }/>
    </div>
  );
}
