import {
   ADD_COURSE
  } from "../../constants/actionTypes";
  
  const initialState = {
    course: [],
    state: "idle",
    error: null,
    success: null,
  };
  
  export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_COURSE:
        return {
          ...state,
          course: action.payload.course,
        };
   
      default:
        return state;
    }
  };
  
  export default courseReducer;
  