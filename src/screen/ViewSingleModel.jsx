import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
const ViewSingleModel = () => {
  const route = useRoute();
  const slugId = route.params?.slug;
  return (
    <WebView
      source={{
        uri: `https://luma-by-sameer.netlify.app/?data=${encodeURIComponent(
          slugId
        )}`,
      }}
      style={{ flex: 1 }}
    />
  );
};
export default ViewSingleModel;
