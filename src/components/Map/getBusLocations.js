export default async function getBusLocations() {
  const result = await fetch(
    'https://api.entur.io/realtime/v1/rest/vm?datasetId=ATB'
  );
  const parser = new DOMParser();
  const data = await result.text();
  const xmlData = parser.parseFromString(data, 'text/xml');

  const busesXML = xmlData.querySelectorAll(
    'Siri > ServiceDelivery > VehicleMonitoringDelivery > VehicleActivity'
  );

  console.log(xmlData);
  let busesObjects = [];
  for (let i = 0; i < busesXML.length; i++) {
    let lon = busesXML[i].querySelector(
      'MonitoredVehicleJourney > VehicleLocation > Longitude'
    );
    let lat = busesXML[i].querySelector(
      'MonitoredVehicleJourney > VehicleLocation > Latitude'
    );

    let lineNumber = busesXML[i].querySelector(
      'MonitoredVehicleJourney > PublishedLineName'
    );

    let destinationName = busesXML[i].querySelector(
      'MonitoredVehicleJourney > DestinationName'
    );

    if (lon) lon = Number(lon.textContent);
    if (lat) lat = Number(lat.textContent);
    if (lineNumber) lineNumber = lineNumber.textContent;
    if (destinationName) destinationName = destinationName.textContent;

    let bus = { pos: [lat, lon], lineNumber, destinationName };

    if (lon && lat) {
      console.log('skjer');
      busesObjects = [...busesObjects, bus];
    }
  }
  return busesObjects;
}
