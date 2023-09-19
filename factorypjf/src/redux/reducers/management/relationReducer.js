let initalState ={
  relationAll:{},
}

function relationReducer(state = initalState,action){
  let {type,payload} = action;
  switch(type){
    case "GET_RELATION_ALL_SUCCES":
      return{
        ...state,
        relationAll : payload.relationAll,
      }
    default :
      return {...state}

  }
}

export default relationReducer;