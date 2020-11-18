import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function Leaflet() {
  const [busLocations, setBusLocations] = useState([]);

  const style = {
    height: '380px',
  };

  async function getBusLocations() {
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
    console.log(busesObjects);
    setBusLocations(busesObjects);
  }

  function log() {
    console.log(busLocations);
  }

  return (
    <>
      <button onClick={getBusLocations}>Skaff resultater</button>
      <button onClick={log}>Skaff resultater</button>
      <MapContainer
        center={[63.43, 10.395]}
        zoom={14}
        scrollWheelZoom={false}
        style={style}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {busLocations.map((bus, i) => {
          if (bus.pos[0] && bus.pos[1]) {
            return (
              <Marker position={bus.pos} key={i}>
                <Popup>
                  {bus.lineNumber}: {bus.destinationName}
                </Popup>
              </Marker>
            );
          }
        })}
      </MapContainer>
    </>
  );
}
