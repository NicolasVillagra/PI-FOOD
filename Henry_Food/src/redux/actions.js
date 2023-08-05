import { CREATE_POST } from "./types";
import axios from 'axios'

const apiUrl = 'http://localhost:3001/recipes'


export const createPost = (postData) => async (dispatch) => {
    try {
      const response = await axios.post(apiUrl, postData);
      dispatch({ type: CREATE_POST, payload: response.data });
    } catch (error) {
     console.log(error);
    }
  };