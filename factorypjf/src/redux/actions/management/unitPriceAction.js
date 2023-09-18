import api from "../../api"

function getUnitPriceAll(){
  return async(dispatch) =>{
    try{
      const unitPriceAllList = api.get("/unitPrice/all");
      let [ unitPriceAllListReponse] = await Promise.all(
        [ unitPriceAllList]
      )
      dispatch({
        type:"GET_UNITPRICE_ALL_SUCCESS",
        payload:{
          unitPriceAll : unitPriceAllListReponse.data,
        },
      })
    }catch(error){
      dispatch({type:'GET_UNITPRICE_ALL_FAIL',payload:error.toString()})
    }
  }
}

function getCurrentUnitPriceAll(){
  return async(dispatch) =>{
    try{
      const unitPriceCurrentList = api.get("/unitPrice/current");
      let [ unitPriceCurrentListReponse] = await Promise.all(
        [ unitPriceCurrentList]
      )
      dispatch({
        type:"GET_UNITPRICE_ALL_SUCCESS",
        payload:{
          unitPriceAll : unitPriceCurrentListReponse.data,
        },
      })
    }catch(error){
      dispatch({type:'GET_UNITPRICE_ALL_FAIL',payload:error.toString()})
    }
  }
}

function getExpectedUnitPriceAll(){
  return async(dispatch) =>{
    try{
      const unitPriceExpectedList = api.get("/unitPrice/expected");
      let [ unitPriceExpectedListReponse] = await Promise.all(
        [ unitPriceExpectedList]
      )
      dispatch({
        type:"GET_UNITPRICE_ALL_SUCCESS",
        payload:{
          unitPriceAll : unitPriceExpectedListReponse.data,
        },
      })
    }catch(error){
      dispatch({type:'GET_UNITPRICE_ALL_FAIL',payload:error.toString()})
    }
  }
}

export const unitPriceAction={
  getUnitPriceAll,getCurrentUnitPriceAll,getExpectedUnitPriceAll
}