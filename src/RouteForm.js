import React, { useState } from 'react';

export default function RouteForm(props) {
  return (
    <>
      <input
        type="text"
        value={props.departingFrom}
        onChange={e => props.setDepartingFrom(e.target.value)}
      />
      <input
        type="text"
        value={props.arrivingAt}
        onChange={e => props.setArrivingAt(e.target.value)}
      />
    </>
  );
}
