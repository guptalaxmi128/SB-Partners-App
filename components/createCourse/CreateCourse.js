import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import Toast from 'react-native-toast-message';
import clock from "../../assets/course/clock.png";
import calendar from "../../assets/course/note-text.png";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../action/category/category";

const CreateCourse = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCertificationType, setSelectedCertificationType] =
    useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("Select Date");
  const [isStartTimeVisible, setStartTimeVisibility] = useState(false);
  const [startTime, setStartTime] = useState("Select Time");

  const [isEndTimeVisible, setEndTimeVisibility] = useState(false);
  const [endTime, setEndTime] = useState("Select Time");
  const [courseImage, setCourseImage] = useState(null); // State to store the selected image
  const [courseCategory, setCourseCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const category = useSelector((state) => state.category.category);
  // console.log(category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getCategory());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (category && category.data) {
      setCourseCategory(category.data);
    }
  }, [category]);

  // if (!category || loading) {   getting error from this
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="small" color="#0000ff" />
  //     </View>
  //   );
  // }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      // allowsEditing: true,
      // selectionLimit: 1,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setCourseImage(result.assets[0].uri);
    }
  };

  const totalSteps = 3;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showStartTimePicker = () => {
    setStartTimeVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimeVisibility(false);
  };

  const handleStartTimeConfirm = (date) => {
    const selectedTime = new Date(date);
    const currentTime = new Date();

    if (selectedTime < currentTime) {
      handleError("Start time cannot be in the past", "startTime");
      hideStartTimePicker();
      return;
    }

    const formattedTime = selectedTime.toLocaleTimeString();
    setStartTime(formattedTime);
    hideStartTimePicker();
    handleError(null, "startTime");
  };

  const handleEndTimeConfirm = (date) => {
    const selectedTime = new Date(date);
    const currentTime = new Date();

    if (selectedTime < currentTime) {
      handleError("End time cannot be in the past", "endTime");
      hideEndTimePicker();
      return;
    }

    const formattedTime = selectedTime.toLocaleTimeString();
    setEndTime(formattedTime);
    hideEndTimePicker();
    handleError(null, "endTime");
  };

  const showEndTimePicker = () => {
    setEndTimeVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimeVisibility(false);
  };

  const handleDateConfirm = (date) => {
    if (!date) {
      // If no date is selected, set an error message for the date field
      handleError("Please select a valid date", "date");
      return; // Exit the function without setting the date state
    }

    // console.warn("A date has been picked: ", date);
    const dt = new Date(date);
    const x = dt.toISOString().split("T");
    const x1 = x[0].split("-");
    console.log(x1[2] + "/" + x1[1] + "/" + x1[0]);
    setDate(x1[1] + "/" + x1[2] + "/" + x1[0]);
    handleError(null, "date");
    hideDatePicker();
  };
  const courseType = [
    { key: "1", value: "Recorded Video" },
    { key: "2", value: "Live Classes" },
  ];

  const level = [
    { key: "1", value: "Beginner" },
    { key: "2", value: "Intermediate" },
    { key: "3", value: "Advanced" },
  ];

  const language = [
    { key: "1", value: "Hindi" },
    { key: "2", value: "English" },
  ];

  const certificationType = [
    { key: "1", value: "Yes" },
    { key: "2", value: "No" },
  ];

  const institutes = [
    { key: "1", value: "Morarji Desai National Institute of Yoga (Delhi)" },
    { key: "2", value: "Parmarth Niketan Ashram (Uttrakhand)" },
    { key: "3", value: "Phool Chatti Ashram (Uttrakhand)" },
    { key: "4", value: "Yoga Niketan Ashram (Uttrakhand)" },
    { key: "5", value: "The Yoga Institute (Maharashtra)" },
    {
      key: "6",
      value: "Ramamani Iyengar Memorial Yoga Institute (Maharashtra)",
    },
    { key: "7", value: "Shri Ambika Yoga Kutir (Maharashtra)" },
    {
      key: "8",
      value: "Vivekananda Yoga Anusandhana Samsthana or VYASA (Karnataka)",
    },
    { key: "9", value: "Ashtanga Yoga Research Institute (Karnataka)" },
    { key: "10", value: "Krishnamacharya Yoga Mandiram (Tamil Nadu)" },
    { key: "11", value: "Integral Yoga Institute (Tamil Nadu)" },
    { key: "12", value: "Isha Yoga Center (Tamil Nadu)" },
    { key: "13", value: "Sivananda Yoga Vedanta Dhanwantari Ashram (Kerala)" },
    { key: "14", value: "Amritapuri Ashram (Kerala)" },
    { key: "15", value: "Bihar School of Yoga (Bihar)" },
    { key: "16", value: "Brahma Kumari Center (Rajasthan)" },
    { key: "17", value: "Tourist Information Office (Assam)" },
    { key: "18", value: "Department of Tourism (Pudduchery)" },
    { key: "19", value: "Department of Health & Family Welfare (Odisha)" },
    {
      key: "20",
      value: "Indian Institute of Yogic Science & Research (Odisha)",
    },
    {
      key: "21",
      value: "Indian Systems of Medicine & Homeopathy (AYUSH) (Gujarat)",
    },
    {
      key: "22",
      value:
        "Directorate General of Indian System of Medicine (Jammu & Kashmir)",
    },
  ];

  const [inputs, setInputs] = useState({
    courseName: "",
    courseType: "",
    level: "",
    courseCategory: "",
    language: "",

    // Add more fields for step 2
    courseDescription: "",
    // Add more fields for step 3
    certificationType: "",
    introVideoLink: "",
    coursePrice: "",
    certificationFromInstitutes: "",
  });
  const [errors, setErrors] = useState({});

  const nextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < totalSteps ? prevStep + 1 : prevStep
    );
  };

  const validateStep1 = () => {
    // Validate step 1 fields
    let isValid = true;
    if (!inputs.courseName) {
      handleError("Please input course name", "courseName");
      isValid = false;
    }
    if (!inputs.courseType) {
      handleError("Please select course type", "courseType");
      isValid = false;
    }
    if (!inputs.level) {
      handleError("Please select level", "level");
      isValid = false;
    }
    if (!inputs.language) {
      handleError("Please select language", "language");
      isValid = false;
    }
    if (!inputs.courseCategory) {
      handleError("Please select course category", "courseCategory");
      isValid = false;
    }
    // Add similar validations for other fields in step 1
    if (isValid) {
      nextStep();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleSelectChange = (val, input) => {
    setInputs((prevState) => ({
      ...prevState,
      [input]: val,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const validateStep2 = () => {
    // Validate step 2 fields
    let isValid = true;
    if (!inputs.courseDescription) {
      handleError("Please input course description", "courseDescription");
      isValid = false;
    }
    if (date === "Select Date") {
      handleError("Please select a date", "date");
      isValid = false;
    }
    if (startTime === "Select Time") {
      handleError("Please select a start time", "startTime");
      isValid = false;
    }
    if (endTime === "Select Time") {
      handleError("Please select an end time", "endTime");
      isValid = false;
    }

    if (isValid) {
      nextStep();
    }
  };

  const validateStep3 = () => {
    let isValid = true;
    if (!inputs.coursePrice) {
      handleError("Please input course price", "coursePrice");
      isValid = false;
    }
    if (!inputs.certificationType) {
      handleError("Please select certification type", "certificationType");
      isValid = false;
    }

    if (!inputs.introVideoLink) {
      handleError("Please input course video link", "introVideoLink");
      isValid = false;
    }

    if (isValid) {
      nextStep();
    }
  };

  const renderStep1 = () => {
    return (
      <View>
        <Input
          onChangeText={(text) => handleOnchange(text, "courseName")}
          onFocus={() => handleError(null, "courseName")}
          label="Course Name"
          placeholder="Course Name"
          error={errors.courseName}
        />

        <Text style={styles.label}>Course Type</Text>
        <SelectList
          setSelected={(text) => handleSelectChange(text, "courseType")}
          data={courseType}
          save="value"
          fontFamily="Poppins"
          onFocus={() => handleError(null, "courseType")}
        />
        <Text style={styles.errorText}>{errors.courseType}</Text>
        <Text style={styles.label}>Level</Text>
        <SelectList
          setSelected={(text) => handleSelectChange(text, "level")}
          data={level}
          save="value"
          fontFamily="Poppins"
        />
        <Text style={styles.errorText}>{errors.level}</Text>
        <Text style={styles.label}>Language</Text>
        <SelectList
          setSelected={(text) => handleSelectChange(text, "language")}
          data={language}
          save="value"
          fontFamily="Poppins"
        />
        <Text style={styles.errorText}>{errors.language}</Text>
        <Text style={styles.label}>Course Category</Text>
        <SelectList
          setSelected={(text) => handleSelectChange(text, "courseCategory")}
          data={courseCategory.map((item) => ({
            label: item.courseCategoryNumber,
            value: item.categoryName,
          }))}
          save="value"
          fontFamily="Poppins"
        />
        <Text style={styles.errorText}>{errors.courseCategory}</Text>
        <View style={{ marginBottom: 20 }}>
          <Button
            title="Next"
            onPress={() => (currentStep < totalSteps ? validateStep1() : null)}
          />
        </View>
      </View>
    );
  };

  const renderStep2 = () => {
    return (
      <View>
        <Input
          onChangeText={(text) => handleOnchange(text, "courseDescription")}
          onFocus={() => handleError(null, "courseDescription")}
          multiline={true}
          numberOfLines={4}
          label="Course Description"
          placeholder="Course Description"
          error={errors.courseDescription}
          style={{ textAlignVertical: "top", padding: 12 }}
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => {
            showDatePicker();
          }}
        >
          <Image source={calendar} style={styles.icon} />
          <Text style={{ fontSize: 14, color: "gray", padding: 10 }}>
            {date}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={styles.errorText}>{errors.date}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View style={{ flex: 0.48 }}>
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => {
                handleError(null, "startTime");
                showStartTimePicker();
              }}
            >
              <Image source={clock} style={styles.icon} />
              <Text style={{ fontSize: 14, color: "gray", padding: 10 }}>
                {startTime}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartTimeVisible}
              mode="time"
              onConfirm={handleStartTimeConfirm}
              onCancel={hideStartTimePicker}
            />
            <Text style={styles.errorText}>{errors.startTime}</Text>
          </View>
          <View style={{ flex: 0.48 }}>
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => {
                handleError(null, "endTime");
                showEndTimePicker();
              }}
            >
              <Image source={clock} style={styles.icon} />
              <Text style={{ fontSize: 14, color: "gray", padding: 10 }}>
                {endTime}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimeVisible}
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={hideEndTimePicker}
            />
            <Text style={styles.errorText}>{errors.endTime}</Text>
          </View>
        </View>
        <Text style={styles.label}>Course Image</Text>

        <View style={styles.cameraContainer}>
            {courseImage ? (
              <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                <Image
                  source={{ uri: courseImage }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                <View style={styles.cameraButton}>
                  <Image
                    style={styles.cameraImage}
                    source={require("../../assets/camera.png")}
                  />
                  <Text style={styles.cameraText}>Add Photo</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

        <View style={{ marginBottom: 20 }}>
          <Button
            title="Next"
            onPress={() => (currentStep < totalSteps ? validateStep2() : null)}
          />
        </View>
      </View>
    );
  };

  const renderStep3 = () => {
    return (
      <View>
        <Input
          onChangeText={(text) => handleOnchange(text, "coursePrice")}
          onFocus={() => handleError(null, "coursePrice")}
          label="Course Price"
          placeholder="Course Price (eg.₹ 300.00)"
          error={errors.coursePrice}
        />

        <Text style={styles.label}>Certification Type</Text>
        <SelectList
          setSelected={(text) => {
            handleSelectChange(text, "certificationType");
            setSelectedCertificationType(text);
          }}
          data={certificationType}
          save="value"
          fontFamily="Poppins"
          onFocus={() => handleError(null, "certificationType")}
        />
        {selectedCertificationType === "Yes" && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Certification from Institute</Text>
            <SelectList
              setSelected={(text) =>
                handleOnchange(text, "certificationFromInstitute")
              }
              data={institutes}
              save="value"
              fontFamily="Poppins"
            />
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "introVideoLink")}
            onFocus={() => handleError(null, "introVideoLink")}
            label="Course Preview Link (Optional)"
            placeholder="(eg. https://www.youtube.com/watch?v=v7AYKMP6rOE)"
            error={errors.introVideoLink}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Button
            title="Submit"
            onPress={() => (currentStep < totalSteps ? validateStep3() : null)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" />
      <View style={{ paddingTop: 15 }}>
        <Header
          title={"Create Course"}
          icon={require("../../assets/back.png")}
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
          <View style={styles.progressContainer}>
            {/* Progress Bar */}
            {[...Array(totalSteps)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressBar,
                  index < currentStep ? styles.progressBarActive : null,
                ]}
              />
            ))}
          </View>
          <View style={{ marginTop: 20 }}>{renderStep()}</View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  progressBar: {
    backgroundColor: "#ccc",
    height: 5,
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 5,
  },
  progressBarActive: {
    backgroundColor: "rgba(102, 42, 178, 1)",
  },
  navigationButton: {
    textAlign: "center",
    paddingVertical: 10,
    color: "blue",
    fontWeight: "bold",
  },
  label: {
    // marginVertical: 5,
    fontSize: 14,
    fontFamily: "Poppins",
  },
  errorText: {
    marginTop: 7,
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins",
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center", // Ensure the image and text are aligned
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    fontFamily: "Poppins",
    height: 45,
    borderColor: "gray",
  },
  icon: {
    width: 20, // Set the appropriate width for the icon
    height: 20, // Set the appropriate height for the icon
    marginRight: 5, // Space between the icon and the text
  },
  cameraContainer: {
    width: wp(40),
    height: hp(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 10,
    backgroundColor: "#fff",
  },
  cameraImage: {
    width: 30,
    height: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  cameraText: {
    fontSize: hp(2),
    fontFamily: "Poppins",
    textAlign: "center",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default CreateCourse;
