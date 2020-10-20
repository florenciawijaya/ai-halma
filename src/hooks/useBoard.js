import { useState, useEffect, useCallback } from "react";
import State from "../models/State";

const useBoard = (boardSize) => {
  const [state, setState] = useState(new State(boardSize));
  // useEffect(() => {
  //   const newState = state.copyState();
  //   newState.initialState();
  //   setState(newState);
  // }, []);

  return { state, setState };
};

export default useBoard;
