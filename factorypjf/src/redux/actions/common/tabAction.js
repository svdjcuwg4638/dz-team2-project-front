function updateTabContent(tabId, content) {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'UPDATE_TAB_CONTENT_SUCCESS',
        payload: {
          tabId,
          content
        }
      });
    } catch (error) {
      dispatch({ type: 'UPDATE_TAB_CONTENT_FAIL', payload: error.toString() });
    }
  };
};

export const tabAction={
  updateTabContent,
}
