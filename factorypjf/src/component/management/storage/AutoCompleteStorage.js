import React, { useState, useEffect } from "react";

const AutoCompleteStorage = ({ storageAll, setSelectedStorage }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  console.log('storage',storageAll);

  useEffect(() => {
    setSuggestions(storageAll?.filter((s) => s.storage_name.includes(input)));
  }, [input, storageAll]);

  useEffect(() => {
    const matchingStorage = storageAll?.find((s) => s.storage_name === input);
    if (matchingStorage) {
      setSelectedStorage(matchingStorage);
    }
  }, [input, storageAll, setSelectedStorage]);

  const onSelect = (storage) => {
    setInput(storage.storage_name);
    setSelectedStorage(storage);
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
          input === "" || suggestions.length < 0 || suggestions.length == 0 || suggestions[0].storage_name == input
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <tbody>
          {suggestions.map((s) => (
            <tr>
              <td key={s.storage_id} onClick={() => onSelect(s)}>
                {s.storage_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutoCompleteStorage;
