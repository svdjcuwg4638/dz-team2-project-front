import React, { useEffect, useState } from "react";
import "../../../style/management/partner.css";
import AddPartner from "./AddPartner";
import PartnerList from "./PartnerList";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
import PartnerDetail from "./PartnerDetail";
import api from "redux/api";
import SearchPartner from "./SearchPartner";



const Partner = () => {
  const dispatch = useDispatch();

  const [selectPartner, setSelectParnter] = useState(null);

  const { partnerAll, loading } = useSelector((state) => state.partner);

  const [searchData, setSearchData] = useState(partnerAll.data);

  useEffect(() => {
    dispatch(partnerAction.getPartnerAll());
  }, []);

  useEffect(()=>{
    setSearchData(partnerAll.data)
  },[partnerAll])

  useEffect(() => {
    if (!loading && partnerAll && partnerAll.data) {
      setSelectParnter(partnerAll?.data[0]);
    }
  }, [loading]);

  //#region 추가모달표시
  const [view, setView] = useState("-100%");

  const addFormViewHandler = () => {
    if (view == "-100%") {
      setView("0");
    } else {
      setView("-100%");
    }
  };
  //#endregion

  // #region 삭제
  const [selectCodes, setSelectCodes] = useState([]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await api.post("/partner/delete", selectCodes);
    dispatch(partnerAction.getPartnerAll());
    setSelectCodes([]);
  };
  // #endregion

  if (loading) {
    return (
      <div className="loader_wrap container">
        <ClipLoader
          color="#000"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loading"
        />
      </div>
    );
  }

  return (
    <div className="content_wrap">
      <div className="partner_wrap">
        <div>
          <SearchPartner
            setSearchData={setSearchData}
          />
          <div className="partner_list_wrap">
            {partnerAll.data && (
              <PartnerList
                selectCodes={selectCodes}
                setSelectCodes={setSelectCodes}
                partnerAll={searchData}
                selectPartner={selectPartner}
                setSelectParnter={setSelectParnter}
              />
            )}
            <div className="button_wrap">
              <button className="button" onClick={addFormViewHandler}>
                추가
              </button>
              <button
                className="button"
                style={{ backgroundColor: "red" }}
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
        <div className="partner_detail_wrap">
          <PartnerDetail selectPartner={selectPartner} />
        </div>
      </div>
      <div className="partner_add_wrap" style={{ right: view }}>
        <AddPartner addFormViewHandler={addFormViewHandler} />
      </div>
    </div>
  );
};

export default Partner;
