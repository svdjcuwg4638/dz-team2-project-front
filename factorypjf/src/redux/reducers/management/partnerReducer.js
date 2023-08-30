let initalState={
  partnerAll:{},
  loading:false,
}

function partnerReducer(state=initalState, action){
  let {type, payload} = action;
  switch(type){
    case "GET_REQUEST":
      return{
        ...state,
        loading:true,
      };
    case "GET_PARTNER_ALL_SUCCESS":
      return{
        ...state,
        partnerAll:payload.partnerAll,
        loading:false,
      };
    default:
      return{...state}
      
  }
}

export default partnerReducer