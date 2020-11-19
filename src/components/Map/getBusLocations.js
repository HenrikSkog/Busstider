import xmlToJson from '../helpers/xmlToJson';

export default async function getBusLocations() {
  const result = await fetch(
    'https://api.entur.io/realtime/v1/rest/vm?datasetId=KOL',
    {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
  const rawData = await result.text();
  const dataXML = new DOMParser().parseFromString(rawData, 'text/xml');
  // returns: data, array with all buses
  const {
    Siri: {
      ServiceDelivery: {
        VehicleMonitoringDelivery: { VehicleActivity: data },
      },
    },
  } = xmlToJson(dataXML);

  const busesWithLocation = data
    .map(bus => {
      if (
        Object.keys(bus.MonitoredVehicleJourney.VehicleLocation).length === 2
      ) {
        let busKey = bus.MonitoredVehicleJourney;
        return {
          lat: busKey.VehicleLocation.Latitude,
          lon: busKey.VehicleLocation.Longitude,
          lineNumber: busKey.PublishedLineName,
          id: busKey.VehicleRef,
          routeName: busKey.RouteRef,
        };
      }
      // check that bus is defined
    })
    .filter(bus => bus);

  return busesWithLocation;
}
