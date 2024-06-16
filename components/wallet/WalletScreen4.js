import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Avatar } from "react-native-elements";

const WalletScreen4 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cont3}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size="large"
            source={require("../../assets/check_circle.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: "green" }]}>
            Transfer Successful
          </Text>
          <Text
            style={[styles.text, { color: "lightgray", fontWeight: "400" }]}
          >
            Your transaction was successful!
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text
            style={{ fontFamily: "Poppins", fontSize: 32, fontWeight: "500" }}
          >
            Rp 200.000
          </Text>
          <Text
            style={{ fontFamily: "Poppins", fontSize: 14, fontWeight: "500" }}
          >
            Send to
          </Text>
          <View style={{ margin: 10, flexDirection: "row" }}>
            <Avatar
              rounded
              source={{
                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              size={60}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: 500,
                }}
              >
                Abdul Mustakim
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  color: "gray",
                }}
              >
                +91 9876543210
              </Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          <Text
            style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: "500" }}
          >
            Transaction Details
          </Text>
          <View style={styles.transactionContainer}>
            <Text style={styles.textHeading}>Payment</Text>
            <Text style={styles.textR}>Rp 200.00</Text>
          </View>
          <View style={styles.transactionContainer}>
            <Text style={styles.textHeading}>Date</Text>
            <Text style={styles.textR}>June 12,2024</Text>
          </View>
          <View style={styles.transactionContainer}>
            <Text style={styles.textHeading}>Time</Text>
            <Text style={styles.textR}>20.32</Text>
          </View>
          <View style={styles.transactionContainer}>
            <Text style={styles.textHeading}>Reference Number</Text>
            <Text style={styles.textR}>QOIU-0012-ADFE-2234</Text>
          </View>
          <View style={styles.transactionContainer}>
            <Text style={styles.textHeading}>Fee</Text>
            <Text style={styles.textR}>Rp 0</Text>
          </View>
          <View style={[styles.transactionContainer, { marginTop: 25 }]}>
            <Text
              style={{
                fontFamily: "Poppins",
                color: "rgba(102, 42, 178, 1)",
                fontSize: 16,
              }}
            >
              Total Payment
            </Text>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 16,
                color: "rgba(102, 42, 178, 1)",
              }}
            >
              Rp 200.000
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.button,{marginTop:20}]}>
        <Text style={[styles.buttonText,{color:'#fff'}]}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,{backgroundColor:'#fff',marginBottom:20}]}>
        <Text style={[styles.buttonText,{color:'rgba(102, 42, 178, 1)'}]}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalletScreen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(102, 42, 178, 1)",
  },
  cont3: {
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 100,
  },
  avatarContainer: {
    position: "absolute",
    top: -30,
    left: "42%",
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10,
  },
  transactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingHorizontal: 20,
    marginVertical: 8,
    height: 50,
    width: "90%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    marginTop: 60,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 16,
    textAlign: "center",
  },
  textHeading: {
    fontFamily: "Poppins",
    color: "gray",
    fontSize: 12,
  },
  textR: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight:'700'
  },
});
