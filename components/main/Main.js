import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../splash/Splash";
import Login from "../login/Login";
import Otp from "../otp/Otp";
import Terms from "../terms/Terms";
import Help from "../help/Help";
import TermConditions from "../term&conditions/TermConditions";
import PrivacyPolicy from "../privacy&policy/PrivacyPolicy";
import GeneralQuiz from "../generalQuiz/GeneralQuiz";
import Language from "../language/Language";
import Wallet from "../wallet/Wallet";
import WalletScreen1 from "../wallet/WalletScreen1";
import WalletScreen2 from "../wallet/WalletScreen2";
import WalletScreen3 from "../wallet/WalletScreen3";
import WalletScreen4 from "../wallet/WalletScreen4";
import TabNavigator from "../navigation/TabNavigator";
import Notification from "../notification/Notification";
import CreateCourse from "../createCourse/CreateCourse";
import LiveClasses from "../liveClasses/LiveClasses";
import MainProfile from "../profile/MainProfile";
import ProfileOverview from "../profile/ProfileOverview";
import EditProfile from "../profile/EditProfile";
import Qualification from "../qualification/Qualification";
import AddQualification from "../qualification/AddQuaification";
import Experience from "../experience/Experience";
import AddExperience from "../experience/AddExperience";
import QualificationDetails from "../qualification/QualificationDetails";
import EditQualification from "../qualification/EditQualification";
import ExperienceDetails from "../experience/ExperienceDetails";
import EditExperience from "../experience/EditExperience";
import CourseDetails from "../courseDetails/CourseDetails";
import YStudioForm from "../yogaStudio/YStudioForm";
import YogaStudio from "../yogaStudio/YogaStudio";
import Studio from "../studio/Studio";
import OnBoardingScreen from "../onboarding/OnBoardingScreen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import YogaStudioScreen from "../yogaStudio/YogaStudioScreen";
import EditBusinessProfile from "../businessProfile/EditBusinessProfile";
import EditYStudioForm from "../businessProfile/EditYStudioForm";
import EditContactDetails from "../businessProfile/EditContactDetails";
import EditTiming from "../businessProfile/EditTiming";
import BusinessTimings from "../businessTimings/BusinessTimings";
import AddBusinessPhoto from "../addBusinessPhoto/AddBusinessPhoto";
import AddBusinessContact from "../addBusinessContact/AddBusinessContact";
import ParticularStudio from "../particularStudio/ParticularStudio";
import AllBusinessStudio from "../allBusinessStudio/AllBusinessStudio";
import HomeTutor from "../homeTutor/HomeTutor";
import AddTimeSlot from "../homeTutor/AddTimeSlot";
import ShowHomeTutor from "../homeTutor/ShowHomeTutor";
import AllHomeTutor from "../homeTutor/AllHomeTutor";
import FirstHTutorScreen from "../homeTutor/FirstHTutorScreen";
import FirstTherapistScreen from "../therapist/FirstTherapistScreen";
import AddTLocation from "../tutorLocation/AddTLocation";
import AddTutorPhoto from "../homeTutor/AddTutorPhoto";
import UpdateHomeTutor from "../homeTutor/UpdateHomeTutor";
import Therapist from "../therapist/Therapist";
import AllTherapist from "../therapist/AllTherapist";
import ShowTherapist from "../therapist/ShowTherapist";
import TherapistLocation from "../therapist/TherapistLocation";
import TherapistTimeSlot from "../therapist/TherapistTimeSlot";
import TherapistPhoto from "../therapist/TherapistPhoto";
import AddTherapy from "../therapist/AddTherapy";
import FirstYogaStudioScreen from "../yogaStudio/FirstYogaStudioScreen";
import ComingSoonStudio from "../yogaStudio/ComingSoonStudio";
import ComingSoonTherapist from "../therapist/ComingSoonTherapist";
import ComingSoonInfluencer from "../influencer/ComingSoonInfluencer";
// import TestStepSecond from "../yogaStudio/TestStepSecond";

const Stack = createNativeStackNavigator();

export default function Main() {
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstTimeLoad(true);
      } else {
        setIsFirstTimeLoad(false);
      }
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(data === "true");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainStack"
              component={MainStack}
              options={{ headerShown: false }}
              initialParams={{ isLoggedIn, isFirstTimeLoad }} // Pass isLoggedIn, isFirstTimeLoad, and setIsLoggedIn as initial params
            />
          </Stack.Navigator>
          <Toast />
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const MainStack = ({ navigation, route }) => {
  const { isLoggedIn, isFirstTimeLoad } = route.params;

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("authStack");
    }
  }, [isLoggedIn]);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="appStack"
            component={AppStack}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          {isFirstTimeLoad && (
            <Stack.Screen
              name="OnBoarding"
              component={OnBoardingScreen}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="authStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="appStack"
            component={AppStack}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermConditions"
        component={TermConditions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralQuiz"
        component={GeneralQuiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletScreen1"
        component={WalletScreen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletScreen2"
        component={WalletScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletScreen3"
        component={WalletScreen3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletScreen4"
        component={WalletScreen4}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateCourse"
        component={CreateCourse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LiveClasses"
        component={LiveClasses}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainProfile"
        component={MainProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileOverview"
        component={ProfileOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Qualification"
        component={Qualification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddQualification"
        component={AddQualification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QualificationDetails"
        component={QualificationDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditQualification"
        component={EditQualification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Experience"
        component={Experience}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddExperience"
        component={AddExperience}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExperienceDetails"
        component={ExperienceDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditExperience"
        component={EditExperience}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="YStudioForm"
        component={YStudioForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditYStudioForm"
        component={EditYStudioForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditContactDetails"
        component={EditContactDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditTiming"
        component={EditTiming}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="YogaStudio"
        component={YogaStudio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Studio"
        component={Studio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="YogaStudioScreen"
        component={YogaStudioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditBusinessProfile"
        component={EditBusinessProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusinessTiming"
        component={BusinessTimings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBusinessPhoto"
        component={AddBusinessPhoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBusinessContact"
        component={AddBusinessContact}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ParticularStudio"
        component={ParticularStudio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllBusinessStudio"
        component={AllBusinessStudio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTutor"
        component={HomeTutor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTimeSlot"
        component={AddTimeSlot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowHomeTutor"
        component={ShowHomeTutor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllHomeTutor"
        component={AllHomeTutor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Therapist"
        component={Therapist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FirstHTutorScreen"
        component={FirstHTutorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTLocation"
        component={AddTLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTutorPhoto"
        component={AddTutorPhoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateHomeTutor"
        component={UpdateHomeTutor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FirstTherapistScreen"
        component={FirstTherapistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllTherapist"
        component={AllTherapist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowTherapist"
        component={ShowTherapist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TherapistLocation"
        component={TherapistLocation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TherapistTimeSlot"
        component={TherapistTimeSlot}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TherapistPhoto"
        component={TherapistPhoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTherapy"
        component={AddTherapy}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="FirstYogaStudioScreen"
        component={FirstYogaStudioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComingSoonStudio"
        component={ComingSoonStudio}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="ComingSoonTherapist"
        component={ComingSoonTherapist}
        options={{ headerShown: false }}
      />
          <Stack.Screen
        name="ComingSoonInfluencer"
        component={ComingSoonInfluencer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
