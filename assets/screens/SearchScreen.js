import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AdjFontSize from "../backendFile/AdjFontSize";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function SearchScreen({ changeFunc }) {
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocus === true) {
      changeFunc("light");
    }
  }, [isFocus]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../images/background.png")}
        style={styles.background}
        blurRadius={100}
      >
        {isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <View style={{}}>
            <Text style={{ fontSize: AdjFontSize(0.06), color: "white" }}>
              Search
            </Text>
            <View
              style={{
                paddingHorizontal: windowWidth * 0.08,
                paddingVertical: windowHeight * 0.02,
                backgroundColor: "rgba(255, 255, 255 ,0.3)",
                borderRadius: 30,
                marginTop: windowHeight * 0.05,
              }}
            >
              <TextInput
                placeholder="Search.."
                placeholderTextColor={"rgba(255, 255, 255 ,0.8)"}
                fontSize={AdjFontSize(0.04)}
              />
            </View>
            <View></View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    paddingHorizontal: windowWidth * 0.07,
    paddingVertical: windowHeight * 0.1,
  },
});

export default SearchScreen;
