import React, { useEffect, useState } from 'react';
import createEnturService from '@entur/sdk';
import Route from './Route';

const service = createEnturService({
  clientName: 'busstider',
});

// Endre dette til lengden på turen
const routeLength = 10;
const numberOfStops = 5;

const BusTimes = ({ route }) => {
  const [busStations, setBusStations] = useState([]);

  useEffect(() => {
    async function generateStops() {
      try {
        const stops = await service.getDeparturesBetweenStopPlaces(
          /*
          
          Finn ID til dine stoppesteder her:
          https://developer.entur.org/pages-geocoder-intro
          
            */
          route.departing.id,
          route.arriving.id,
          // Viser her 9 resultat; endre dette om ønskelig
          { limit: numberOfStops }
        );
        setBusStations(stops);
      } catch (error) {
        console.log('Error while fetching stops, msg: ', error);
      }
    }
    generateStops();
    const newStopsInterval = setInterval(generateStops, 5000);
    console.log(route);
    return () => clearInterval(newStopsInterval);
  }, [route]);

  return (
    <div className="routes">
      {busStations.map(routeItem => {
        return (
          <Route
            key={routeItem.serviceJourney.id}
            route={routeItem}
            routeLength={routeLength}
          />
        );
      })}
    </div>
  );
};

export default BusTimes;
