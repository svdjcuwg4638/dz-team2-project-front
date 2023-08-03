import api from "../../api"
function getstorageAll(){
  return async (dispatch)=>{
    try{
      dispatch({type:"GET_STORAGE_ALL_REQUEST"})
      const storageAllList = api.get("/storage/all")

      let [storageAllListResponse] = await Promise.all([
        storageAllList,
      ]);

      dispatch({
        type:"GET_STORAGE_ALL_SUCCESS",
        payload:{
          storageAll : storageAllListResponse.data,

        },
      });
    }catch (error) {
      console.error(error);
      dispatch({ type: "GET_STORAGE_ALL_FAILURE", payload: error.toString() });
    }
  }
}

export const storageAction={
  getstorageAll,
}