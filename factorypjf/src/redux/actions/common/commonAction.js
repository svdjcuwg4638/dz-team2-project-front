import api from "redux/api"

function getBookMark(){
  return async(dispatch)=>{
    try{
      const bookMarkList = api.get("/bookmark/all")
      let [bookMarkListResponse] = await Promise.all(
        [bookMarkList]
      )
      dispatch({
        type:"GET_BOOKMARK_ALL_SUCCES",
        payload:{
          bookMarkAll: bookMarkListResponse.data,
        },
      })
    }catch(error){
      dispatch({type:"GET_BOOKMARK_ALL_FAIL",payload:error.toString()})
    }
  }
}

export const commonAction={
  getBookMark,
}