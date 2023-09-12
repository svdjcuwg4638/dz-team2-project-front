import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../redux/api";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { storageAction } from "redux/actions/management/storageAction";
import StorageHelp from "../storage/StorageHelp";
import { partnerAction } from "redux/actions/management/partnerAction";
import Modal from "../../storage/item/Modal";
const AddItem = ({ addFormViewHandler }) => {
  const dispatch = useDispatch();
  const {partnerAll} = useSelector((state)=>state.partner)
  const [showFlag,setShowFlag] = useState(false)
  useEffect(() => {
    dispatch(storageAction.getstorageAll());
    dispatch(partnerAction.getPartnerAll());
  }, []);


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
    console.log("formData",formData);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const isValidFormData = (data) => {
      for (let key in data) {
        if (data[key] === "") {
          return false;
        }
      }
      return true;
    };

    if (isValidFormData(formData)) {
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
    }
  };

  const partner = {
    name: "거래처",
    guide: true,
    type_all: "partnerAll",
    code_column: "partner_code",
    name_column: "partner_name",
    dataAll: { partnerAll },
    trigger_type: "search",
  }


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
          position: "absolute",
          top: "0",
          left: "0",
          border: "none",
          backgroundColor: "#dadada",
        }}
        onClick={addFormViewHandler}
      >
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
              <Modal
                menu={partner}
                name="partner_code"
                handleInputChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div>
              <div>창고</div>
              <input type="text" value={formData["storage_code"]} name="storage_code" onChange={handleInputChange} />
            </div>
            <div>
              <div>세부장소</div>
              <input type="text" value={formData["location_code"]} name="location_code" onChange={handleInputChange} />
            </div>
            <button className="button" type="button" onClick={()=>setShowFlag(true)}>?</button>
            {showFlag && (
              <StorageHelp
                handleInputChange={handleInputChange}
                setShowFlag={setShowFlag}
              />
            )}
          </div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>규격</div>
          <div>
            <div>
              <div>폭</div>
              <div>
                <input type="text" name="width" onChange={handleInputChange} />
                m
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
