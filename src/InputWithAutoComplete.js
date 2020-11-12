import React, { useEffect, useState } from 'react';
import locationAutocomplete from './locationAutocomplete';

export default function InputWithAutoComplete(props) {
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [input, setInput] = useState(props.initialValue);

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
        {...props.inputProps}
      />
      <div className="autoCompleteSuggestions">
        {autoCompleteSuggestions.map(({ id, name, city }, index) => (
          <div
            className="autoCompleteSuggestion"
            key={id}
            onClick={() => {
              // setting the stop id and stop name
              props.setID(id);
              props.setName(name);
              setInput(name);
              setAutoCompleteSuggestions([]);
            }}
          >
            {`\u27A3 ${name}, ${city}`}
          </div>
        ))}
      </div>
    </div>
  );
}
