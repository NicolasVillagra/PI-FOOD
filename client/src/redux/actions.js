import { ORDER_TO_API, ORDER_TO_AZ, ORDER_TO_DB, ORDER_TO_ZA, RESET_FORM_DATA } from "./types";
import { UPDATE_FORM_DATA } from "./types";



export const updateFormData = (data) => ({
  type: UPDATE_FORM_DATA,
  payload: data,
});

export const resetFormData = () => ({
  type: RESET_FORM_DATA,
});
export const filterToAz = ()=>{
  return {
    type: ORDER_TO_AZ
  }
}

export const filterToZa = ()=>{
  return {
    type: ORDER_TO_ZA
  }
}
export const filterToApi = ()=>{
  return {
    type: ORDER_TO_API
  }
}
export const filterToDb = ()=>{
  return {
    type: ORDER_TO_DB
  }
}