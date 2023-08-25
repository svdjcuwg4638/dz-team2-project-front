import api from "../../api";


function getProductAll(){
  return async(dispatch)=>{
    try{
      dispatch({type:"GET_REQUEST"})
      const itemAllList = api.get("/item/all");
      const storageAllList = api.get("/storage/all");
      const locationAllList = api.get("/location/all");
      const partnerAllList = api.get("/partner/all");
      let [itemAllListResponse,storageAllListResponse, locationAllListResponse, partnerAllListResponse] = await Promise.all(
        [itemAllList,storageAllList,locationAllList, partnerAllList]
      )

      dispatch({
        type:"GET_PRODUCT_ALL_SUCCESS",
        payload:{
          itemAll: itemAllListResponse.data,
          storageAll: storageAllListResponse.data,
          locationAll: locationAllListResponse.data,
          partnerAll : partnerAllListResponse.data,
        }
      })
    }catch(error){
      dispatch({type:"GET_PRODUCT_ALL_FAIL",payload:error.toString()})
    }
  }
}

export const productAction={
  getProductAll,
}