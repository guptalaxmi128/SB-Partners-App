import * as api from "../../api";
import {
  ADD_QUALIFICATION,
  DELETE_QUALIFICATION,
  GET_QUALIFICATION,
  UPDATE_QUALIFICATION,
} from "../../constants/actionTypes";

export const addQualification = (formData) => async (dispatch) => {
  try {
    const response = await api.addQualification(formData);
    dispatch({ type: ADD_QUALIFICATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQualification = (id) => async (dispatch) => {
  try {
    const { data } = await api.getQualification(id);
    dispatch({ type: GET_QUALIFICATION, payload: data });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateQualification = (id,formData) => async (dispatch) => {
  try {
    const response = await api.updateQualification(id,formData);
    dispatch({ type: UPDATE_QUALIFICATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteQualification = (id) => async (dispatch) => {
  try {
    const response = await api.deleteQualification(id);
    dispatch({ type: DELETE_QUALIFICATION, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
