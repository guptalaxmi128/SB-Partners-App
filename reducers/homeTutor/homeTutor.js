import {
  ADD_HOME_TUTOR,
  ADD_TUTOR_LOCATION,
  GET_TUTOR_QUALIFICATION,
  GET_TUTOR,
  ADD_TIME_SLOT,
  ADD_TUTOR_PHOTO,
  UPDATE_HOME_TUTOR,
  DELETE_HOME_TUTOR,
  DELETE_TUTOR_LOCATION,
  DELETE_TUTOR_IMAGE,
  DELETE_TUTOR_TIME_SLOT,
  PUBLISH_HOME_TUTOR,
  SUBMIT_HOME_TUTOR,
} from "../../constants/actionTypes";

const initialState = {
  homeTutor: [],
  location: [],
  qualification: [],
  slot: [],
  photo: [],
  state: "idle",
  error: null,
  success: null,
};

export const homeTutorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HOME_TUTOR:
      return {
        ...state,
        homeTutor: action.payload.homeTutor,
      };
    case ADD_TUTOR_LOCATION:
      return {
        ...state,
        location: action.payload.location,
      };
    case GET_TUTOR_QUALIFICATION:
      return {
        ...state,
        qualification: action.payload,
      };
    case GET_TUTOR:
      return {
        ...state,
        homeTutor: action.payload,
      };
    case ADD_TIME_SLOT:
      return {
        ...state,
        slot: action.payload.slot,
      };
    case ADD_TUTOR_PHOTO:
      return {
        ...state,
        photo: action.payload.photo,
      };
    case UPDATE_HOME_TUTOR:
      case PUBLISH_HOME_TUTOR:
        case SUBMIT_HOME_TUTOR:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case DELETE_HOME_TUTOR:
      const tutorIdToDelete = action.payload;
      return {
        ...state,
        homeTutor: Array.isArray(state.homeTutor)
          ? state.homeTutor.filter((tutor) => tutor.id !== tutorIdToDelete)
          : [],
      };
    case DELETE_TUTOR_LOCATION:
      const locationIdToDelete = action.payload;
      return {
        ...state,
        location: Array.isArray(state.location)
          ? state.location.filter(
              (location) => location.id !== locationIdToDelete
            )
          : [],
      };
      case DELETE_TUTOR_IMAGE:
        const imageIdToDelete = action.payload;
        return {
          ...state,
          photo: Array.isArray(state.photo)
            ? state.photo.filter(
                (photo) => photo.id !== imageIdToDelete
              )
            : [],
        };
        case DELETE_TUTOR_TIME_SLOT:
          const slotIdToDelete = action.payload;
          return {
            ...state,
            slot: Array.isArray(state.slot)
              ? state.slot.filter(
                  (slot) => slot.id !== slotIdToDelete
                )
              : [],
          };

    default:
      return state;
  }
};

export default homeTutorReducer;
