import React, { useEffect, useState } from 'react';
import tableStyle from '../../../../style/inbound/inbound.module.css'
import DetailSearchTable from './DetailSearchTable';

function DetailAddTable({ BoundId,maxBoundId, detailFormData, setDetailFormData, rowCount, configBoundId }) {

  const handleDetailInputChange = (event) => {
    const { name, value } = event.target;
    setDetailFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const filteredDetails = detailFormData.filter(detail => detail.bound_id === BoundId);

  const addDetailHandler = () => {
    const newDetail = {
      bound_id: maxBoundId,
      item_code: detailFormData.item_code,
      item_name: detailFormData.item_name,
      amount: detailFormData.amount,
      bound_date: detailFormData.bound_date,
      description: detailFormData.description,
    };

    setDetailFormData(prevData => [
      ...prevData,
      newDetail,
      {
        bound_id: maxBoundId,
        item_code: "",
        item_name: "",
        amount: "",
        bound_date: "",
        description: "",
      }
    ]);
    };
    const handleInputChange = (e, rowIndex, fieldName) => {
        const { value } = e.target;
    
        const updatedFormData = [...detailFormData];
        if (!updatedFormData[rowIndex]) {
          updatedFormData[rowIndex] = {};
        }
        updatedFormData[rowIndex][fieldName] = value;
        updatedFormData[rowIndex].bound_id = maxBoundId;
        setDetailFormData(updatedFormData);
      };
    
  return (
      <div>
        {/* <DetailSearchTable detailFormData={detailFormData} BoundId={BoundId}/> */}
      <table>
        <tbody>
          {Array.from({ length: configBoundId.length*3 }).map((_, rowIndex) => (
            <tr key={rowIndex} >
              <td>
                <input
                  type="checkbox"
                  name='check'
                  onChange={(e) => handleInputChange(e, rowIndex, 'check')}
                ></input>
              </td> 
              <td>
                <input
                  type="texxt"
                  name='item_code'
                  onChange={(e) => handleInputChange(e, rowIndex, 'item_code')}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  name='item_name'
                  onChange={(e) => handleInputChange(e, rowIndex, 'item_name')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name='amount'
                  onChange={(e) => handleInputChange(e, rowIndex, 'amount')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name='bound_date'
                  onChange={(e) => handleInputChange(e, rowIndex, 'bound_date')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name='description'
                  onChange={(e) => handleInputChange(e, rowIndex, 'description')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={tableStyle.btn_add}
      onClick={addDetailHandler}>+</button>
    </div>
  );
}

export default DetailAddTable;