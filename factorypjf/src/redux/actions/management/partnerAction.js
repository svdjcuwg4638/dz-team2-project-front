import api from "../../api";


function getPartnerAll(){
  return async(dispatch)=>{
    try{
      dispatch({type:"GET_REQUEST"});
      const partnerAllList = api.get("/partner/all");
      let [partnerAllListResponse] = await Promise.all(
        [partnerAllList]
      );

      dispatch({
        type:"GET_PARTNER_ALL_SUCCESS",
        payload:{
          partnerAll: partnerAllListResponse.data,
        },
      })
    }catch(error){
      dispatch({type:"GET_PARTNER_ALL_FAIL",payload:error.toString()})
    }
  }
}

export const partnerAction ={
  getPartnerAll,
}