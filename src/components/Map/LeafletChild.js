import React, { useContext, useEffect } from 'react';
import { Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import Context from '../Context';

export default function LeafletChild({ busLocations }) {
  const { state } = useContext(Context);
  const map = useMap();

  useEffect(() => {
    map.flyTo([state.city.lat, state.city.lon], 14);
  }, [state.city]);

  useMapEvent('click', () => {
    map.setCenter([state.city.lat, state.city.lon]);
  });

  return (
    <>
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
    </>
  );
}
