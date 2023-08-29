import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Tab, TabView } from "@rneui/themed";
import { Icon } from "@rneui/base";
import CameraScreen from "./CameraScreen";
import ViewCapture from "./ViewCapture";
import { useDispatch, useSelector } from "react-redux";
import { selectAPIKEY } from "../app/features/camera/cameraSlice";
import { useGetCreditsQuery } from "../app/features/camera/captureApiSlice";
import axios from "axios";
const HomeScreen = () => {
  const [index, setIndex] = useState(1);
  const APIKEY = useSelector(selectAPIKEY);
  const {
    data: creditsData,
    isLoading,
    isError,
    error,
  } = useGetCreditsQuery(APIKEY);

  const getCreditsData = async () => {
    try {
      console.log(APIKEY);
      console.log(creditsData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          {index === 0 && <CameraScreen />}
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
          <View>
            <Text>hello</Text>
            <Text>{}</Text>
            <Button title="call" onPress={getCreditsData} />
          </View>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "green", width: "100%" }}>
          <ViewCapture />
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item>
          <Text style={styles.BotText}>Video</Text>
        </Tab.Item>
        <Tab.Item>
          <Text style={styles.BotText}>Home</Text>
        </Tab.Item>
        <Tab.Item>
          <Text style={styles.BotText}>Setting</Text>
        </Tab.Item>
      </Tab>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BotText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
