export function saveCurrentPath(path) {
  return {
    type: 'SAVE_CURRENT_PATH',
    payload: path
  };
}
