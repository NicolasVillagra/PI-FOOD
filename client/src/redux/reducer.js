import { UPDATE_FORM_DATA, RESET_FORM_DATA } from './types';

export const initialState = {
    Post:[]
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FORM_DATA:
            return { ...state, Post: action.payload }
        case RESET_FORM_DATA:
            return state.Post    
      default:
        return state;
    }
  };