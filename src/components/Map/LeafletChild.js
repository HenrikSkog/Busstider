import React, { useContext, useEffect } from 'react';
import { Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import Context from '../Context';

export default function LeafletChild({ busLocations }) {
  const { state } = useContext(Context);
  const map = useMap();

  useEffect(() => {
    map.flyTo([state.city.lat, state.city.lon], 14);
  }, [state.city, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {busLocations.map((bus, i) => {
        if (bus.lat && bus.lon) {
          return (
            <Marker position={[bus.lat, bus.lon]} key={bus.id}>
              <Popup>
                {bus.lineNumber}: {bus.routeName}
              </Popup>
            </Marker>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
