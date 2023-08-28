import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { codeAction } from "redux/actions/management/codeAction";
import api from "redux/api";

const CommonCode = ({ selectId, codeAll }) => {
  const filteredData = codeAll?.filter(
    (data) => data.management_code_id === selectId
  );

  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
  };

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    management_code_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      management_code_id: selectId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/code/add", formData);
      dispatch(codeAction.getCodeAll());
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>코드</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody className="scrollable-table" onWheel={handleScroll}>
          {codeAll &&
            filteredData.map((data) => (
              <tr>
                <td>{data.code}</td>
                <td>{data.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <form className="mt-3" onSubmit={handleSubmit}>
        <tr>
          <td>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </td>
        </tr>
        <div>
          <button type="submit">추가</button>
        </div>
      </form>
    </div>
  );
};

export default CommonCode;
