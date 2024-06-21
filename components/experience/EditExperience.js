import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,BackHandler
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import AddCustomData from "../addCustomdata/AddCustomData";
import { getExperience, updateExperience } from "../../action/experience/experience";

const EditExperience = ({ navigation ,route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    workHistory: "",
    role: "",
    department: "",
    organization: "",
  });
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("Select Date");

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading1(true);
        const res = await dispatch(getExperience(id));
        if (res.success) {
          const {
            workHistory,
            role,
            department,
            organization,
            skills,
            joinDate,
          } = res.data;
          setInputs({ workHistory, role, department, organization });
          setSkills(skills);
          setDate(joinDate);
        }
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
    setErrors((prevState) => ({ ...prevState, [input]: "" }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
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

  const validate = async () => {
    try {
      let isValid = true;
      const fields = ["workHistory", "role", "organization", "department"];

      fields.forEach((field) => {
        if (!inputs[field]) {
          handleError(`Please input ${field.replace(/_/g, " ")}`, field);
          isValid = false;
        }
      });

      if (date === "Select Date") {
        handleError("Please select a join date", "date");
        isValid = false;
      }

      if (skills.length === 0) {
        handleError("Please add at least one skill", "skills");
        isValid = false;
      }

      if (!isValid) return false;

      const data = {
        skills,
        joinDate: date,
        role: inputs.role,
        department: inputs.department,
        workHistory: inputs.workHistory,
        organization: inputs.organization,
        id,
      };

      console.log(data)
      setLoading(true);
      const res = await dispatch(updateExperience(data));
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
        navigation.navigate("Experience");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Show error message using Toast.show
      Toast.show({
        type: "error",
        text1: "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
    return isValid;
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

  // console.log(id, "experience");
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <Header
          title={"Edit Experience"}
          icon={require("../../assets/back.png")}
        />
      </View>
      {loading1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) :
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ flex: 1 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "workHistory")}
            onFocus={() => handleError(null, "workHistory")}
            label="Work History"
            placeholder="Work History"
            value={inputs.workHistory}
            error={errors.workHistory}
            isRequired={true}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "role")}
            onFocus={() => handleError(null, "role")}
            label="Role"
            placeholder="Role"
            error={errors.role}
            value={inputs.role}
            isRequired={true}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "organization")}
            onFocus={() => handleError(null, "organization")}
            label="Organization"
            placeholder="Organization"
            error={errors.organization}
            value={inputs.organization}
            isRequired={true}
          />
          <Text style={styles.label}>
            Join Date<Text style={{ color: "red" }}> *</Text>
          </Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              showDatePicker();
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "gray",
                padding: 10,
                fontFamily: "Poppins",
              }}
            >
              {date}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          <View style={{marginTop:10}}>
          <Input
            onChangeText={(text) => handleOnchange(text, "department")}
            onFocus={() => handleError(null, "department")}
            label="Department"
            placeholder="Department"
            error={errors.department}
            value={inputs.department}
            isRequired={true}
          />
          </View>
          <AddCustomData
            languages={skills}
            setLanguages={setSkills}
            label={"Skills"}
            isRequired={true}
          />
          {/* Display the list of languages */}
          <View style={styles.languageList}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.languageItem}>
                <Text>{skill}</Text>
              </View>
            ))}
            {errors.skills && (
              <Text style={styles.errorText}>{errors.skills}</Text>
            )}
          </View>
        </View>
        <Button
          title={
            loading ? (
              <ActivityIndicator
                size="small"
                color="#ffffff"
                style={styles.indicator}
              />
            ) : (
              "Update"
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
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditExperience;
