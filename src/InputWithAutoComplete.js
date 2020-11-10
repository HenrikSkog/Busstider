import React, { useEffect, useState } from 'react';
import locationAutocomplete from './locationAutocomplete';

export default function InputWithAutoComplete(props) {
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [input, setInput] = useState(props.initialValue);

  console.log(input);

  useEffect(() => {
    async function getAutoComplete() {
      const data = await locationAutocomplete(input);
      setAutoCompleteSuggestions(data);
    }
    getAutoComplete();
  }, [input]);

  return (
    <div className="inputWithAutoComplete">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
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
