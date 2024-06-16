import {
   
    ADD_THERAPIST,
    GET_THERAPIST,
    ADD_THERAPIST_LOCATION,
    ADD_THERAPIST_PHOTO,
    ADD_THERAPIST_SLOT,
    ADD_THERAPY
  } from "../../constants/actionTypes";
  
  const initialState = {
    therapist: [],
    location: [],
    slot: [],
    photo: [],
    therapy:[],
    state: "idle",
    error: null,
    success: null,
  };
  
  export const therapistReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_THERAPIST:
        return {
          ...state,
          therapist: action.payload.therapist,
        };
      case ADD_THERAPIST_LOCATION:
        return {
          ...state,
          location: action.payload.location,
        };
   
      case GET_THERAPIST:
        return {
          ...state,
          therapist: action.payload,
        };
      case ADD_THERAPIST_SLOT:
        return {
          ...state,
          slot: action.payload.slot,
        };
      case ADD_THERAPIST_PHOTO:
        return {
          ...state,
          photo: action.payload.photo,
        };
        case ADD_THERAPY:
          return {
            ...state,
          therapy: action.payload.therapy,
          };
    //   case UPDATE_HOME_TUTOR:
    //     return {
    //       ...state,
    //       success: action.payload,
    //       error: null,
    //     };
    //   case DELETE_HOME_TUTOR:
    //     const tutorIdToDelete = action.payload;
    //     return {
    //       ...state,
    //       homeTutor: Array.isArray(state.homeTutor)
    //         ? state.homeTutor.filter((tutor) => tutor.id !== tutorIdToDelete)
    //         : [],
    //     };
    //   case DELETE_TUTOR_LOCATION:
    //     const locationIdToDelete = action.payload;
    //     return {
    //       ...state,
    //       location: Array.isArray(state.location)
    //         ? state.location.filter(
    //             (location) => location.id !== locationIdToDelete
    //           )
    //         : [],
    //     };
    //     case DELETE_TUTOR_IMAGE:
    //       const imageIdToDelete = action.payload;
    //       return {
    //         ...state,
    //         photo: Array.isArray(state.photo)
    //           ? state.photo.filter(
    //               (photo) => photo.id !== imageIdToDelete
    //             )
    //           : [],
    //       };
    //       case DELETE_TUTOR_TIME_SLOT:
    //         const slotIdToDelete = action.payload;
    //         return {
    //           ...state,
    //           slot: Array.isArray(state.slot)
    //             ? state.slot.filter(
    //                 (slot) => slot.id !== slotIdToDelete
    //               )
    //             : [],
    //         };
  
      default:
        return state;
    }
  };
  
  export default therapistReducer;
  