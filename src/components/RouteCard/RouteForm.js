import React from 'react';
import InputWithAutoComplete from './InputWithAutoComplete';

export default function RouteForm() {
  // prettier-ignore
  return (
    <div className="changeRouteForm">
      <InputWithAutoComplete
        routeID={0}
        departingOrArriving="departing"
        inputProps= {
          {placeholder: "Fra her"}
        }
      />
      <InputWithAutoComplete
        routeID={0}
departingOrArriving="arriving"
      inputProps= {
        {placeholder: "Til her"}
      }/>
    </div>
  );
}
