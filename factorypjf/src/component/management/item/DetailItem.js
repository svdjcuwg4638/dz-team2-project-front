import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { itemAction } from "redux/actions/management/itemAction";
import api from "redux/api";

const DetailItem = ({}) => {
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
    quantity: "",
    discription: "",
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
        quantity: "",
        description: "",
        partner_code: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    dispatch(itemAction.getItemAll());
  };

  return (
    <>
      <form onSubmit={submitHandler} className="item_detail_from">
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
                name="location_id"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

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
              <input type="text" name="unit" onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div>
          <div style={{ width: "100%"}}>
            <div>비고</div>
            <div>
              <textarea
                name="description"
                style={{ width: "100%", height: "150px" }}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" className="button">
            수정
          </button>
          <button type="submit" className="button">
            저장
          </button>
        </div>
      </form>
    </>
  );
};

export default DetailItem;
