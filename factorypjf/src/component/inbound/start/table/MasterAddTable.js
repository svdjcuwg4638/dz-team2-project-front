import React, { useEffect, useState } from 'react';
import tableStyle from '../../../../style/inbound/inbound.module.css'

function MasterAddTable({ masterFormdata,
  setMasterFormdata,
  maxBoundId,
  rowCount,
  setRowCount,
  setClickBoundId,
  setMaxBoundId,
  setConfigBoundId,
  setDetailFormData }) {

    const addRowHandler = () => {
      setRowCount(rowCount + 1);
      setMaxBoundId(maxBoundId+1);
      const maxBoundIdInFormData = Math.max(...masterFormdata.map((row) => row.bound_id));
      const newBoundId = maxBoundIdInFormData + 1;
    
      // 마스터 데이터 추가
      setMasterFormdata((prevData) => [
        ...prevData,
        {
          emp_id: 1,
          bound_id: newBoundId,
          bound_no: "",
          bound_type: "",
          partner_name: "",
          bound_date: "",
        },
      ]);
    
      // 3개의 디테일 데이터 추가
      for (let i = 0; i < 3; i++) {
        setDetailFormData(prevData => [
          ...prevData,
          {
            bound_id: newBoundId,
            item_code: "",
            item_name: "",
            amount: "",
            bound_date: "",
            description: "",
          }
        ]);
      }
    
      setConfigBoundId(prevBoundId => [...prevBoundId, newBoundId]);
    };

  const handleInputChange = (e, rowIndex, fieldName) => {
    const { value } = e.target;

    const updatedFormData = [...masterFormdata];
    updatedFormData[rowIndex][fieldName] = value;
    setMasterFormdata(updatedFormData);
  };


  


  return (
    <div>
      <table>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} onClick={() => setClickBoundId(masterFormdata[rowIndex].bound_id)}>
              <td>
                <input
                  type="checkbox"
                  name='check'
                  onChange={(e) => handleInputChange(e, rowIndex, 'bound_no')}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  name='bound_no'
                  onChange={(e) => handleInputChange(e, rowIndex, 'bound_no')}
                />
              </td>
              <td>
                <select
                  className={tableStyle.selectbox}
                  name="bound_type"
                  onChange={(e) => handleInputChange(e, rowIndex, 'bound_type')}
                >
                  <option value=""></option>
                  <option value="구매">구매</option>
                  <option value="반품">반품</option>
                  <option value="납품">납품</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name='partner_name'
                  onChange={(e) => handleInputChange(e, rowIndex, 'partner_name')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name='bound_date'
                  onChange={(e) => handleInputChange(e, rowIndex, 'bound_date')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={tableStyle.btn_add}
      onClick={addRowHandler}>+</button>
    </div>
  );
}

export default MasterAddTable;