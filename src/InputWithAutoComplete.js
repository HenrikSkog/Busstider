import React, { useEffect, useState, useContext } from 'react';
import locationAutocomplete from './locationAutocomplete';
import Context from './Context';

export default function InputWithAutoComplete({
  routeID,
  route,
  setRoute,
  inputProps,
  stopType,
}) {
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function getAutoComplete() {
      const data = await locationAutocomplete(input);
      setAutoCompleteSuggestions(data);
    }
    // runs the api call if there is an input
    if (input) getAutoComplete();
  }, [input]);

  return (
    <div className="inputWithAutoComplete">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        {...inputProps}
      />
      <div className="autoCompleteSuggestions">
        {autoCompleteSuggestions.map(({ id, name, city }) => (
          <div
            className="autoCompleteSuggestion"
            key={id}
            onClick={() => {
              setRoute({ ...route, [stopType]: { id: id, name: name } });
              setInput(name);
            }}
          >
            {`\u27A3 ${name}, ${city}`}
          </div>
        ))}
      </div>
    </div>
  );
}
