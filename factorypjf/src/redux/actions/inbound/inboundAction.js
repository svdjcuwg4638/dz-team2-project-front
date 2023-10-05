import api from "redux/api";

function getInboundAll(){
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_REQUEST"})
            const inboundAllList = api.get("/inbound/all")
            const inboundDetailAllList = api.get("/inbound/detailall")
            let [inboundAllListResponse, inboundDetailAllListResponse] = await Promise.all(
                [inboundAllList,inboundDetailAllList ]
              )
            dispatch({
                type:"GET_INBOUND_ALL_SUCCESS",
                payload:{
                    inboundAll : inboundAllListResponse.data,
                    inboundDetailAll : inboundDetailAllListResponse.data
                },
            })
        }catch(error){
            dispatch({type:"GET_INBOUND_ALL_FAIL",payload:error.toString()})
        }
    }
}

export const inboundAction={
    getInboundAll,
}