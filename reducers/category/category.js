import { GET_CATEGORY } from "../../constants/actionTypes";

const initialState = {
  category: [],
  state: "idle",
  error: null,
  success: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
