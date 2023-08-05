import { CREATE_POST } from "./types";

export const initialState = {
    Post:[]
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST:
            return [...state.Post ,action.payload]
      default:
        return state;
    }
  };