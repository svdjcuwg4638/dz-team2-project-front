let initalState={
    inboundAll:{},
    inboundDetailAll:{},
    loading:false,
}

function inboundReducer(state=initalState, action){
    let {type, payload} = action;
    // console.log('reducer의',state);
    switch(type){
        case "GET_REQUEST":
            return{
                ...state,
                loading:true,
            }
        case "GET_INBOUND_ALL_SUCCESS":
            return{
                ...state,
                inboundAll : payload.inboundAll,
                inboundDetailAll: payload.inboundDetailAll,
                loading : false,
            }
        default :
            return {...state}
    }
}

export default inboundReducer;