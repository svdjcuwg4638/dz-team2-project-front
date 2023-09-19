import api from "redux/api"

function getRelationAll(){
  return async(dispatch)=>{
    try{
      const relationAll = api.get("/relation/all")
      let [relationAllListResponse ] = await Promise.all(
        [relationAll ]
      )
      dispatch({
        type:"GET_RELATION_ALL_SUCCES",
        payload:{
          relationAll : relationAllListResponse.data,
        },
      })
    }catch(error){
      dispatch({type:"GET_CODE_ALL_FAIL",payload:error.toString()})
    }
  }
}

export const relationAction ={
  getRelationAll,
}