import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import NavigationPage from "./assets/screens/NavPage";
import { useState, useEffect } from "react";

export default function App() {
  const [theme, setTheme] = useState("dark");

  const changeFunc = (styleOfSB) => {
    if (styleOfSB === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={theme} />
      <NavigationPage changeFunc={changeFunc} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
