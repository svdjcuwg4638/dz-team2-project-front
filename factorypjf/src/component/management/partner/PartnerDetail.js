import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { partnerAction } from "redux/actions/management/partnerAction";
import api from "redux/api";
import AddressApi from "./AddressApi";

const PartnerDetail = ({ selectPartner, setSelectParnter }) => {
  const dispatch = useDispatch();
  const [formMod, setFormMod] = useState("");

  const [formData, setFormData] = useState({
    partner_code: "",
    company_id: "1",
    bizNum: "",
    partner_name: "",
    representative: "",
    address: "",
    address_detail: "",
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

  useEffect(() => {
    if (selectPartner != null) {
      setReadOnly(true);
      setFormMod("");
      setFormData(null);
      setFormData({
        partner_code: selectPartner?.partner_code,
        company_id: selectPartner?.company_id,
        bizNum: selectPartner?.bizNum,
        partner_name: selectPartner?.partner_name,
        representative: selectPartner?.representative,
        address: selectPartner?.address,
        address_detail: selectPartner?.address_detail,
        email: selectPartner?.email,
        post_num: selectPartner?.post_num,
        url: selectPartner?.url,
        ph_num: selectPartner?.ph_num,
        account_num: selectPartner?.account_num,
        account_holder: selectPartner?.account_holder,
        collect_date: selectPartner?.collect_date,
        account_code: selectPartner?.account_code,
      });
    }
  }, [selectPartner]);

  const submitHandler = async (event) => {
    event.preventDefault();
    var submitData = {
      ...formData,
    };
    try {
      if (formMod == "modify") {
        const response = await api.post("/partner/modify", submitData);
      }
      if (formMod == "add") {
        const response = await api.post("/partner/add", submitData);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    setFormData({
      partner_code: "",
      company_id: "1",
      bizNum: "",
      partner_name: "",
      representative: "",
      address: "",
      address_detail: "",
      email: "",
      post_num: "",
      url: "",
      ph_num: "",
      account_num: "",
      account_holder: "",
      collect_date: "",
      account_code: "",
    });
    dispatch(partnerAction.getPartnerAll());
  };

  const [readOnly, setReadOnly] = useState(true);

  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
  };

  function buttonHandler(e) {
    toggleReadOnly();
    const { name } = e.target;

    if (name === "add") {
      setFormData({
        partner_code: "",
        company_id: "1",
        bizNum: "",
        partner_name: "",
        representative: "",
        address: "",
        address_detail: "",
        email: "",
        post_num: "",
        url: "",
        ph_num: "",
        account_num: "",
        account_holder: "",
        collect_date: "",
        account_code: "",
      });

      if (!readOnly) {
        setFormMod("");
      } else {
        setFormMod("add");
      }

      setSelectParnter(null);
    } else if (name === "modify") {
      if (formMod === "modify") {
        setFormData("");
      }
      if (!readOnly) {
        setFormMod("");
      } else {
        setFormMod("modify");
      }
    }
  }

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
    <div className="detail_wrap">
      <form className="detail_wrap_sub" onSubmit={submitHandler}>
        <div>
          <div>
            <div>회사코드 </div>
            <input
              readOnly={readOnly}
              style={{
                width: "130px",
                backgroundColor: readOnly ? "#dadada" : "",
              }}
              type="text"
              name="partner_code"
              value={formData.partner_code}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div>사업자번호 </div>
            <input
              readOnly={readOnly}
              style={{
                width: "130px",
                backgroundColor: readOnly ? "#dadada" : "",
              }}
              type="text"
              name="bizNum"
              value={formData.bizNum}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div>거래처이름 </div>
            <input
              readOnly={readOnly}
              style={{
                width: "135px",
                backgroundColor: readOnly ? "#dadada" : "",
              }}
              type="text"
              name="partner_name"
              required
              value={formData.partner_name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <div>
            <div>대표자 </div>
            <input
              readOnly={readOnly}
              style={{
                width: "60px",
                backgroundColor: readOnly ? "#dadada" : "",
              }}
              type="text"
              name="representative"
              required
              value={formData.representative}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div>전화번호 </div>
            <input
              readOnly={readOnly}
              style={{
                width: "130px",
                backgroundColor: readOnly ? "#dadada" : "",
              }}
              type="text"
              name="ph_num"
              required
              value={formData.ph_num}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div>이메일 </div>
            <input
              style={{ backgroundColor: readOnly ? "#dadada" : "" }}
              readOnly={readOnly}
              type="text"
              name="email"
              required
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>
        </div>

        <div>
          <div>
            <div>우편번호 </div>
            <input
              readOnly={readOnly}
              onChange={handleInputChange}
              style={{
                width: "120px",
                backgroundColor: readOnly ? "#dadada" : "",
              }}
              type="text"
              name="post_num"
              required
              value={formData.post_num}
            />
          </div>
          {!readOnly && (
            <button
              style={{ width: "130px" }}
              onClick={handleComplete}
              className="button"
            >
              우편번호 찾기
            </button>
          )}
        </div>
        {popup && (
          <div className="postmodal">
            <div>
              <div>
                <button
                  style={{ width: "30px", borderRadius: "5px" }}
                  onClick={() => handleComplete()}
                >
                  X
                </button>
              </div>
              <div>
                <AddressApi company={formData} setcompany={setFormData} />
              </div>
            </div>
          </div>
        )}

        <div>
          <div>
            <div>주소</div>
            <input
              onChange={handleInputChange}
              style={{ backgroundColor: readOnly ? "#dadada" : "" }}
              readOnly={readOnly}
              type="text"
              required
              name="address"
              value={formData.address}
            />
          </div>
        </div>

        <div>
          <div>
            <div>상세주소</div>
            <input
              onChange={handleInputChange}
              style={{ backgroundColor: readOnly ? "#dadada" : "" }}
              readOnly={readOnly}
              type="text"
              required
              name="address_detail"
              value={formData.address_detail}
            />
          </div>
        </div>

        <div>
          <div>
            <div>은행이름 </div>
            <input
              onChange={handleInputChange}
              readOnly={readOnly}
              style={{
                width: "100px",
                backgroundColor: readOnly ? "#dadada" : "",
              }}
              type="text"
              name="account_code"
              required
              value={formData.account_code}
            />
          </div>
          <div>
            <div>예금주 </div>
            <input
              onChange={handleInputChange}
              readOnly={readOnly}
              style={{
                width: "59px",
                backgroundColor: readOnly ? "#dadada" : "",
              }}
              type="text"
              name="account_holder"
              required
              value={formData.account_holder}
            />
          </div>
        </div>

        <div>
          <div>
            <div>계좌번호 </div>
            <input
              onChange={handleInputChange}
              style={{ backgroundColor: readOnly ? "#dadada" : "" }}
              readOnly={readOnly}
              type="text"
              name="account_num"
              required
              value={formData.account_num}
            />
          </div>
          <div>
            <div>수금/지급 예정일 </div>
            <div>
              매월
              <input
                onChange={handleInputChange}
                readOnly={readOnly}
                style={{
                  width: "30px",
                  textAlign: "center",
                  backgroundColor: readOnly ? "#dadada" : "",
                }}
                type="text"
                name="collect_date"
                required
                value={formData.collect_date}
              />
              일
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="button"
            name="add"
            onClick={buttonHandler}
            style={{ display: formMod == "modify" ? "none" : "" }}
          >
            {readOnly ? "추가" : "취소"}
          </button>
          <button
            type="button"
            className="button"
            name="modify"
            onClick={buttonHandler}
            disabled={!selectPartner}
            style={{
              backgroundColor: selectPartner ? "" : "#dadada",
              display: formMod == "add" ? "none" : "",
            }}
          >
            {readOnly ? "수정" : "취소"}
          </button>

          <button
            type="submit"
            className="button"
            style={{ display: readOnly ? "none" : "" }}
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerDetail;
