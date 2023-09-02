import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 1500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <LinearGradient
      colors={["#047857", "#0D9488"]}
      style={styles.linearGradient}
    >
      <Image source={require("../assets/welcome.png")} style={styles.welcome} />
      <Image source={require("../assets/logo.png")} style={styles.logo} />
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  welcome: {
    position: "absolute",
    top: 30,
  },
  logo: {
    position: "absolute",
    bottom: 30,
  },
});
