import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectAPIKEY } from "../app/features/camera/cameraSlice";
import { useGetACaptureQuery } from "../app/features/camera/captureApiSlice";
const ViewSingleModel = () => {
  const route = useRoute();
  const { title, username, status, date, glbUrl } = route.params;
  const paramData = { title, username, status, date, glbUrl };
  const HTMLPAGEURL = `https://luma-by-sameer.netlify.app/?data=${JSON.stringify(
    paramData
  )}`;

  console.log(HTMLPAGEURL);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>View Model</Text>
      <WebView
        source={{
          uri: HTMLPAGEURL,
        }}
        style={{ flex: 1 }}
      />
      <Text style={styles.title}>Go Back</Text>
    </View>
  );
};
export default ViewSingleModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    width: "100%",
  },
  title: {
    width: "100%",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#059669",
    color: "#Fff",
  },
  ListContainer: {
    flex: 1,
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
  },
});
