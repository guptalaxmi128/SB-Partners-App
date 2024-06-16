import {
  ADD_EXPERIENCE,
  GET_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
} from "../../constants/actionTypes";

const initialState = {
  experience: [],
  state: "idle",
  error: null,
  success: null,
};

export const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPERIENCE:
      return {
        ...state,
        experience: action.payload.experience,
      };
    case GET_EXPERIENCE:
      return {
        ...state,
        experience: action.payload,
      };

    case UPDATE_EXPERIENCE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

      case DELETE_EXPERIENCE:
        const experienceIdToDelete = action.payload;
        return {
          ...state,
          experience: Array.isArray(state.experience) 
            ? state.experience.filter(experience => experience.id !== experienceIdToDelete) 
            : [],
        };

    default:
      return state;
  }
};

export default experienceReducer;
