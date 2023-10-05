let initalState ={
  emp_id:"1"
}

function empReducer(state = initalState, action){
  let { type, payload} = action
  switch(type){
    default:
      return {...state}
  }
}

export default empReducer