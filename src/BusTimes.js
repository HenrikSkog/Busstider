import React, { useEffect, useState } from 'react';
import createEnturService from '@entur/sdk';
import Route from './Route';

const service = createEnturService({
  clientName: 'busstider',
});

// Endre dette til lengden på turen
const routeLength = 10;

const BusTimes = props => {
  const [busStations, setBusStations] = useState([]);

  useEffect(() => {
    async function generateStops() {
      const stops = await service.getDeparturesBetweenStopPlaces(
        /*
        
        Finn ID til dine stoppesteder her:
        https://developer.entur.org/pages-geocoder-intro
        
          */
        props.departingFromID,
        props.arrivingAtID,
        // Viser her 9 resultat; endre dette om ønskelig
        { limit: 9 }
      );
      setBusStations(stops);
    }

    generateStops();
    const newStopsInterval = setInterval(generateStops, 5000);

    return () => clearInterval(newStopsInterval);
  }, [props.departingFromID, props.arrivingAtID]);

  return (
    <div className="routes">
      {busStations.map(route => {
        return (
          <Route
            key={route.serviceJourney.id}
            route={route}
            routeLength={routeLength}
          />
        );
      })}
    </div>
  );
};

export default BusTimes;
