import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { codeAction } from "redux/actions/management/codeAction";
import api from "redux/api";

const ManageCode = ({ manageCodeAll, setSelectId, selectId }) => {
  const dispatch = useDispatch();

  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
  };

  const [formData, setFormData] = useState({
    management_name: "",
    management_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/managecode/add", formData);
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
            <th>관리코드</th>
            <th>관리코드명</th>
          </tr>
        </thead>
        <tbody className="scrollable-table" onWheel={handleScroll}>
          {manageCodeAll &&
            manageCodeAll.map((data) => (
              <tr onClick={() => setSelectId(data.management_code_id)}>
                <td
                  style={{
                    backgroundColor:
                      selectId == data.management_code_id
                        ? "#dadada"
                        : "transparent",
                  }}
                >
                  {data.management_code}
                </td>
                <td
                  style={{
                    backgroundColor:
                      selectId == data.management_code_id
                        ? "#dadada"
                        : "transparent",
                  }}
                >
                  {data.management_name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="input_wrap">
          <div>
            <div>관리코드</div>
            <div className="inputBox" style={{marginRight:'10px'}}>
              <input
                type="text"
                name="management_code"
                value={formData.management_code}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>관리코드명</div>
            <div className="inputBox" style={{marginRight:'20px'}}>
              <input
                type="text"
                name="management_name"
                value={formData.management_name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="button_wrap">
          <button type="submit" className="button">추가</button>
        </div>
      </form>
    </div>
  );
};

export default ManageCode;
