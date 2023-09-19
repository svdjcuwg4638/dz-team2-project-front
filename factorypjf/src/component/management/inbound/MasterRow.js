import React, { useEffect, useState } from "react";

const MasterRow = ({ boundId, setMaseterFocus }) => {
  const [formData, setFormData] = useState({
    bound_id: boundId != 0 && boundId != null ? boundId : 0,
    emp_id: "1",
    company_id: "1",
    bound_date: "",
    partner_code: "",
    bound_type: "",
  });

  useEffect(() => {
    console.log("boundId", formData["bound_id"]);
  }, [boundId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <tr onClick={() => setMaseterFocus(formData["bound_id"])}>
      <td>
        <input
          type="text"
          name="bound_date"
          onChange={handleInputChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="partner_code"
          onChange={handleInputChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="bound_type"
          onChange={handleInputChange}
        ></input>
      </td>
    </tr>
  );
};

export default MasterRow;
