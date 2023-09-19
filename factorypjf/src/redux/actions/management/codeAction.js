import api from "redux/api"

function getCodeAll(){
  return async(dispatch)=>{
    try{
      const codeAllList = api.get("/code/all")
      const managementCodeAllList = api.get("/managementcode/all")
      let [codeAllListResponse, manageCodeAllListResponse] = await Promise.all(
        [codeAllList,managementCodeAllList ]
      )

      dispatch({
        type:"GET_CODE_ALL_SUCCES",
        payload:{
          codeAll : codeAllListResponse.data,
          manageCodeAll : manageCodeAllListResponse.data,
        },
      })
    }catch(error){
      dispatch({type:"GET_CODE_ALL_FAIL",payload:error.toString()})
    }
  }
}

export const codeAction={
  getCodeAll,
}