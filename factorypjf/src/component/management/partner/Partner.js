import React, { useEffect } from "react";
import "../../../style/management/Partner.css"
import AddPartner from "./AddPartner";
import PartnerList from "./PartnerList";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {partnerAction} from "../../../redux/actions/management/partnerAction"

const Partner = () => {

  const dispatch = useDispatch()

  const {partnerAll, loading} = useSelector((state)=>state.partner)

  useEffect(()=>{
    dispatch(partnerAction.getPartnerAll())
  },[])

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
      {partnerAll.data && <PartnerList partnerAll={partnerAll.data}/>}
      <AddPartner/>
    </div>
  );
};

export default Partner;
