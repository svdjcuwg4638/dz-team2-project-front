import React, { useEffect, useState } from "react";

const SubRow = ({ boundId,masterFocus }) => {
  const [formData, setFormData] = useState({
    bound_id: boundId != 0 && boundId != null ? boundId : 0,
    emp_id: "1",
    company_id: "1",
    item_code:"",
    itme_name:"",
    unit_price:"",
  });

  useEffect(() => {
    console.log("boundId", formData["bound_id"]);
  }, [boundId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  return (
      <tr style={{display:masterFocus == formData["bound_id"] ? "block":"none"}}>
        <td>
          <input
            type="text"
            name="item_code"
            value={formData["item_code"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="itme_name"
            value={formData["itme_name"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="unit_price"
            value={formData["unit_price"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input type="text" name="amount" onChange={handleInputChange}></input>
        </td>
      </tr>
  );
};

export default SubRow;
