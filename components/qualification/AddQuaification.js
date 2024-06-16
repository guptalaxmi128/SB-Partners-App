import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import { SelectList } from "react-native-dropdown-select-list";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import {
  getCourseType,
  getInstitute,
  getCourseDurationType,
} from "../../action/institute/institute";
import { addQualification } from "../../action/qualification/qualification";
import { useNavigation } from "@react-navigation/native";

const qualificationItem = [
  {key:'1', value:'YogaStudio'},
  {key:'2', value:'HomeTutor'},
  {key:'3', value:'Therapy'},
 
]

const AddQualification = () => {
  const dispatch = useDispatch();
  const navigation=useNavigation();
  const [inputs, setInputs] = useState({
    courseType: "",
    course: "",
    university_institute_name: "",
    duration: "",
    certificationNumber: "",
    format: "",
    percentage: "",
    CGPA: "",
    document: "",
    qualificationIn:''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [courseType, setCourseType] = useState([]);
  const [university, setUniversity] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  const [courseDurationData,setCourseDurationData]=useState(null);
  const [image,setImage]=useState([])



  const courseTypes = useSelector((state) => state.institute.courseType);

  const institutes = useSelector((state) => state.institute.institute);
  const courseDurationType = useSelector(
    (state) => state.institute.courseDurationType
  );

  // console.log(courseDurationType);

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        multiple:false
      });

      if (!result.canceled) {
        const file = result.assets[0];
        // console.log(result)
        setSelectedFile({
          uri: file.uri,
          type: file.mimeType  || 'application/octet-stream',
          name: file.name,
        });
        setImage(result.assets)
        
      } else {
        console.log("Document picking canceled or failed.");
      }
    } catch (error) {
      console.error("Error while picking a document:", error);
    }
  };

  // console.log(selectedFile)

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
    setErrors((prevState) => ({ ...prevState, [input]: "" }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

 const handleSelectChange = async (val, input) => {
  setInputs((prevState) => ({
    ...prevState,
    [input]: val,
  }));
  setErrors((prevState) => ({ ...prevState, [input]: "" }));

  if (input === "courseType") {
    // setLoading(true);
    try {
      await dispatch(getCourseDurationType(val));
      const courseDurationData = courseDurationType?.data;
      console.log(courseDurationData);
      if (courseDurationData && courseDurationData.length > 0) {
        const courseOptions = courseDurationData.map((courseData) => ({
          label: courseData.courseName,
          value: courseData.courseName,
        }));
        setCourseOptions(courseOptions);
        setCourseDurationData(courseDurationData); 
      }
    } catch (error) {
      console.error("Error fetching course duration type:", error);
    } 
  }

  // Update duration based on the selected course
  if (input === "course" && courseDurationData) {
    const selectedCourseData = courseDurationData.find(
      (courseData) => courseData.courseName === val
    );
    console.log("time",selectedCourseData)
    if (selectedCourseData) {
      setInputs((prevState) => ({
        ...prevState,
        duration: selectedCourseData.courseDuration,
      }));
    }
  }
};


  const format = [
    { key: "1", value: "Percentage(%)" },
    { key: "2", value: "CGPA" },
  ];

  // console.log(category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getCourseType());
        await dispatch(getInstitute());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (courseTypes && courseTypes.data) {
      setCourseType(courseTypes.data);
    }
  }, [courseTypes]);


  useEffect(() => {
    if (institutes && institutes.data) {
      setUniversity(institutes.data);
    }
  }, [institutes]);

  const validate = async () => {
    try {
      let isValid = true;
      const fields = [
        "courseType",
        "course",
        "university_institute_name",
        // "duration",
        "certificationNumber",
        "format",
        "qualificationIn"
      ];

      // Check if any field is empty
      fields.forEach((field) => {
        if (!inputs[field]) {
          handleError(`Please select/input ${field.replace(/_/g, " ")}`, field);
          isValid = false;
        }
      });

      // Check if image is selected
      if (!selectedFile) {
        handleError("Please select a document", "document");
        isValid = false;
      }

      // If any validation fails, return
      if (!isValid) return;

      // Check format and validate accordingly
      if (inputs.format === "Percentage" && !inputs.percentage) {
        handleError("Please input percentage", "percentage");
        return;
      }
      if (inputs.format === "CGPA" && !inputs.CGPA) {
        handleError("Please input CGPA", "CGPA");
        return;
      }

      setLoading1(true);

      // Form data creation
      const formData = new FormData();
      formData.append("courseType", inputs.courseType);
      formData.append("course", inputs.course);
      formData.append(
        "university_institute_name",
        inputs.university_institute_name
      );
      formData.append("year", inputs.duration);
      formData.append("certificationNumber", inputs.certificationNumber);
      formData.append("marksType", inputs.format);
      formData.append("qualificationIn", inputs.qualificationIn);
      if (inputs.format === "Percentage(%)") {
        formData.append("marks", inputs.percentage);
      } else if (inputs.format === "CGPA") {
        formData.append("marks", inputs.CGPA);
      }
      image.forEach((file) => {
        formData.append("qualificationFile", {
            uri: file.uri,
            type: file.mimeType,
            name: file.name,
        });
      });

      const res = await dispatch(addQualification(formData));
      console.log(res);
      if (res.success) {
        setErrors({});
        // Show success message using Toast.show
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
   
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Show error message using Toast.show
      const msg=error.response.data?.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        // Check if the current screen is focused
        navigation.goBack(); // Go back if the current screen is focused
        return true; // Prevent default behavior (exiting the app)
      }
      return false; // If not focused, allow default behavior (exit the app)
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
        <Header
          title={"Add Qualification"}
          icon={require("../../assets/back.png")}
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) :
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            Course Type<Text style={{ color: "red" }}> *</Text>
          </Text>
          <SelectList
            setSelected={(text) => handleSelectChange(text, "courseType")}
            data={courseType.map((item) => ({
              label: item.courseType,
              value: item.courseType,
            }))}
            defaultOption={inputs.courseType}
            save="value"
            fontFamily="Poppins"
            onFocus={() => handleError(null, "courseType")}
          />
          {errors.courseType && (
            <Text style={styles.errorText}>{errors.courseType}</Text>
          )}
          {inputs.courseType && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>
                Course<Text style={{ color: "red" }}> *</Text>
              </Text>
              <SelectList
                setSelected={(text) => handleSelectChange(text, "course")}
                data={courseOptions}
                save="value"
                fontFamily="Poppins"
              />
              {errors.course && (
                <Text style={styles.errorText}>{errors.course}</Text>
              )}
            </View>
          )}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>
              University / Institutes<Text style={{ color: "red" }}> *</Text>
            </Text>
            <SelectList
              setSelected={(text) =>
                handleSelectChange(text, "university_institute_name")
              }
              data={university.map((item) => ({
                label: item.id,
                value: item.university_institute_name,
              }))}
              save="value"
              fontFamily="Poppins"
              onFocus={() => handleError(null, "university_institute_name")}
            />
            {errors.university_institute_name && (
              <Text style={styles.errorText}>
                {errors.university_institute_name}
              </Text>
            )}
          </View>
          <View style={{ marginTop: 10 }}>
            <Input
              value={inputs.duration}
              editable={false}
              label="Duration"
              placeholder="Duration"
              error={errors.duration}
              // isRequired={true}
            />

            {/* {errors.duration && (
              <Text style={styles.errorText}>{errors.duration}</Text>
            )} */}
          </View>
          <View style={{ marginTop: 10 }}>
            <Input
              onChangeText={(text) =>
                handleOnchange(text, "certificationNumber")
              }
              onFocus={() => handleError(null, "certificationNumber")}
              label="Certification Number"
              placeholder="Certification Number"
              error={errors.certificationNumber}
              isRequired={true}
            />
          </View>

          <Text style={styles.label}>
            Format<Text style={{ color: "red" }}> *</Text>
          </Text>
          <SelectList
            setSelected={(text) => {
              handleSelectChange(text, "format");
              setSelectedFormat(text);
            }}
            data={format}
            save="value"
            fontFamily="Poppins"
            onFocus={() => handleError(null, "format")}
          />
          {errors.format && (
            <Text style={styles.errorText}>{errors.format}</Text>
          )}

          {selectedFormat === "Percentage(%)" && (
            <View style={{ marginTop: 10 }}>
              <Input
                onChangeText={(text) => handleOnchange(text, "percentage")}
                onFocus={() => handleError(null, "percentage")}
                label="Percentage"
                placeholder="Percentage"
                error={errors.percentage}
                isRequired={true}
              />
            </View>
          )}
          {selectedFormat === "CGPA" && (
            <View style={{ marginTop: 10 }}>
              <Input
                onChangeText={(text) => handleOnchange(text, "CGPA")}
                onFocus={() => handleError(null, "CGPA")}
                label="CGPA"
                placeholder="CGPA"
                error={errors.CGPA}
                isRequired={true}
              />
            </View>
          )}

