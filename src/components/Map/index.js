import React, { useEffect, useState, useContext, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Context from '../Context';
import geocodeFetch from '../geocodeFetch';
import getBusLocations from './getBusLocations';
import LeafletChild from './LeafletChild';

export default function Leaflet() {
  const [busLocations, setBusLocations] = useState([]);
  const [busInterval, setBusInterval] = useState(true);
  const { state, dispatch } = useContext(Context);
  const cityRef = useRef();

  const style = {
    height: '380px',
  };

  function geoFetch() {
    geocodeFetch('Trondheim').then(data => console.log(data));
  }

  async function handleGetBuses() {
    const busesObjects = await getBusLocations();
    if (busesObjects) setBusLocations(busesObjects);
  }

  async function startBusInterval() {
    setBusInterval(true);
    console.log('Bus interal function is ran');
    await handleGetBuses();
    console.log('Got buses');
    if (busInterval) setTimeout(startBusInterval, 5000);
  }

  async function handleChangeCity() {
    try {
      const data = await geocodeFetch(cityRef.current.value);
      const { lat, lng: lon } = data.results[0].geometry.location;

      dispatch({
        type: 'change city',
        payload: { name: cityRef.current.value, lat, lon },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={startBusInterval}>Start</button>
      <button onClick={() => setBusInterval(false)}>Slutt</button>
      <button onClick={geoFetch}>Skaff koordinater</button>
      <input ref={cityRef} />
      <button onClick={handleChangeCity}>Bytt by</button>
      <MapContainer
        center={[state.city.lat, state.city.lon]}
        zoom={14}
        style={style}
      >
        <LeafletChild busLocations={busLocations} />
      </MapContainer>
    </>
  );
}
