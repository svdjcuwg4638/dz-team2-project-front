const initialState = {
  currentPath: null
};

function tabReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_CURRENT_PATH':
      return {
        ...state,
        currentPath: action.payload
      };
    default:
      return state;
  }
}

export default tabReducer;
