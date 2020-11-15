import React from 'react';
import EditRouteForm from './edit/EditRouteForm';
import TimeTable from './TimeTable';
import RouteCardHeader from './RouteCardHeader';

export default function RouteCard({ route }) {
  return (
    <div className="spesificRouteOuterContainer">
      <RouteCardHeader route={route} />
      {!route.beingEdited ? (
        <TimeTable route={route} />
      ) : (
        <EditRouteForm id={route.id} />
      )}
    </div>
  );
}
