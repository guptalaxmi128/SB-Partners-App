import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

const WalletScreen1 = ({ navigation }) => {
  const [UPIId, setUPIId] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color="#FFF" size={25} />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Poppins", fontSize: 20, color: "#fff" }}>
          Transfer to Bank
        </Text>
        <Image
          source={require("../../assets/wallet/help.png")}
          style={{ height: 25, width: 25 }}
        />
      </View>
      <View style={styles.textp}>
        <View>
          <Text style={{ fontFamily: "Poppins", fontSize: 14, color: "#fff" }}>
            Your Balance
          </Text>
          <Text style={{ fontFamily: "Poppins", fontSize: 24, color: "#fff" }}>
            Rp 24.321.900
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            width: "30%",
            height: 40,
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../assets/wallet/icon-wallet.png")}
          />
          <Text style={{ fontFamily: "Poppins", fontSize: 14, marginLeft: 5 }}>
            Top Up
          </Text>
        </View>
      </View>
      <View style={styles.cont3}>
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter UPI Id or number"
            value={UPIId}
            onChangeText={setUPIId}
          />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text
            style={{ fontFamily: "Poppins", fontSize: 20, fontWeight: "500" }}
          >
            Set Amount
          </Text>
          <Text
            style={{ fontFamily: "Poppins", fontSize: 32, fontWeight: "500" }}
          >
            Rp 0
          </Text>
        </View>
        <View>
          <Text
            style={{ fontFamily: "Poppins", fontSize: 16, fontWeight: "500",marginBottom:5 }}
          >
            Notes (optional)
          </Text>

          <TextInput
            style={[styles.textInputm, { textAlignVertical: 'top' }]}
            multiline
            numberOfLines={4} // Adjust the number of lines as needed
            value={notes}
            onChangeText={setNotes}
            placeholder="Write your notes here..."
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("WalletScreen1")}>  */}
          <View style={styles.button}>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 18,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Proceed to Transfer
            </Text>
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default WalletScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(102, 42, 178, 1)",
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    height: 50,
    borderColor: "#dcdcdc",
    fontSize: 16,
    padding: 12,
    marginTop: 20,
    fontFamily: "Poppins",
  },
  textInputm: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    minHeight: 100,
    fontFamily:'Poppins' // Adjust the minimum height as needed
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  textp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  cont3: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  button: {
    paddingHorizontal: 20,
    marginVertical: 100,
    backgroundColor: "rgba(102, 42, 178, 1)",
    height: 50,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
