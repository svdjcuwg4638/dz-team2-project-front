import api from "../../api"


function getItemAll(){
  return async(dispatch)=>{
    try{
      dispatch({type:"GET_REQUEST"})
      const itemAllList = api.get("/item/all");
      const storageAllList = api.get("/storage/all");
      const locationAllList = api.get("/location/all");
      let [itemAllListResponse,storageAllListResponse, locationAllListResponse] = await Promise.all(
        [itemAllList,storageAllList,locationAllList]
      )

      dispatch({
        type:"GET_ITEM_ALL_SUCCESS",
        payload:{
          itemAll: itemAllListResponse.data,
          storageAll: storageAllListResponse.data,
          locationAll: locationAllListResponse.data,
        },
      })
    }catch(error){
      dispatch({type:"GET_ITME_ALL_FAIL",payload:error.toString()})
    }
  }
}

export const itemAction={
  getItemAll,
}