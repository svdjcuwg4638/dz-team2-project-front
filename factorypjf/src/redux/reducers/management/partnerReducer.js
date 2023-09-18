let initalState={
  partnerAll:{},
}

function partnerReducer(state=initalState, action){
  let {type, payload} = action;
  switch(type){
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