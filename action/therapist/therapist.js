import * as api from "../../api";
import { ADD_THERAPIST,GET_THERAPIST,GET_THERAPIST_BY_ID,ADD_THERAPIST_LOCATION,ADD_THERAPIST_SLOT,ADD_THERAPIST_PHOTO,ADD_THERAPY } from "../../constants/actionTypes";

export const addTherapist = (therapistInfo) => async (dispatch) => {
  try {
    const response = await api.addTherapist(therapistInfo);
    dispatch({ type: ADD_THERAPIST, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTherapist = () => async (dispatch) => {
  try {
    const { data } = await api.getTherapist();
    dispatch({ type: GET_THERAPIST, payload: data });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTherapistById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTherapistById(id);
    dispatch({ type: GET_THERAPIST_BY_ID, payload: data });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTherapistLocation = (locationInfo) => async (dispatch) => {
  try {
    const response = await api.addTherapistLocation(locationInfo);
    dispatch({ type: ADD_THERAPIST_LOCATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTherapistSlot = (slot) => async (dispatch) => {
  try {
    const response = await api.addTherapistSlot(slot);
    dispatch({ type: ADD_THERAPIST_SLOT, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTherapistPhoto = (formData, id) => async (dispatch) => {
  try {
    const response = await api.addTherapistPhoto(formData, id);
    dispatch({ type: ADD_THERAPIST_PHOTO, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTherapy = (therapyInfo) => async (dispatch) => {
  try {
    const response = await api.addTherapy(therapyInfo);
    dispatch({ type: ADD_THERAPY, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};