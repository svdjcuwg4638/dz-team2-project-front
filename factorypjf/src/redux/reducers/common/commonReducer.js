let initalState = {
  bookMarkAll:{},
}

function commonReducer(state = initalState, action){
  let {type,payload} = action
  switch(type){
    case "GET_BOOKMARK_ALL_SUCCES":
      return {
        ...state,
        bookMarkAll : payload.bookMarkAll
      }
    default:
      return {...state}
  }
}

export default commonReducer;