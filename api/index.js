import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  // baseURL: "http://192.168.43.3:5000/api/",
  baseURL: "http://192.168.1.5:5000/api/",
  // baseURL:"https://swasti.onrender.com/api/",
});

api.interceptors.request.use(
  async (req) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`;
      }
    } catch (error) {
      console.error("Error retrieving authToken from AsyncStorage", error);
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = (userInfo) =>
  api.post(`instructor/registerByNumber`, userInfo);
export const login = (userInfo) =>
  api.post(`instructor/loginByNumber`, userInfo);
export const verifyOtp = (otpInfo) =>
  api.post(`instructor/verifyNumberOTP`, otpInfo);
export const getInstructor = () => api.get(`instructor/instructor`);
export const updateInstructor = (formData) =>
  api.put(`instructor/updateInstructor`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateTutorTerm = (termInfo) =>
  api.put(`instructor/homeTutorTerm`, termInfo);
export const updateTherapistTerm = (termInfo) =>
  api.put(`instructor/therapistTerm`, termInfo);

// yoga studio form
export const yogaStudio = (studio) =>
  api.post(`instructor/createYogaStudioBusiness`, studio);
export const getYogaStudio = () => api.get(`instructor/myYogaStudios`);
export const updateYogaStudio = ({ id, ...studio }) =>
  api.put(`instructor/updateYogaStudioBusiness/${id}`, studio);
export const getYogaStudioById = (id) => api.get(`instructor/yogaStudios/${id}`);
export const studioStepFirst = ({ businessId, ...studio }) =>
  api.post(`instructor/createYogaStudioContact/${businessId}`, studio);
export const updateStudioStepFirst = ({ id, ...studio }) =>
  api.put(`instructor/updateYogaStudioContact/${id}`, studio);
export const studioStepSecond = ({ businessId, ...studio }) =>
  api.post(`instructor/createYogaStudioTiming/${businessId}`, studio);
export const updateStudioStepSecond = ({ id, ...studio }) =>
  api.put(`instructor/updateYogaStudioTime/${id}`, studio);
export const studioStepThird = (formData, businessId) => {
  return api.post(`instructor/createYogaStudioImage/${businessId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteStudio = (id) =>
  api.delete(`instructor/deleteYSBusiness/${id}`);
export const deleteStudioImage = (id) =>
  api.delete(`instructor/deleteYSImage/${id}`);
export const deleteStudioContact = (id) =>
  api.delete(`instructor/deleteYSContact/${id}`);
export const deleteStudioTime = (id) =>
  api.delete(`instructor/deleteYSTime/${id}`);

export const getCategory = () => api.get(`instructor/coursecategories`);
export const getCourseDuration = () => api.get(`instructor/courseDurations`);
export const getCourseType = () => api.get(`instructor/courseTypes`);
export const getInstitute = () => api.get(`instructor/university_institutes`);
export const getCourseDurationType = (type) =>
  api.get(`instructor/courseDurationTypes/${type}`);

export const addCourse = (formData) => {
  return api.post(`instructor/addCourse`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addQualification = (formData) => {
  // console.log('Sending form data:', formData);
  return api.post(`instructor/addQualification`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getQualification = (id) =>
  api.get(`instructor/qualification/${id}`);
export const updateQualification = (id, formData) => {
  // console.log("formData", formData)
  // console.log(id)
  return api.put(`instructor/updateQualification/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteQualification = (id) =>
  api.delete(`instructor/deleteQualification/${id}`);

export const addExperience = (experienceInfo) =>
  api.post(`instructor/addExperience`, experienceInfo);
export const getExperience = (id) => api.get(`instructor/experience/${id}`);
export const updateExperience = ({ id, ...experience }) => {
  return api.put(`instructor/updateExperiencen/${id}`, experience);
};

export const deleteExperience = (id) =>
  api.delete(`instructor/deleteExperienceInstructor/${id}`);

// home tutor
export const addHomeTutor = (tutorInfo) =>
  api.post(`instructor/createHomeTutor`, tutorInfo);

export const addTutorLocation = ({ id, ...location }) =>
  api.post(`instructor/addHTutorSeviceArea/${id}`, location);
export const getTutorQualification = (id) => api.get(`instructor/qualificationIn/${id}`);
export const getTutor = () => api.get(`instructor/homeTutors`);
export const getTutorById = (id) => api.get(`instructor/homeTutors/${id}`);
export const addTimeSlot = ({ id, ...slot }) =>
  api.post(`instructor/addHTutorTimeSlote/${id}`, slot);
export const addTutorPhoto = (formData, id) => {
  return api.post(`instructor/addHTutorImage/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateHomeTutor = ({ id, ...tutorInfo }) => {
  return api.put(`instructor/updateHomeTutor/${id}`, tutorInfo);
};
export const submitHomeTutor = (id) => {
  return api.put(`instructor/submitHomeTutor/${id}`);
};

export const publishHomeTutor = ({ id, ...publish }) => {
  return api.put(`instructor/publishHomeTutor/${id}`, publish);
};


export const deleteHomeTutor = (id) =>
  api.delete(`instructor/deleteHomeTutor/${id}`);
export const deleteTutorImage = (id) =>
  api.delete(`instructor/deleteHTutorImage/${id}`);
export const deleteTutorLocation = (id) =>
  api.delete(`instructor/deleteHTutorServiceArea/${id}`);

export const deleteTutorSlot = (id) =>
  api.delete(`instructor/deleteHTutorTimeSlote/${id}`);

export const addTherapist = (therapistInfo) =>
  api.post(`instructor/createTherapy`, therapistInfo);
export const getTherapist = () => api.get(`instructor/therapies`);
export const getTherapistById = (id) => api.get(`instructor/therapies/${id}`);
export const addTherapistLocation = ({ id, ...location }) =>
  api.post(`instructor/addTherapySeviceArea/${id}`, location);

export const addTherapistSlot = ({ id, ...slot }) =>
  api.post(`instructor/addTherapyTimeSlote/${id}`, slot);
export const addTherapistPhoto = (formData, id) => {
  return api.post(`instructor/addTherapyImage/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addTherapy = ({ id, ...therapyInfo }) =>
  api.post(`instructor/addTherapyTypeOffered/${id}`, therapyInfo);