import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Tab, TabView, Icon } from "@rneui/themed";
import CameraScreen from "./CameraScreen";

const HomeScreen = () => {
  const [index, setIndex] = useState(1);
  return (
    <View style={styles.container}>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: "red", width: "100%" }}>
          <CameraScreen />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "green", width: "100%" }}>
          <Text h1>Cart</Text>
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
        <Tab.Item
          title="Recent"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "timer", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="favorite"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "heart", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="cart"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "cart", type: "ionicon", color: "white" }}
        />
      </Tab>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
