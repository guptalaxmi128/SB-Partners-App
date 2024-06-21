import * as api from "../../api";
import {
  ADD_YOGA_STUDIO,
  GET_YOGA_STUDIO,
  ADD_STUDIO_STEP_FIRST,
  ADD_STUDIO_STEP_SECOND,
  ADD_STUDIO_STEP_THIRD,
  GET_YOGA_STUDIO_BY_ID,
  UPDATE_YOGA_STUDIO,
  UPDATE_STUDIO_STEP_FIRST,
  UPDATE_STUDIO_STEP_SECOND,
  DELETE_STUDIO,
  DELETE_STUDIO_CONTACT,
  DELETE_STUDIO_IMAGE,
  DELETE_STUDIO_TIME,
  PUBLISH_YOGA_STUDIO,
  SUBMIT_YS_CONTACT,
  SUBMIT_YS_IMAGE,
  SUBMIT_YOGA_STUDIO,
  SUBMIT_YS_TIME
} from "../../constants/actionTypes";

export const yogaStudio = (studio) => async (dispatch) => {
  try {
    const response = await api.yogaStudio(studio);
    dispatch({ type: ADD_YOGA_STUDIO, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getYogaStudio = () => async (dispatch) => {
  try {
    const { data } = await api.getYogaStudio();
    dispatch({ type: GET_YOGA_STUDIO, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const studioStepFirst = (studio) => async (dispatch) => {
  try {
    const response = await api.studioStepFirst(studio);
    dispatch({ type: ADD_STUDIO_STEP_FIRST, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const studioStepSecond = (studio) => async (dispatch) => {
  try {
    const response = await api.studioStepSecond(studio);
    dispatch({ type: ADD_STUDIO_STEP_SECOND, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const studioStepThird = (formData, businessId) => async (dispatch) => {
  try {
    // const businessId = formData.get("businessId");
    const response = await api.studioStepThird(formData, businessId);
    dispatch({ type: ADD_STUDIO_STEP_THIRD, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getYogaStudioById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getYogaStudioById(id);
    dispatch({ type: GET_YOGA_STUDIO_BY_ID, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateYogaStudio = (studio) => async (dispatch) => {
  try {
    const response = await api.updateYogaStudio(studio);
    dispatch({ type: UPDATE_YOGA_STUDIO, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateStudioStepFirst = (studio) => async (dispatch) => {
  try {
    const response = await api.updateStudioStepFirst(studio);
    dispatch({ type: UPDATE_STUDIO_STEP_FIRST, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateStudioStepSecond = (studio) => async (dispatch) => {
  try {
    const response = await api.updateStudioStepSecond(studio);
    dispatch({ type: UPDATE_STUDIO_STEP_SECOND, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteStudio = (id) => async (dispatch) => {
  try {
    const response = await api.deleteStudio(id);
    dispatch({ type: DELETE_STUDIO, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudioTime = (id) => async (dispatch) => {
  try {
    const response = await api.deleteStudioTime(id);
    dispatch({ type: DELETE_STUDIO_TIME, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudioContact = (id) => async (dispatch) => {
  try {
    const response = await api.deleteStudioContact(id);
    dispatch({ type: DELETE_STUDIO_CONTACT, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudioImage = (id) => async (dispatch) => {
  try {
    const response = await api.deleteStudioImage(id);
    dispatch({ type: DELETE_STUDIO_IMAGE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const submitYogaStudio = (id) => async (dispatch) => {
  try {
    const response = await api.submitYogaStudio(id);
    dispatch({ type: SUBMIT_YOGA_STUDIO, payload:response.data});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const submitYogaStudioTime = (id) => async (dispatch) => {
  try {
    const response = await api.submitYogaStudioTime(id);
    dispatch({ type: SUBMIT_YS_TIME, payload:response.data});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const submitYogaStudioContact = (id) => async (dispatch) => {
  try {
    const response = await api.submitYogaStudioContact(id);
    dispatch({ type: SUBMIT_YS_CONTACT, payload:response.data});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const submitYogaStudioImage = (id) => async (dispatch) => {
  try {
    const response = await api.submitYogaStudioImage(id);
    dispatch({ type: SUBMIT_YS_IMAGE, payload:response.data});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const publishYogaStudio = (id) => async (dispatch) => {
  try {
    const response = await api.publishYogaStudio(id);
    dispatch({ type: PUBLISH_YOGA_STUDIO, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};