import React, { useEffect, useState } from "react";

const EditAutoComplete = ({ storageAll, locationAll, setEditedData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  // 입력값이 창고리스트에 포함되는지 판별하여 suggestions에 저장
  useEffect(() => {
    setSuggestions(storageAll?.filter((s) => s.storage_name.includes(input)));
  }, [input, storageAll]);

  useEffect(() => {
    const matchingStorage = storageAll?.find((s) => s.storage_name === input);
    if (matchingStorage) {
      setEditedData((prev) => ({
        ...prev,
        storage_id: matchingStorage.storage_id,
        storage_name: matchingStorage.storage_name,
        location_id: locationAll.location_id, 
        location_name: locationAll.location_name,
      }));
    }
  }, [input, storageAll, setEditedData]);

  // 선택시 값을 input에 넣어줌
  const onSelect = (storage) => {
    setInput(storage.storage_name);
    setSuggestions([]);
    setEditedData((prev) => ({
      ...prev,
      storage_id: storage.storage_id,
      storage_name: storage.storage_name,
      location_id: locationAll.location_id, // location_id 추가
      location_name: locationAll.location_name, // location_name 추가
    }));
  };

  return (
    <td>
      <input 
        type="text" 
        onChange={(e) => setInput(e.target.value)} 
        value={input}
      />
      <div>
        <table
          className="right_deit_sel"
          style={
            input === "" ||
            suggestions.length === 0 ||
            (suggestions.length === 1 && suggestions[0].storage_name === input)
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <tbody>
            {suggestions.map((s) => (
              <tr key={s.storage_id} onClick={() => onSelect(s)}>
                <td>{s.storage_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </td>
  );
};

export default EditAutoComplete;
