import { View, Text, ImageBackground, StyleSheet } from "react-native";

function UnderDev() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../images/background.png")}
        style={styles.background}
        blurRadius={100}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 20 }}>
            Under Developement!!
          </Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            Contact 2002bharatdas@gmail.com
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UnderDev;
