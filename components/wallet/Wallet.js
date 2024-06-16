import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import Header from "../header/Header";
import { Avatar } from "react-native-elements";
const Wallet = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
    
      <Header title={"Wallet"} icon={require("../../assets/back.png")} />
     
      <View
        style={{
          backgroundColor: "rgba(102, 42, 178, 1)",
          width: "100%",
          height: 250,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ margin: 20, flexDirection: "row" }}>
            <Avatar rounded source={require("../../assets/sb.jpg")} size={50} />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  color: "white",
                }}
              >
                Hello,
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  color: "white",
                }}
              >
                Abdullah!
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              width: "33%",
              height: 40,
              margin: 20,
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/award_star.png")}
            />
            <Text
              style={{ fontFamily: "Poppins", fontSize: 14, marginLeft: 5 }}
            >
              1,932 Points
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontFamily: "Poppins", fontSize: 14 }}>
            {" "}
            Your Balance
          </Text>
          <Text
            style={{
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            Rp 24.321.900{" "}
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            height: 100,
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 40,
            elevation: 5,
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "45%", alignItems: "center" }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                }}
                source={require("../../assets/wallet/icon-withdraw.png")}
              />
              <Text style={{ fontFamily: "Poppins", fontSize: 14 }}>
                Withdraw
              </Text>
            </View>
            <View style={{ width: "45%", alignItems: "center" }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                }}
                source={require("../../assets/wallet/icon-more.png")}
              />
              <Text style={{ fontFamily: "Poppins", fontSize: 14 }}>More</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={styles.cont3}> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginHorizontal: 20,
          marginTop: 60,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 16,
            fontWeight: 600,
            marginLeft: 10,
          }}
        >
          Latest Transactions
        </Text>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 16,
            fontWeight: 600,
            marginRight: 10,
            color: "#8e8e8e",
          }}
        >
          View all
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 25,
              height: 25,
              marginVertical: 10,
            }}
            source={require("../../assets/wallet/Group.png")}
          />
          <View style={{ marginLeft: 10, width: 100 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: 500 }}
            >
              Transfer
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#8e8e8e",
              }}
            >
              Today 12:32
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 14,
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "red",
          }}
        >
          -Rp 35.23
        </Text>
      </View>
      <View style={styles.hr1} />
      {/* second */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <View style={{  flexDirection: "row" }}>
          <Image
            style={{
              width: 25,
              height: 25,
              marginVertical: 10,
            }}
            source={require("../../assets/wallet/icon-wallet.png")}
          />
          <View style={{ marginLeft: 10, width: 100 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: 500 }}
            >
              Top up
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#8e8e8e",
              }}
            >
              yesterday 02:12
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 15, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins",
              fontWeight: 500,
              color: "green",
            }}
          >
            +Rp 430.00
          </Text>
        </View>
      </View>
      <View style={styles.hr1} />
      {/* third */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 25,
              height: 25,
              marginVertical: 10,
            }}
            source={require("../../assets/wallet/healthcare.png")}
          />
          <View style={{ marginLeft: 10, width: 100 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: 500 }}
            >
              Insurance
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#8e8e8e",
              }}
            >
              Dec 24 12:32
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 15, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins",
              fontWeight: 500,
              color: "red",
            }}
          >
            -Rp 13.00
          </Text>
        </View>
      </View>
      <View style={styles.hr1} />
      </View>
    // </View>
  );
};

export default Wallet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  hr: {
    borderWidth: 1,
    borderColor: "#6F45E9",
    height: 35,
    position: "relative",
    left: "50%",
    marginLeft: -50,
    top: 5,
  },
  hr1: {
    position: "relative",
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    opacity: 0.1,

    marginTop: 5,
  },
  cont3: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
  },
});
