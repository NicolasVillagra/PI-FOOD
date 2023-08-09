import { RESET_FORM_DATA } from "./types";
import { UPDATE_FORM_DATA } from "./types";



export const updateFormData = (data) => ({
  type: UPDATE_FORM_DATA,
  payload: data,
});

export const resetFormData = () => ({
  type: RESET_FORM_DATA,
});