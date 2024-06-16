import * as api from "../../api";
import { GET_CATEGORY } from "../../constants/actionTypes";



export const getCategory = () => async (dispatch) => {  
    try {
      const { data } = await api.getCategory();
      dispatch({ type: GET_CATEGORY, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
