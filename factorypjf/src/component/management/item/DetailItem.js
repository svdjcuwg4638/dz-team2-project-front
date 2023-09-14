import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "redux/actions/management/itemAction";
import api from "redux/api";

const DetailItem = ({selectItem}) => {
  const dispatch = useDispatch();

  const {locationAll, storageAll} = useSelector((state)=>state.storage)
  const {partnerAll}  = useSelector((state)=>state.partner)

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
    description: "",
    partner_code: "",
  });

  useEffect(()=>{
    setFormData({
      company_id: "1",
      item_code: selectItem?.item_code,
      item_name: selectItem?.item_name,
      location_code: locationAll?.data?.find((data)=> data?.location_code == selectItem?.location_code)?.location_name,
      storage_code: storageAll?.data?.find((data)=>data?.storage_code == selectItem?.storage_code )?.storage_name,
      width: selectItem?.width,
      length: selectItem?.length,
      height: selectItem?.height,
      volume: selectItem?.volume,
      weight: selectItem?.weight,
      unit: selectItem?.unit,
      description: selectItem?.description,
      partner_code: selectItem?.partner_code,
    })
  },[selectItem])

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
    <>
      <form onSubmit={submitHandler} className="item_detail_from">
        <div>
          <div>
            <div>품목코드</div>
            <div>
              <input
                value={formData["item_code"]}
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
              value={formData["item_name"]}
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
                value={formData["partner_code"]}
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
              value={formData["storage_code"]}
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
              value={formData["location_code"]}
                type="text"
                name="location_code"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>폭</div>
            <div>
              <input type="text" name="width" 
              value={formData["width"]}
              onChange={handleInputChange} />
            </div>
          </div>
          <div>
            <div>길이</div>
            <div>
              <input type="text" name="length"
              value={formData["length"]}
              onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>높이</div>
            <div>
              <input type="text" name="height" 
                value={formData["height"]}
              nChange={handleInputChange} />
            </div>
          </div>
          <div>
            <div>부피</div>
            <div>
              <input type="text" name="volume" 
                value={formData["volume"]}
              onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>중량</div>
            <div>
              <input type="text" name="weight"
                value={formData["weight"]}
              onChange={handleInputChange} />
            </div>
          </div>
          <div>
            <div>갯수</div>
            <div>
              <input type="text" name="unit" 
                value={formData["unit"]}
              onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div>
          <div style={{ width: "100%"}}>
            <div>비고</div>
            <div>
              <textarea
                name="description"
                value={formData["description"]}
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
