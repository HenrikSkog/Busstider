import BusTimes from './BusTimes';
import './css/style.css';
import React from 'react';

export default function TimeTable({
  departingFrom,
  departingFromID,
  arrivingAt,
  arrivingAtID,
}) {
  return (
    <div className="container">
      <div className="routesHeader">
        <h3>Linje</h3>
        <h3>Rute</h3>
        <h3>Ankommer {departingFrom}</h3>
        <h3>Ankommer {arrivingAt}</h3>
      </div>
      <hr />
      <BusTimes arrivingAtID={arrivingAtID} departingFromID={departingFromID} />
    </div>
  );
}
