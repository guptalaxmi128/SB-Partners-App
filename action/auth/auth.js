import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "../../api";
import {
  REGISTER,
  LOGIN,
  VERIFY_OTP,
  GET_INSTRUCTOR,
  UPDATE_INSTRUCTOR,
  UPDATE_TUTOR_TERM,
  UPDATE_THERAPIST_TERM,
  UPDATE_YS_TERM
} from "../../constants/actionTypes";

export const register = (userInfo) => async (dispatch) => {
  try {
    const { data } = await api.register(userInfo);
    dispatch({ type: REGISTER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = (userInfo) => async (dispatch) => {
  try {
    const { data } = await api.login(userInfo);
    dispatch({ type: LOGIN, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyOtp = (otpInfo) => async (dispatch) => {
  try {
    const { data } = await api.verifyOtp(otpInfo);
    dispatch({ type: VERIFY_OTP, payload: data });
    console.log("authToken", data.authToken);
    await AsyncStorage.setItem("authToken", data.authToken);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInstructor = () => async (dispatch) => {
  try {
    const { data } = await api.getInstructor();
    dispatch({ type: GET_INSTRUCTOR, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateInstructor = (formData) => async (dispatch) => {
  try {
    const response = await api.updateInstructor(formData);
    dispatch({ type: UPDATE_INSTRUCTOR, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTutorTerm = (termInfo) => async (dispatch) => {
  try {
    const response = await api.updateTutorTerm(termInfo);
    dispatch({ type: UPDATE_TUTOR_TERM, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTherapistTerm = (termInfo) => async (dispatch) => {
  try {
    const response = await api.updateTherapistTerm(termInfo);
    dispatch({ type: UPDATE_THERAPIST_TERM, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateYogaStudioTerm = (termInfo) => async (dispatch) => {
  try {
    const response = await api.updateYogaStudioTerm(termInfo);
    dispatch({ type: UPDATE_YS_TERM, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
