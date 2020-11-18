import React, { useEffect, useState, useContext } from 'react';
import Context from './Context';
import locationAutocomplete from './locationAutocomplete';

export default function InputWithAutoComplete({
  route,
  setRoute,
  inputProps,
  stopType,
}) {
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [input, setInput] = useState('');
  const { state } = useContext(Context);

  useEffect(() => {
    async function getAutoComplete() {
      const data = await locationAutocomplete(input, state.city);
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