<View style={{marginTop:10}}>
          <Text style={styles.label}>
            Add Qualification For<Text style={{ color: "red" }}> *</Text>
          </Text>
          <SelectList
            setSelected={(text) => handleSelectChange(text, "qualificationIn")}
            data={qualificationItem}
            defaultOption={inputs.qualificationIn}
            save="value"
            fontFamily="Poppins"
            onFocus={() => handleError(null, "qualificationIn")}
          />
          </View>
          {errors.qualificationIn && (
            <Text style={styles.errorText}>{errors.qualificationIn}</Text>
          )}

          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>
              Document Upload<Text style={{ color: "red" }}> *</Text>
            </Text>
            <View style={styles.cameraContainer}>
              {selectedFile ? (
                <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                  {selectedFile.type.includes("image") ? (
                    <Image
                      source={{ uri: selectedFile.uri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <View style={styles.pdfContainer}>
                      <Image
                        source={require("../../assets/pdf.png")}
                        style={styles.pdfIcon}
                      />
                      <Text style={styles.pdfText}>{selectedFile.name}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                  <View style={styles.cameraButton}>
                    <Image
                      style={styles.cameraImage}
                      source={require("../../assets/camera.png")}
                    />
                    <Text style={styles.cameraText}>Add File</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {errors.document && (
            <Text style={styles.errorText}>{errors.document}</Text>
          )}
        </View>
        <Button
          title={
            loading1 ? (
              <ActivityIndicator
                size="small"
                color="#ffffff"
                style={styles.indicator}
              />
            ) : (
              "Save"
            )
          }
          onPress={validate}
        />
      </ScrollView>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 16,
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
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    fontFamily: "Poppins",
    height: 45,
    borderColor: "gray",
  },
  languageList: {
    flexDirection: "row", // Display items horizontally
    flexWrap: "wrap", // Wrap items to next row when needed
  },
  languageItem: {
    margin: 5, // Add some margin between items
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  cameraContainer: {
    width: wp(40),
    height: hp(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    // marginTop: 10,
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
  pdfContainer: {
    // flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pdfIcon: {
    width: 40,
    height: 40,
  },
  pdfText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddQualification;
