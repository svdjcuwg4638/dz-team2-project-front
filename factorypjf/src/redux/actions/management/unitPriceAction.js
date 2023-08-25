import api from "../../api"

function getUnitPriceAll(){
  return async(dispatch) =>{
    try{
      dispatch({type:"GET_REUSET"})
      const itemAllList = api.get("/item/all");
      const unitPriceAllList = api.get("/unitPrice/all");
      let [itemAllListResponse, unitPriceAllListReponse] = await Promise.all(
        [itemAllList , unitPriceAllList]
      )
      dispatch({
        type:"GET_UNITPRICE_ALL_SUCCESS",
        payload:{
          itemAll: itemAllListResponse.data,
          unitPriceAll : unitPriceAllListReponse.data,
        },
      })
    }catch(error){
      dispatch({type:'GET_UNITPRICE_ALL_FAIL',payload:error.toString()})
    }
  }
}

export const unitPriceAction={
  getUnitPriceAll,
}