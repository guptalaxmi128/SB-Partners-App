import * as api from "../../api";
import { ADD_EXPERIENCE,GET_EXPERIENCE,UPDATE_EXPERIENCE,DELETE_EXPERIENCE } from "../../constants/actionTypes";

export const addExperience = (experienceInfo) => async (dispatch) => {
  try {
    const response = await api.addExperience(experienceInfo);
    dispatch({ type: ADD_EXPERIENCE, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExperience = (id) => async (dispatch) => {  
  try {
    const { data } = await api.getExperience(id);
    dispatch({ type: GET_EXPERIENCE, payload: data });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateExperience = (experience) => async (dispatch) => {
  try {
    const response = await api.updateExperience(experience);
    dispatch({ type: UPDATE_EXPERIENCE, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const response = await api.deleteExperience(id);
    dispatch({ type: DELETE_EXPERIENCE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
