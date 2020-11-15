import React from 'react';
import EditRoute from './EditRoute';
import TimeTable from './TimeTable';
import RouteCardHeader from './RouteCardHeader';

export default function RouteCard({ route }) {
  return (
    <div className="spesificRouteOuterContainer">
      <RouteCardHeader route={route} />
      {!route.beingEdited ? (
        <TimeTable route={route} />
      ) : (
        <EditRoute id={route.id} />
      )}
    </div>
  );
}
