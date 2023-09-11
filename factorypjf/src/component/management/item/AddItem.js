import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../redux/api";
import { itemAction } from "../../../redux/actions/management/itemAction";
const AddItem = ({ addFormViewHandler }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company_id: "1",
    item_code: "",
    item_name: "",
    location_code: "",
    storage_code: "",
    width: "",
    length: "",
    height: "",
    volume: "",
    weight: "",
    unit: "",
    description: "",
    partner_code: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/item/add", formData);
      setFormData({
        company_id: "1",
        item_code: "",
        item_name: "",
        location_code: "",
        storage_code: "",
        width: "",
        length: "",
        height: "",
        volume: "",
        weight: "",
        unit: "",
        description: "",
        partner_code: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    dispatch(itemAction.getItemAll());
  };

  return (
    <div
      style={{
        width: "90%",
        height: "90%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button 
        style={{
          position:'absolute',
          top:'0',
          left:'0',
          border:'none',
          backgroundColor:'#dadada',
        }}
      onClick={addFormViewHandler}>
        icon들어갈것(접기버튼)
      </button>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <div>
              <div>품목코드</div>
              <div>
                <input
                  type="text"
                  name="item_code"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>품목이름</div>
              <div>
                <input
                  type="text"
                  name="item_name"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>거래처</div>
              <div>
                <input
                  type="text"
                  name="partner_code"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>창고</div>
              <div>
                <input
                  type="text"
                  name="storage_code"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>세부장소</div>
              <div>
                <input
                  type="text"
                  name="location_code"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>규격</div>
          <div>
            <div>
              <div>폭</div>
              <div>
                <input type="text" name="width" onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <div>길이</div>
              <div>
                <input type="text" name="length" onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>높이</div>
              <div>
                <input type="text" name="height" onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <div>부피</div>
              <div>
                <input type="text" name="volume" onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>중량</div>
              <div>
                <input type="text" name="weight" onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <div>갯수</div>
              <div>
                <input
                  type="text"
                  name="unit"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
              <div>비고</div>
              <div>
                <textarea
                  name="description"
                  style={{ width: "100%", height: "90px" }}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="button">
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
