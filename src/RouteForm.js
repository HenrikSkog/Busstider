import React, { useState, useEffect } from 'react';
import locationAutocomplete from './locationAutocomplete';

export default function RouteForm(props) {
  const [autoComplete, setAutoComplete] = useState([]);

  const [departingFromQuery, setDepartingFromQuery] = useState(
    'Weidemannsveien'
  );
  const [arrivingAtQuery, setArrivingAtQuery] = useState('');

  useEffect(() => {
    async function getAutoComplete() {
      const data = await locationAutocomplete(departingFromQuery);
      setAutoComplete(data);
    }
    getAutoComplete();
  }, [departingFromQuery]);
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
              props.setDepartingID(feature.id);
              props.setDepartingFrom(feature.name);
            }}
          >
            {`${feature.name}, ${feature.city}`}
          </div>
        );
      })}
    </>
  );
}
