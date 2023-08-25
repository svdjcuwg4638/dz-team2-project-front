import React, { useState } from 'react'
import api from '../../../redux/api'
import { useDispatch } from 'react-redux';
import { partnerAction } from '../../../redux/actions/management/partnerAction';

const AddPartner = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    bizNum: '',
    name: '',
    ph_num: '',
    emp_name: '',
    email: '',
    address: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/partner/add', formData);
      setFormData({
        bizNum: '',
        name: '',
        ph_num: '',
        emp_name: '',
        email: '',
        address: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    dispatch(partnerAction.getPartnerAll())

  };

  return (
    <form onSubmit={submitHandler} className='mt-5'>
    <table>
      <thead>
        <tr>
          <th>사업자번호</th>
          <th>회사명</th>
          <th>연락처</th>
          <th>담당자명</th>
          <th>이메일</th>
          <th>주소</th>
        </tr>
      </thead>
      <tbody className='input_partner'>
        <tr>
          <td>
            <input type="text" name="bizNum" value={formData.bizNum} onChange={handleInputChange}></input>
          </td>
          <td>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange}></input>
          </td>
          <td>
            <input type="text" name='ph_num' value={formData.ph_num} onChange={handleInputChange}></input>
          </td>
          <td>
            <input type="text" name='emp_name' value={formData.emp_name} onChange={handleInputChange}></input>
          </td>
          <td>
            <input type="text" name='email' value={formData.email} onChange={handleInputChange}></input>
          </td>
          <td>
            <input type="text" name='address' value={formData.address} onChange={handleInputChange}></input>
          </td>
          <td>
            <input type="submit"></input>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
  )
}

export default AddPartner