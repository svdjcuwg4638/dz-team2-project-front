import React, { useEffect, useState } from 'react'

const AutoCompleteLocation = ({ locationAll, setSelectedLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setSuggestions(locationAll?.filter((l) => l.location_name.includes(input)));
  }, [input, locationAll]);

  useEffect(() => {
    const matchingLocation = locationAll?.find((l) => l.location_name === input);
    if (matchingLocation) {
      setSelectedLocation(matchingLocation);
    }
  }, [input, locationAll, setSelectedLocation]);

  const onSelect = (location) => {
    setInput(location.location_name);
    setSelectedLocation(location);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <table
        className="right_input_sel"
        style={
          input === "" || suggestions.length < 0 || suggestions.length == 0 || suggestions[0].location_name == input
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <tbody>
          {suggestions.map((l) => (
            <tr>
              <td key={l.location_id} onClick={() => onSelect(l)}>
                {l.location_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default AutoCompleteLocation