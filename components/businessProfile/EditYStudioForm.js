import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  StatusBar
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { SelectList } from "react-native-dropdown-select-list";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import {
  getYogaStudioById,
  updateYogaStudio,
} from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const EditYStudioForm = ({ route,navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;

  const [initialValues, setInitialValues] = useState({
    businessName: "",
    pincode: "",
    blockNumberBuildingName: "",
    streetColonyName: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        navigation.goBack();
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);

  const validationSchema = Yup.object().shape({
    businessName: Yup.string().required("Please enter business name"),
    pincode: Yup.string().required("Please enter pincode"),
    blockNumberBuildingName: Yup.string().required(
      "Please enter block number/building name"
    ),
    streetColonyName: Yup.string().required("Please enter street/colony name"),
    area: Yup.string().required("Please select area"),
    city: Yup.string().required("Please enter city"),
    state: Yup.string().required("Please enter state"),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        if (res.data) {
          setInitialValues({
            businessName: res.data.businessName || "",
            pincode: res.data.pincode || "",
            blockNumberBuildingName: res.data.block_building || "",
            streetColonyName: res.data.street_colony || "",
            area: res.data.area || "",
            landmark: res.data.landmark || "",
            city: res.data.city || "",
            state: res.data.state || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = {
        businessName: values.businessName,
        pincode: values.pincode,
        block_building: values.blockNumberBuildingName,
        street_colony: values.streetColonyName,
        area: values.area,
        city: values.city,
        state: values.state,
        id,
      };
      if (values.landmark) {
        data.landmark = values.landmark;
      }
      console.log(data);

      const res = await dispatch(updateYogaStudio(data));
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      } else if (res.data && res.data.message) {
        console.log(res.data.message);
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error occurred while registering user:", error);
      Toast.show({
        type: "error",
        text1: "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
    <View style={{paddingTop:20}}>
      <Header
        title={"List Yoga Studio"}
        icon={require("../../assets/back.png")}
      />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        >
          <View style={{ flex: 1, marginVertical: 10 }}>
            <Text style={styles.textHeading}>Enter Your Business Details</Text>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View>
                  <Input
                    onChangeText={handleChange("businessName")}
                    onBlur={handleBlur("businessName")}
                    value={values.businessName}
                    label="Business Name"
                    placeholder="Business Name"
                    error={touched.businessName && errors.businessName}
                    isRequired={true}
                  />
                  <Input
                    onChangeText={handleChange("pincode")}
                    onBlur={handleBlur("pincode")}
                    value={values.pincode}
                    label="Pincode"
                    placeholder="Pincode"
                    isRequired={true}
                    error={touched.pincode && errors.pincode}
                  />
                  <Input
                    onChangeText={handleChange("blockNumberBuildingName")}
                    onBlur={handleBlur("blockNumberBuildingName")}
                    value={values.blockNumberBuildingName}
                    label="Block Number / Building Name"
                    placeholder="Block Number / Building Name"
                    error={
                      touched.blockNumberBuildingName &&
                      errors.blockNumberBuildingName
                    }
                    isRequired={true}
                  />
                  <Input
                    onChangeText={handleChange("streetColonyName")}
                    onBlur={handleBlur("streetColonyName")}
                    value={values.streetColonyName}
                    label="Street / Colony Name"
                    placeholder="Street / Colony Name"
                    error={touched.streetColonyName && errors.streetColonyName}
                    isRequired={true}
                  />
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.label}>
                      Area<Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <SelectList
                      setSelected={(val) => setFieldValue("area", val)}
                      data={[
                        { key: "1", value: "Area1" },
                        { key: "2", value: "Area2" },
                      ]}
                      save="value"
                      value={values.area}
                      defaultOption={{ key: values.area, value: values.area }}
                      fontFamily="Poppins"
                      onFocus={() => handleBlur("area")}
                    />
                    {touched.area && errors.area && (
                      <Text style={styles.errorText}>{errors.area}</Text>
                    )}
                  </View>
                  <Input
                    onChangeText={handleChange("landmark")}
                    onBlur={handleBlur("landmark")}
                    value={values.landmark}
                    label="Landmark"
                    placeholder="Landmark"
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 0.48 }}>
                      <Input
                        onChangeText={handleChange("city")}
                        onBlur={handleBlur("city")}
                        value={values.city}
                        label="City"
                        placeholder="City"
                        error={touched.city && errors.city}
                        isRequired={true}
                      />
                    </View>
                    <View style={{ flex: 0.48 }}>
                      <Input
                        onChangeText={handleChange("state")}
                        onBlur={handleBlur("state")}
                        value={values.state}
                        label="State"
                        placeholder="State"
                        isRequired={true}
                        error={touched.state && errors.state}
                      />
                    </View>
                  </View>
                  <Button
                    title={
                      isSubmitting ? (
                        <ActivityIndicator
                          size="small"
                          color="#ffffff"
                          style={styles.indicator}
                        />
                      ) : (
                        "Update"
                      )
                    }
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textHeading: {
    fontFamily: "Poppins",
    fontSize: hp(2.5),
    fontWeight: "500",
    marginVertical: 10,
  },
  label: {
    fontSize: hp(2),
    fontFamily: "Poppins",
  },
  errorText: {
    marginTop: 7,
    color: "red",
    fontSize: hp(1.6),
    fontFamily: "Poppins",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default EditYStudioForm;
