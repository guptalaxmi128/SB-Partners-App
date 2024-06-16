import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomButtonTab from "./CustomButtonTab";
import CustomService from "./CustomService";

const Services = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const options = [
    { id: 1, label: "Fitness Options" },
    { id: 2, label: "Wellness Program" },
    { id: 3, label: "Services" },
  ];

  const handleSelectSwitch = (id) => {
    setSelectedTab(id);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View>
          <View style={{ flex: 1, marginVertical: 10 }}>
            <CustomButtonTab
              selectionMode={selectedTab}
              options={options}
              onSelectSwitch={handleSelectSwitch}
            />
            <View style={styles.contentContainer}>
              {selectedTab === 1 && (
                <CustomService
                  heading="Fitness Option"
                  options={[
                    "Hatha Yoga",
                    "Yoga Power",
                    "Vinyasa Yoga",
                    "Ashtanga Yoga",
                  ]}
                />
              )}
              {selectedTab === 2 && (
                <CustomService
                  heading="Wellness Programs"
                  options={["Meditation", "Mindfulness", "Breathing Exercises"]}
                />
              )}
              {selectedTab === 3 && (
                <CustomService
                  heading="Services"
                  options={["Meditation", "Mindfulness", "Breathing Exercises"]}
                />
              )}
            </View>
          </View>
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
  textHeading: {
    fontFamily: "Poppins",
    fontSize: hp(2),
    fontWeight: "500",
    marginVertical: 10,
  },
});

export default Services;
