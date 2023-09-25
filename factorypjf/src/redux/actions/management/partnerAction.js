import api from "../../api";


function getPartnerAll(){
  return async(dispatch)=>{
    try{
      const unitPriceAll = api.get("/partner/all");
      let [partnerAllListResponse] = await Promise.all(
        [ unitPriceAll]
      )
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