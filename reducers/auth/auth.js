import {
  REGISTER,
  LOGIN,
  VERIFY_OTP,
  GET_INSTRUCTOR,
  UPDATE_INSTRUCTOR,
  UPDATE_TUTOR_TERM,
  UPDATE_THERAPIST_TERM,
  UPDATE_YS_TERM,
} from "../../constants/actionTypes";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case VERIFY_OTP:
      return {
        ...state,
        user: action.payload.user,
      };
    case GET_INSTRUCTOR:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_INSTRUCTOR:
      case UPDATE_TUTOR_TERM:
        case UPDATE_THERAPIST_TERM:
          case UPDATE_YS_TERM:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
