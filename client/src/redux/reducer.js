import { UPDATE_FORM_DATA, RESET_FORM_DATA, ORDER_TO_AZ, ORDER_TO_ZA, ORDER_TO_API, ORDER_TO_DB } from "./types";
import { apiFn, dataBaseFn, orderToAZ, orderToZA } from "../modules/utils/utils";

export const initialState = {
  Post: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_DATA:
      return { ...state, Post: action.payload };
    case ORDER_TO_AZ:
      const filter = orderToAZ(state.Post);
      return { ...state, Post: filter };
    case ORDER_TO_ZA:
        const filterZa= orderToZA(state.Post)
        return {...state, Post: filterZa}
    case ORDER_TO_API:
      const fromApi = apiFn(state.Post)
      return{...state, Post: fromApi}
    case ORDER_TO_DB:
      const fromDb = dataBaseFn(state.Post)
      return{...state, Post: fromDb}
    case RESET_FORM_DATA:
      return state.Post;
    default:
      return state;
  }
};
