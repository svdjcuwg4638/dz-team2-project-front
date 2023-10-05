import React, { useEffect, useRef,useState } from 'react'

function DetailSearchTable({ detailFormData, BoundId }) {

  const filteredDetails = detailFormData.filter(detail => detail.bound_id === BoundId);

  const inputRef = useRef(null);

  // 상태를 추가하여 각 detail의 item_code 값을 관리합니다.
  const [inputValues, setInputValues] = useState(filteredDetails.map(detail => detail.item_code));

  // input 값 변경 핸들러
  const handleInputChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  }

  return (
    <table>
      <tbody>
        {filteredDetails.map((detail, index) => (
          <tr key={index}>
            <input
                  type="checkbox"
                  name='check'
            ></input>
            <td>
              <input 
                type="text"
                ref={inputRef}
                // value={detail.item_code}
                onChange={event => handleInputChange(index, event)}
              />
            </td>
            <td>{detail.item_name}</td>
            <td>{detail.amount}</td>
            <td>{detail.bound_date}</td>
            <td>{detail.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DetailSearchTable;