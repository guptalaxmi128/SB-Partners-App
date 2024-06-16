import * as api from "../../api";
import {
  ADD_HOME_TUTOR,
  ADD_TUTOR_LOCATION,
  GET_TUTOR_QUALIFICATION,
  GET_TUTOR,
  GET_TUTOR_BY_ID,
  ADD_TIME_SLOT,
  ADD_TUTOR_PHOTO,
  UPDATE_HOME_TUTOR,
  DELETE_HOME_TUTOR,
  DELETE_TUTOR_LOCATION,
  DELETE_TUTOR_TIME_SLOT,
  DELETE_TUTOR_IMAGE,
  SUBMIT_HOME_TUTOR,
  PUBLISH_HOME_TUTOR
} from "../../constants/actionTypes";

export const addHomeTutor = (tutorInfo) => async (dispatch) => {
  try {
    const response = await api.addHomeTutor(tutorInfo);
    dispatch({ type: ADD_HOME_TUTOR, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTutorLocation = (locationInfo) => async (dispatch) => {
  try {
    const response = await api.addTutorLocation(locationInfo);
    dispatch({ type: ADD_TUTOR_LOCATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTutorQualification = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTutorQualification(id);
    dispatch({ type: GET_TUTOR_QUALIFICATION, payload: data });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTutor = () => async (dispatch) => {
  try {
    const { data } = await api.getTutor();
    dispatch({ type: GET_TUTOR, payload: data });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTutorById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTutorById(id);
    dispatch({ type: GET_TUTOR_BY_ID, payload: data });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTimeSlot = (slot) => async (dispatch) => {
  try {
    const response = await api.addTimeSlot(slot);
    dispatch({ type: ADD_TIME_SLOT, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTutorPhoto = (formData, id) => async (dispatch) => {
  try {
    const response = await api.addTutorPhoto(formData, id);
    dispatch({ type: ADD_TUTOR_PHOTO, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateHomeTutor = (tutorInfo) => async (dispatch) => {
  try {
    const response = await api.updateHomeTutor(tutorInfo);
    dispatch({ type: UPDATE_HOME_TUTOR, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const deleteHomeTutor = (id) => async (dispatch) => {
  try {
    const response = await api.deleteHomeTutor(id);
    dispatch({ type: DELETE_HOME_TUTOR, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTutorLocation = (id) => async (dispatch) => {
  try {
    const response = await api.deleteTutorLocation(id);
    dispatch({ type: DELETE_TUTOR_LOCATION, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTutorSlot = (id) => async (dispatch) => {
  try {
    const response = await api.deleteTutorSlot(id);
    dispatch({ type: DELETE_TUTOR_TIME_SLOT, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTutorImage = (id) => async (dispatch) => {
  try {
    const response = await api.deleteTutorImage(id);
    dispatch({ type: DELETE_TUTOR_IMAGE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const submitHomeTutor = (id) => async (dispatch) => {
  try {
    const response = await api.submitHomeTutor(id);
    dispatch({ type: SUBMIT_HOME_TUTOR, payload:response.data});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const publishHomeTutor = (id) => async (dispatch) => {
  try {
    const response = await api.publishHomeTutor(id);
    dispatch({ type: PUBLISH_HOME_TUTOR, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
