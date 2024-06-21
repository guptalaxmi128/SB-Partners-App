import {
  ADD_STUDIO_STEP_FIRST,
  ADD_STUDIO_STEP_SECOND,
  ADD_STUDIO_STEP_THIRD,
  ADD_YOGA_STUDIO,
  DELETE_STUDIO,
  GET_YOGA_STUDIO,
  GET_YOGA_STUDIO_BY_ID,
  UPDATE_STUDIO_STEP_FIRST,
  UPDATE_STUDIO_STEP_SECOND,
  UPDATE_YOGA_STUDIO,
  DELETE_STUDIO_IMAGE,
  DELETE_STUDIO_CONTACT,
  DELETE_STUDIO_TIME,
  SUBMIT_YOGA_STUDIO,
  SUBMIT_YS_CONTACT,
  SUBMIT_YS_IMAGE,
  SUBMIT_YS_TIME,
  PUBLISH_YOGA_STUDIO,
} from "../../constants/actionTypes";

const initialState = {
  yogaStudio: [],
  yogaStudioById: [],
  stepFirst: [],
  stepSecond: [],
  stepThird: [],
  state: "idle",
  error: null,
  success: null,
};

export const yogaStudioReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_YOGA_STUDIO:
      return {
        ...state,
        yogaStudio: action.payload.yogaStudio,
      };
    case GET_YOGA_STUDIO:
      return {
        ...state,
        yogaStudio: action.payload,
      };
    case GET_YOGA_STUDIO_BY_ID:
      return {
        ...state,
        yogaStudioById: action.payload,
      };
    case ADD_STUDIO_STEP_FIRST:
      return {
        ...state,
        stepFirst: action.payload.stepFirst,
      };
    case ADD_STUDIO_STEP_SECOND:
      return {
        ...state,
        stepSecond: action.payload.stepSecond,
      };
    case ADD_STUDIO_STEP_THIRD:
      return {
        ...state,
        stepThird: action.payload.stepThird,
      };
    case UPDATE_YOGA_STUDIO:
    case UPDATE_STUDIO_STEP_FIRST:
    case UPDATE_STUDIO_STEP_SECOND:
    case SUBMIT_YOGA_STUDIO:
    case SUBMIT_YS_CONTACT:
    case SUBMIT_YS_IMAGE:
    case SUBMIT_YS_TIME:
    case PUBLISH_YOGA_STUDIO:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case DELETE_STUDIO:
      const studioIdToDelete = action.payload;
      return {
        ...state,
        yogaStudio: Array.isArray(state.yogaStudio)
          ? state.yogaStudio.filter((studio) => studio.id !== studioIdToDelete)
          : [],
      };
    case DELETE_STUDIO_IMAGE:
      const imageIdToDelete = action.payload;
      return {
        ...state,
        stepThird: Array.isArray(state.stepThird)
          ? state.stepThird.filter((studio) => studio.id !== imageIdToDelete)
          : [],
      };
    case DELETE_STUDIO_CONTACT:
      const contactIdToDelete = action.payload;
      return {
        ...state,
        stepFirst: Array.isArray(state.stepFirst)
          ? state.stepFirst.filter((studio) => studio.id !== contactIdToDelete)
          : [],
      };
    case DELETE_STUDIO_TIME:
      const timeIdToDelete = action.payload;
      return {
        ...state,
        stepSecond: Array.isArray(state.stepSecond)
          ? state.stepSecond.filter((studio) => studio.id !== timeIdToDelete)
          : [],
      };

    default:
      return state;
  }
};

export default yogaStudioReducer;
