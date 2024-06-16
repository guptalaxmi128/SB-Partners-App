import React from "react";
import { TextInput, View, StyleSheet,StatusBar,Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../header/Header";
import Accordion from "../accordion/Accordion";

const Help = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" />
      <View style={{ paddingTop: 15 }}>
      <Header
        title={"Help and Support"}
        icon={require("../../assets/back.png")}
      />
      </View>
      <View style={{ marginVertical: 5 ,paddingHorizontal:20}}>
      <View style={{  marginBottom: 30 }}>
            <View style={styles.inputContainer}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../assets/search.png")}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#000" // Placeholder color
                style={styles.input}
              />
              {/* <Image
                style={{ width: 24, height: 24 }}
                source={require("../../assets/filter.png")}
              /> */}
            </View>
          </View>
        <Accordion
          title="Lorem ipsum dolor sit amet"
          answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <Accordion
          title="Lorem ipsum dolor sit amet"
          answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <Accordion
          title="Lorem ipsum dolor sit amet"
          answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <Accordion
          title="Lorem ipsum dolor sit amet"
          answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <Accordion
          title="Lorem ipsum dolor sit amet"
          answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(90),
    height: 48,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins",
    marginLeft: 10,
  },

});

export default Help;
