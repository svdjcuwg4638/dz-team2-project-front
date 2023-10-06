let initalState={
  codeAll:{},
  manageCodeAll:{},
  loading:false,
}

function codeReducer(state = initalState, action){
  let { type, payload} = action;
  
  switch(type){
    case "GET_REQUEST":
      return{
        ...state,
        loading:true,
      }
    case "GET_CODE_ALL_SUCCES":
      return {
        ...state,
        codeAll : payload.codeAll,
        manageCodeAll : payload.manageCodeAll,
        loading : false, 
      }
    default :
      return {...state}
  }
}

export default codeReducer;