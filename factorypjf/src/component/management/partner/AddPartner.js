import React, { useEffect, useState } from "react";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
import AddressApi from "./AddressApi";

const AddPartner = ({ addFormViewHandler }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    partner_code: "",
    company_id: "1",
    bizNum: "",
    partner_name: "",
    representative: "",
    address: "",
    address_dteail: "",
    email: "",
    post_num: "",
    url: "",
    ph_num: "",
    account_num: "",
    account_holder: "",
    collect_date: "",
    account_code: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/partner/add", formData);
      setFormData({
        partner_code: "",
        company_id: "1",
        bizNum: "",
        partner_name: "",
        representative: "",
        address: "",
        address_dteail: "",
        email: "",
        post_num: "",
        url: "",
        ph_num: "",
        account_num: "",
        account_holder: "",
        collect_date: "",
        account_code: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    dispatch(partnerAction.getPartnerAll());
  };

  
  //#region 주소 api처리
  const [popup, setPopup] = useState(false);

  const handleComplete = () => {
    setPopup(!popup);
  };

  useEffect(() => {
    setPopup(false);
  }, [formData.address, formData.post_num]);
  //#endregion

  return (
    <div className="addpartner_wrap_sub">
      <button className="addpartner_x_button" onClick={addFormViewHandler}>
        icon들어갈것(접기버튼)
      </button>
      <form onSubmit={submitHandler} className="mt-5">
        <div>
          <div>
            <div>회사코드 </div>
            <input
              style={{ width: "130px" }}
              type="text"
              name="partner_code"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <div>사업자번호 </div>
            <input
              style={{ width: "130px" }}
              type="text"
              name="bizNum"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <div>거래처이름 </div>
            <input
              style={{ width: "135px" }}
              type="text"
              name="partner_name"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <div>
            <div>대표자 </div>
            <input
              style={{ width: "60px" }}
              type="text"
              name="representative"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <div>전화번호 </div>
            <input
              style={{ width: "130px" }}
              type="text"
              name="ph_num"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <div>이메일 </div>
            <input
              type="text"
              name="email"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <div>
            <div>우편번호 </div>
            <input
              style={{ width: "120px" }}
              type="text"
              name="post_num"
              onChange={handleInputChange}
              required
              value={formData.post_num}
            />
          </div>
          <button
            style={{ width: "130px" }}
            onClick={handleComplete}
            className="button"
          >
            우편번호 찾기
          </button>
          {popup && (
            <div className="postmodal">
              <div>
                <button
                  style={{ width: "30px", borderRadius: "5px" }}
                  onClick={() => handleComplete()}
                >
                  X
                </button>
                <div>
                  <AddressApi
                    company={formData}
                    setcompany={setFormData}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div>
            <div>주소</div>
            <input
              type="text"
              required
              name="address"
              onChange={handleInputChange}
              value={formData.address}
            />
          </div>
        </div>

        <div>
          <div>
            <div>상세주소</div>
            <input
              type="text"
              required
              name="address_detail"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <div>
            <div>홈페이지 </div>
            <input
              type="text"
              name="url"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <div>은행코드 </div>
            <input
              style={{ width: "100px" }}
              type="text"
              name="account_code"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <div>예금주 </div>
            <input
              style={{ width: "59px" }}
              type="text"
              name="account_holder"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <div>계좌번호 </div>
            <input
              type="text"
              name="account_num"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <div>수금/지급 예정일 </div>
          매월
          <input
            style={{ width: "30px", textAlign: "center" }}
            type="text"
            name="collect_date"
            onChange={handleInputChange}
            required
          />
          일
        </div>

        <div>
          <button type="submit" className="button mt-3">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPartner;
