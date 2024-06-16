import { combineReducers } from "redux";
import authReducer from "./auth/auth";
import yogaStudio from "./yogaStudio/yogaStudio";
import category from "./category/category";
import institute from "./institute/institute";
import course from "./course/course";
import qualification from "./qualification/qualification";
import experience from "./experience/experience";
import homeTutor from "./homeTutor/homeTutor";

export const rootReducer = combineReducers({
  auth: authReducer,
  studio:yogaStudio,
  category,
  institute,
  course,
  qualification,
  experience,
  homeTutor
});
