import React, { useState, useEffect, useContext } from 'react';
import RouteContext from './RouteContext';
import locationAutocomplete from './locationAutocomplete';

export default function RouteForm() {
  const {
    setDepartingID,
    setDepartingFrom,
    setArrivalID,
    setArrivalFrom,
  } = useContext(RouteContext);

  const [autoComplete, setAutoComplete] = useState([]);

  const [departingFromQuery, setDepartingFromQuery] = useState(
    'Weidemannsveien'
  );
  const [arrivingAtQuery, setArrivingAtQuery] = useState('Høgskoleringen');

  useEffect(() => {
    async function getAutoComplete() {
      const data = await locationAutocomplete(departingFromQuery);
      setAutoComplete(data);
    }
    getAutoComplete();
  }, [departingFromQuery, arrivingAtQuery]);
  return (
    <>
      <input
        type="text"
        value={departingFromQuery}
        onChange={e => setDepartingFromQuery(e.target.value)}
      />
      <input
        type="text"
        value={arrivingAtQuery}
        onChange={e => setArrivingAtQuery(e.target.value)}
      />
      {autoComplete.map(feature => {
        return (
          <div
            className="autoCompleteSuggestion"
            key={feature.id}
            onClick={() => {
              setDepartingID(feature.id);
              setDepartingFrom(feature.name);
            }}
          >
            {`${feature.name}, ${feature.city}`}
          </div>
        );
      })}
    </>
  );
}
