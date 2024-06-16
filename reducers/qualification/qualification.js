import {
  ADD_QUALIFICATION,
  DELETE_QUALIFICATION,
  GET_QUALIFICATION,
  UPDATE_QUALIFICATION,
} from "../../constants/actionTypes";

const initialState = {
  qualification: [],
  state: "idle",
  error: null,
  success: null,
};

export const qualificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUALIFICATION:
      return {
        ...state,
        qualification: action.payload.qualification,
      };
    case GET_QUALIFICATION:
      return {
        ...state,
        qualification: action.payload,
      };
    case UPDATE_QUALIFICATION:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

    case DELETE_QUALIFICATION:
      const qualificationIdToDelete = action.payload;
      return {
        ...state,
        qualification: Array.isArray(state.qualification)
          ? state.qualification.filter(
              (qualification) => qualification.id !== qualificationIdToDelete
            )
          : [],
      };

    default:
      return state;
  }
};

export default qualificationReducer;
