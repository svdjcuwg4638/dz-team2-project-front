import api from "redux/api";

function getOutboundAll(){
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_REQUEST"})
            const outboundAllList = api.get("/outbound/all")
            const outboundDetailAllList = api.get("/outbound/detailall")
            let [outboundAllListResponse, outboundDetailAllListResponse] = await Promise.all(
                [outboundAllList,outboundDetailAllList ]
              )
            dispatch({
                type:"GET_OUTBOUND_ALL_SUCCESS",
                payload:{
                    outboundAll : outboundAllListResponse.data,
                    outboundDetailAll : outboundDetailAllListResponse.data
                },
            })
        }catch(error){
            dispatch({type:"GET_OUTBOUND_ALL_FAIL",payload:error.toString()})
        }
    }
}

export const outboundAction={
    getOutboundAll,
}