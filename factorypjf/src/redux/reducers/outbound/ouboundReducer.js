let initalState={
    outboundAll:{},
    outboundDetailAll:{},
    loading:false,
}

function outboundReducer(state=initalState, action){
    let {type, payload} = action;
    // console.log('reducer의',state);
    switch(type){
        case "GET_REQUEST":
            return{
                ...state,
                loading:true,
            }
        case "GET_OUTBOUND_ALL_SUCCESS":
            return{
                ...state,
                outboundAll : payload.outboundAll,
                outboundDetailAll: payload.outboundDetailAll,
                loading : false,
            }
        default :
            return {...state}
    }
}

export default outboundReducer;