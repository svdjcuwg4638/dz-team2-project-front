import React, { useEffect, useState } from "react";
import "../../../style/management/partner.css";
import PartnerList from "./PartnerList";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
import PartnerDetail from "./PartnerDetail";
import api from "redux/api";
import SearchPartner from "./SearchPartner";
import "../../../style/management/management.css"



const Partner = () => {
  const dispatch = useDispatch();

  const [selectPartner, setSelectParnter] = useState(null);

  const { partnerAll } = useSelector((state) => state.partner);

  const [isLoading,setIsloading] =useState(false)

  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const patchItems = async () => {
      setIsloading(true);
      try {
        await dispatch(partnerAction.getPartnerAll());
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    patchItems();
  }, []);

  useEffect(()=>{
    setSearchData(partnerAll.data)
  },[partnerAll])

  // #region 삭제
  const [selectCodes, setSelectCodes] = useState([]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await api.post("/partner/delete", selectCodes);
    alert('삭제되었습니다.')
    dispatch(partnerAction.getPartnerAll());
    setSelectCodes([]);
  };
  // #endregion

  if (isLoading) {
    return (
      <div className="loader_wrap container">
        <ClipLoader
          color="#000"
          loading={isLoading}
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
              <button
                disabled={selectCodes.length > 0 ? false : true}
                className="btn_delete"
                style={{ backgroundColor: selectCodes.length > 0 ? "#fff" :"rgb(245, 245, 245)", color:selectCodes.length > 0 ? "" : "#fff"  }}
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
        <div className="partner_detail_wrap">
          <PartnerDetail selectPartner={selectPartner} setSelectParnter={setSelectParnter}/>
        </div>
        <div className="partner_title"></div>
      </div>
    </div>
  );
};

export default Partner;
