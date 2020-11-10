import React, { useContext } from 'react';
import RouteContext from './RouteContext';
import InputWithAutoComplete from './InputWithAutoComplete';

export default function RouteForm() {
  const {
    setDepartingFrom,
    setArrivingAt,
    setDepartingFromID,
    setArrivingAtID,
    changeRoute,
    setChangeRoute,
  } = useContext(RouteContext);

  // prettier-ignore
  return (
    <div className="changeRouteForm">
      <InputWithAutoComplete
        setID={setDepartingFromID}
        setName={setDepartingFrom}
        initialValue={'Ila'}
      />
      <InputWithAutoComplete
        setID={setArrivingAtID}
        setName={setArrivingAt}
        initialValue={'Gløshaugen'}
      />
      <button type="button" onClick={() => setChangeRoute(!changeRoute)} style={{alignSelf: "baseline"}}>
        Bekreft
      </button>
    </div>
  );
}
