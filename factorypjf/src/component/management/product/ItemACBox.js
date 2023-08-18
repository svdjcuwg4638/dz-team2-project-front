import React, { useEffect, useState } from "react";

const ItemACBox = ({
  itemAll,selectData,setSelectedItem,filterBy,itemIndex
}) => {

  const [filteredItems, setFilteredItems] = useState([]);
  const [inputData, setInputData] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  const [blurTimeout, setBlurTimeout] = useState(null);


  
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSelectItem = (item) => {
    setSelectedItem(item, itemIndex);
    setInputData(item[filterBy])
    setShowSuggestions(false);
  };

  useEffect(() => {
    const newFilteredItems = itemAll.data.filter((item) =>
    
    item[filterBy]?.toLowerCase().startsWith(inputData?.toLowerCase())
    );
    setFilteredItems(newFilteredItems);
  }, [inputData]);


  const handleKeyDown = (e) => {
    if (showSuggestions && filteredItems.length > 0) {
      if (e.key === "Tab") {
        e.preventDefault();
        const nextIndex = (focusedItemIndex + 1) % filteredItems.length;
        setFocusedItemIndex(nextIndex);
      } else if (e.key === "Enter" && focusedItemIndex !== -1) {
        const selectedItem = filteredItems[focusedItemIndex];
        handleSelectItem(selectedItem);
      }
    }
  };

  return (
    <div>
      <input
        value={selectData}
        onChange={(e) => {
          setInputData(e.target.value);
          setShowSuggestions(true);
          setSelectedItem(null,itemIndex)
        }}
        onFocus={() => setFocusedField("code")}
        onBlur={() => {
          const timeout = setTimeout(() => {
            setFocusedField("code");
          }, 100);
          setBlurTimeout(timeout);
        }}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions &&
        focusedField === "code" &&
        inputData &&
        filteredItems.length > 0 && (
          <div>
            <div className="codeACBox_wrap">
              {filteredItems.map((item, index) => (
                <div className="codeACBox">
                  <div
                    key={item.item_id}
                    onClick={() => {
                      if (blurTimeout) clearTimeout(blurTimeout);
                      handleSelectItem(item);
                    }}
                    style={{
                      border:
                        index === focusedItemIndex
                          ? "3px solid #000"
                          : "1px solid #000",
                    }}
                  >
                    {item.itemSKU}
                  </div>
                  <div
                    onClick={() => {
                      if (blurTimeout) clearTimeout(blurTimeout);
                      handleSelectItem(item);
                    }}
                    style={{
                      border:
                        index === focusedItemIndex
                          ? "3px solid #000"
                          : "1px solid #000",
                    }}
                  >
                    {item.item_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default ItemACBox;
