import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { partnerAction } from "redux/actions/management/partnerAction";
import api from "redux/api";
import AddressApi from "./AddressApi";
import Modal from "component/storage/item/Modal";

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
    company_url: "",
    ph_num: "",
    account_num: "",
    account_holder: "",
    collect_date: "",
    account_code: "",
    fax_num: "",
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
        company_url: selectPartner?.company_url,
        ph_num: selectPartner?.ph_num,
        account_num: selectPartner?.account_num,
        account_holder: selectPartner?.account_holder,
        collect_date: selectPartner?.collect_date,
        account_code: selectPartner?.account_code,
        fax_num: selectPartner?.fax_num,
      });
    }
  }, [selectPartner]);

  const [errorField, setErrorField] = useState(null);

  const inputRefs = {
    partner_code: useRef(),
    bizNum: useRef(),
    partner_name: useRef(),
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const fieldsToCheck = ["partner_code", "bizNum", "partner_name"];

    const fieldNames = {
      partner_code: "거래처코드",
      bizNum: "사업자번호",
      partner_name: "거래처명",
    };

    for (const field of fieldsToCheck) {
      if (!formData[field] || formData[field].trim() === "") {
        setErrorField(field);
        alert(fieldNames[field] + " 입력해주세요");
        inputRefs[field].current.focus();
        return;
      }
    }

    var submitData = {
      ...formData,
    };
    try {
      if (formMod == "modify") {
        const response = await api.post("/partner/modify", submitData);
        alert(submitData.partner_name + " 수정되었습니다.");
        window.location.reload();
      }
      if (formMod == "add") {
        const response = await api.post("/partner/add", submitData);
        if (response.data.code == 1) {
          alert(submitData.partner_name + "추가되었습니다.");
          window.location.reload();
        } else {
          alert("이미 등록된 거래처코드 입니다.");
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
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
        company_url: "",
        ph_num: "",
        account_num: "",
        account_holder: "",
        collect_date: "",
        account_code: "",
        fax_num: "",
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

  //#region 미입력 input창 입력시 빨간색 테두리제거
  useEffect(() => {
    if (errorField == "bizNum") {
      setErrorField(null);
    }
  }, [formData.bizNum]);
  useEffect(() => {
    if (errorField == "partner_code") {
      setErrorField(null);
    }
  }, [formData.partner_code]);
  useEffect(() => {
    if (errorField == "partner_name") {
      setErrorField(null);
    }
  }, [formData.partner_name]);
  //#endregion

  const { codeAll } = useSelector((state) => state.code);

  const bankCode = {
    name: "공통코드",
    guide: true,
    type_all: "codeAll",
    code_column: "common_code",
    name_column: "common_name",
    dataAll: { codeAll },
    common_code_type: "BANK",
    trigger_type: "search",
  };

  return (
    <div className="detail_wrap" style={{ width: "100%", padding: "0" }}>
      <form className="detail_wrap_sub" onSubmit={submitHandler}>
        <div className="detail_content_wrap partner_detail_content_wrap">
          <div>
            <div>
              <div>거래처코드 </div>
              <input
                ref={inputRefs.partner_code}
                readOnly={formMod == "modify" || readOnly}
                style={{
                  backgroundColor: formMod != "add" ? "rgb(245, 245, 245)" : "",
                  border:
                    !readOnly && errorField === "partner_code"
                      ? "3px solid red"
                      : "",
                }}
                className={!readOnly && "input_red"}
                type="text"
                name="partner_code"
                value={formData.partner_code}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div>사업자번호</div>
              <input
                className={!readOnly && "input_red"}
                ref={inputRefs.bizNum}
                readOnly={readOnly}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                  border:
                    !readOnly && errorField === "bizNum" ? "3px solid red" : "",
                }}
                type="text"
                name="bizNum"
                value={formData.bizNum}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div>
              <div>거래처명 </div>
              <input
                className={!readOnly && "input_red"}
                ref={inputRefs.partner_name}
                readOnly={readOnly}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                  border:
                    !readOnly && errorField === "partner_name"
                      ? "3px solid red"
                      : "",
                }}
                type="text"
                name="partner_name"
                value={formData.partner_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div>대표자명 </div>
              <input
                readOnly={readOnly}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                }}
                type="text"
                name="representative"
                value={formData.representative}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div>
              <div>연락처 </div>
              <input
                readOnly={readOnly}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                }}
                type="text"
                name="ph_num"
                value={formData.ph_num}
                onChange={handleInputChange}
                placeholder={!readOnly ? "ex)01079790000" : ""}
              />
            </div>
            <div>
              <div>이메일 </div>
              <input
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                }}
                readOnly={readOnly}
                type="text"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
          </div>

          <div>
            <div>
              <div>팩스번호</div>
              <input
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                }}
                readOnly={readOnly}
                type="text"
                name="fax_num"
                placeholder={!readOnly ? "ex)01079792323" : ""}
                onChange={handleInputChange}
                value={formData.fax_num}
              />
            </div>
          </div>

          <div>
            <div>
              <div>우편번호</div>
              <input
                readOnly
                onChange={handleInputChange}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                }}
                type="text"
                name="post_num"
                value={formData.post_num}
              />
            </div>
            {!readOnly && (
              <button
                style={{
                  width: "150px",
                  marginTop: "11px",
                  backgroundColor: "#5390F0",
                }}
                onClick={handleComplete}
                className="btn_save"
                type="button"
              >
                우편번호 찾기
              </button>
            )}
          </div>
          {popup && (
            <div className="postmodal">
              <div style={{ width: "100%" }}>
                <div>
                  <button
                    style={{
                      width: "30px",
                      borderRadius: "5px",
                      color: "#fff",
                    }}
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
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                  width: "200%",
                }}
                readOnly
                type="text"
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
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                  width: "200%",
                }}
                readOnly={readOnly}
                type="text"
                name="address_detail"
                value={formData.address_detail}
              />
            </div>
          </div>

          <div>
            <div>
              <div>거래처사이트</div>
              <input
                onChange={handleInputChange}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                  width: "200%",
                }}
                readOnly={readOnly}
                type="text"
                name="company_url"
                value={formData.company_url}
              />
            </div>
          </div>

          <div>
            <div className="partner_input_bank_wrap">
              <div>은행이름 </div>
              <input
                onChange={handleInputChange}
                readOnly={readOnly}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                }}
                type="text"
                name="account_code"
                value={formData.account_code}
              />
              <div>
              {!readOnly && (
                <Modal
                  code_type={"account_code"}
                  menu={bankCode}
                  handleInputChange={handleInputChange}
                />
              )}
              </div>
            </div>
            <div>
              <div>예금주 </div>
              <input
                onChange={handleInputChange}
                readOnly={readOnly}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                }}
                type="text"
                name="account_holder"
                value={formData.account_holder}
              />
            </div>
          </div>

          <div>
            <div>
              <div>계좌번호 </div>
              <input
                onChange={handleInputChange}
                style={{
                  backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                }}
                readOnly={readOnly}
                type="text"
                name="account_num"
                value={formData.account_num}
              />
            </div>
            <div>
              <div style={{ width: "160px" }}>수금/지급 예정일 </div>
              <div>
                매월
                <input
                  onChange={handleInputChange}
                  readOnly={readOnly}
                  style={{
                    margin: "0 5px",
                    width: "50px",
                    textAlign: "center",
                    backgroundColor: readOnly ? "rgb(245, 245, 245)" : "",
                  }}
                  type="text"
                  name="collect_date"
                  value={formData.collect_date}
                />
                일
              </div>
            </div>
          </div>
        </div>
        <div className="detail_button_wrap">
          <button
            type="button"
            className="btn_save"
            name="add"
            onClick={buttonHandler}
            style={{ display: formMod == "modify" ? "none" : "" }}
          >
            {readOnly ? "추가" : "취소"}
          </button>
          <button
            type="button"
            className="btn_save"
            name="modify"
            onClick={buttonHandler}
            disabled={!selectPartner}
            style={{
              backgroundColor: selectPartner ? "#5390F0" : "rgb(245, 245, 245)",
              display: formMod == "add" ? "none" : "",
            }}
          >
            {readOnly ? "수정" : "취소"}
          </button>

          <button
            type="submit"
            className="btn_save"
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
