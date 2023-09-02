import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectAPIKEY, setApiKey } from "../app/features/camera/cameraSlice";
import { useGetCreditsQuery } from "../app/features/camera/captureApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const Setting = () => {
  const [apikey, setApikey] = useState("");
  const dispatch = useDispatch(selectAPIKEY);
  const APIKEY = useSelector(selectAPIKEY);
  const { data: creditsData } = useGetCreditsQuery(APIKEY);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("APIKEY", value);
      dispatch(setApiKey(value));
    } catch (err) {
      console.log(err);
    }
  };
  // d3fe53b2-f02d-4bef-9dee-d2dacb1ea69d-6138d85-9e8b-4e37-a277-9af6d99e5afa
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
      <View style={styles.inputContainer}>
        <View style={styles.creditsContainer}>
          <Text style={styles.text}>
            Remaining : {creditsData?.remaining | 0}
          </Text>
          <Text style={styles.text}>Used : {creditsData?.used | 0}</Text>
          <Text style={styles.text}>Total : {creditsData?.used | 0}</Text>
        </View>
        <TextInput
          placeholder="Enter Api Key"
          placeholderTextColor={"black"}
          style={styles.input}
          value={apikey}
          onChangeText={(e) => setApikey(e)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            storeData(apikey);
          }}
        >
          <Text style={styles.buttonTxt}>Set API Key</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "100%",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#059669",
    color: "#Fff",
  },
  creditsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  text: {
    color: "black",
    padding: 5,
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "#059669",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonTxt: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
