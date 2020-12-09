export const saveState = (state) => {
  const currentState = { ...state };
  try {
    delete currentState["toasts"];
    localStorage.setItem("state", JSON.stringify(currentState));
  } catch {}
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};
