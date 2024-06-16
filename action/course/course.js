import * as api from "../../api";
import { ADD_COURSE } from "../../constants/actionTypes";

export const addCourse = (formData) => async (dispatch) => {
  try {
    const response = await api.addCourse(formData)
    dispatch({ type: ADD_COURSE, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};