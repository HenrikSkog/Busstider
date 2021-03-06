import React from 'react';

export default function Route(props) {
  const route = props.route;

  let arrival_at_destination;

  let departure_from_origin;

  if (
    route.aimedArrivalTime.slice(11, 16) ===
    route.expectedDepartureTime.slice(11, 16)
  ) {
    departure_from_origin = (
      <h3 className="g-bg">{route.aimedArrivalTime.slice(11, 16)}</h3>
    );
  } else {
    departure_from_origin = (
      <div className="updatedArrivalTime">
        <h3 className="ignoreTime">{route.aimedArrivalTime.slice(11, 16)}</h3>
        <h3 className="correctTime">
          {route.expectedDepartureTime.slice(11, 16)}
        </h3>
      </div>
    );
  }

  if (
    route.aimedArrivalTime.slice(11, 16) ===
    route.expectedDepartureTime.slice(11, 16)
  ) {
    arrival_at_destination = new Date(
      // Had to add milliseconds for Safari support
      route.aimedArrivalTime.slice(0, 19) + '.000+01:00'
    );
  } else {
    arrival_at_destination = new Date(
      route.expectedDepartureTime.slice(0, 19) + '.000+01:00'
    );
  }

  arrival_at_destination.setMinutes(
    arrival_at_destination.getMinutes() + props.routeLength
  );
  arrival_at_destination = new Date(arrival_at_destination.getTime());

  return (
    <div className="RouteWrapper">
      <div className="Route">
        <div className="routeIcon">
          <h2>{route.serviceJourney.journeyPattern.line.publicCode}</h2>
        </div>
        <h3>{route.destinationDisplay.frontText}</h3>
        {departure_from_origin}
        <h3>ca. {arrival_at_destination.toTimeString().slice(0, 5)}</h3>
      </div>
      <hr />
    </div>
  );
}
