import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { Tab, TabView } from "@rneui/themed";
import { Icon } from "@rneui/base";
import CameraScreen from "./CameraScreen";
import ViewCapture from "./ViewCapture";

const HomeScreen = () => {
  const [index, setIndex] = useState(1);
  return (
    <View style={styles.container}>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          {index === 0 && <CameraScreen />}
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
          <Text h1>Home</Text>
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
