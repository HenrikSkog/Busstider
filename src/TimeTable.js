import BusTimes from './BusTimes';
import './css/style.css';
import React from 'react';

export default function TimeTable({ route }) {
  return (
    <div className="spesificRouteContainer">
      <div className="routesHeader">
        <h3>Linje</h3>
        <h3>Rute</h3>
        <h3>Ankommer {route.departing.name}</h3>
        <h3>Ankommer {route.arriving.name}</h3>
      </div>
      <hr />
      <BusTimes route={route} />
    </div>
  );
}
