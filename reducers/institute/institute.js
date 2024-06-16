import {
  GET_COURSE_DURATION,
  GET_COURSE_DURATION_TYPE,
  GET_COURSE_TYPE,
  GET_INSTITUTE,
} from "../../constants/actionTypes";

const initialState = {
  courseType: [],
  courseDuration: [],
  courseDurationType: [],
  institute: [],
  state: "idle",
  error: null,
  success: null,
};

export const instituteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_TYPE:
      return {
        ...state,
        courseType: action.payload,
      };
    case GET_COURSE_DURATION:
      return {
        ...state,
        courseDuration: action.payload,
      };

    case GET_INSTITUTE:
      return {
        ...state,
        institute: action.payload,
      };
    case GET_COURSE_DURATION_TYPE:
      return {
        ...state,
        courseDurationType: action.payload,
      };

    default:
      return state;
  }
};

export default instituteReducer;
