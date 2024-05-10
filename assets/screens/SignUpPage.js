import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  BackHandler,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AdjFontSize from "../backendFile/AdjFontSize";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { storeData } from "../backendFile/fetchSS";
import { useRoute } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function SignUpPage() {
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  const route = useRoute();
  const { changeFunc } = route.params;
  const navigation = useNavigation();
  const iosPlatform = Platform.OS === "ios";
  const statusBarHeight = StatusBar.currentHeight;
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [spaceInput, setSpaceInput] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [oppa, setOppa] = useState(500);

  const handleChangeTextUsername = (inputText) => {
    const newText = inputText.replace(/\s/g, "");
    setUsername(newText);
    setIsValidUsername(newText.length <= 8);
  };

  const handleChangeTextPassword = (inputText) => {
    setPassword(inputText);
    setIsValidPassword(inputText.length <= 4);
  };

  const handleAge = (option) => {
    if (option === "option1") {
      setOption1(true);
      setOption2(false);
      setOption3(false);
    } else if (option === "option2") {
      setOption1(false);
      setOption2(true);
      setOption3(false);
    } else {
      setOption1(false);
      setOption2(false);
      setOption3(true);
    }
  };

  const handleSubmit = () => {
    if (option1 || option2 || option3) {
      if (
        username.length <= 8 &&
        username.length >= 2 &&
        password.length <= 4 &&
        password.length <= 4
      ) {
        const credentials = JSON.stringify({ username, password });
        storeData("credentials", credentials);
        navigation.navigate("Home");
      } else {
        Alert.alert("Please add Username & Password");
      }
    } else {
      Alert.alert("Please Select Age");
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    const setFalse = () => {
      setSpaceInput(false);
    };
    if (nativeEvent.key === " ") {
      setSpaceInput(true);
      setTimeout(setFalse, 2000);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    changeFunc("light");
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setOppa(0);
    }
  }, [isLoading]);

  return (
    <ImageBackground
      source={require("../images/background.png")}
      style={styles.background}
      blurRadius={100}
    >
      {isLoading ? (
        // Render the loading indicator while isLoading is true
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={[
                styles.mainContainer,
                {
                  paddingTop: iosPlatform ? 0 : statusBarHeight,
                  marginTop: oppa,
                },
              ]}
            >
              <View style={styles.topContainer}>
                <Text style={{ fontSize: AdjFontSize(0.07), color: "white" }}>
                  Sign up
                </Text>
                <TouchableHighlight
                  style={styles.iconContainer}
                  underlayColor={"rgba(255, 255, 255, 0.4)"}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Ionicons name="refresh-outline" color="white" size={25} />
                </TouchableHighlight>
              </View>
              <View style={styles.middleContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={styles.middleContainerText}>Username</Text>
                  <TextInput
                    placeholder="Enter an username here"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                    fontSize={AdjFontSize(0.035)}
                    paddingHorizontal={windowWidth * 0.08}
                    paddingVertical={windowHeight * 0.015}
                    backgroundColor={"rgba(255, 255, 255, 0.1)"}
                    borderRadius={20}
                    style={{
                      color: "white",
                      borderColor:
                        isValidUsername && !spaceInput ? "transparent" : "red",
                      borderWidth: 0.5,
                      marginVertical: windowHeight * 0.02,
                    }}
                    onChangeText={handleChangeTextUsername}
                    value={username}
                    onKeyPress={handleKeyPress}
                  />
                  {!isValidUsername && (
                    <Text
                      style={{ color: "red", fontSize: AdjFontSize(0.025) }}
                    >
                      * Username length should be between 2-8.
                    </Text>
                  )}
                  {spaceInput && (
                    <Text
                      style={{ color: "red", fontSize: AdjFontSize(0.025) }}
                    >
                      * Username cannot contain space.
                    </Text>
                  )}
                  <Text style={styles.middleContainerText}>Password</Text>
                  <TextInput
                    placeholder="Enter a 4 Digit PIN here"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                    fontSize={AdjFontSize(0.035)}
                    paddingHorizontal={windowWidth * 0.08}
                    paddingVertical={windowHeight * 0.015}
                    backgroundColor={"rgba(255, 255, 255, 0.1)"}
                    borderRadius={20}
                    secureTextEntry={true}
                    style={{
                      color: "white",
                      borderColor: isValidPassword ? "transparent" : "red",
                      borderWidth: 0.5,
                      marginVertical: windowHeight * 0.02,
                    }}
                    keyboardType="numeric"
                    onChangeText={handleChangeTextPassword}
                  />
                  {!isValidPassword && (
                    <Text
                      style={{ color: "red", fontSize: AdjFontSize(0.025) }}
                    >
                      * PIN can only be of 4 Digits.
                    </Text>
                  )}
                  <Text style={styles.middleContainerText}>Age</Text>
                  <TouchableHighlight
                    style={[
                      styles.ageContainers,
                      {
                        backgroundColor: option1
                          ? "rgba(255, 255, 255, 0.3)"
                          : "rgba(255, 255, 255, 0.1)",
                      },
                    ]}
                    onPress={() => handleAge("option1")}
                    underlayColor={"rgba(255, 255, 255, 0.4)"}
                  >
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: AdjFontSize(0.035),
                      }}
                    >
                      18-24
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      styles.ageContainers,
                      {
                        backgroundColor: option2
                          ? "rgba(255, 255, 255, 0.3)"
                          : "rgba(255, 255, 255, 0.1)",
                      },
                    ]}
                    onPress={() => handleAge("option2")}
                    underlayColor={"rgba(255, 255, 255, 0.4)"}
                  >
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: AdjFontSize(0.035),
                      }}
                    >
                      24-35
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      styles.ageContainers,
                      {
                        backgroundColor: option3
                          ? "rgba(255, 255, 255, 0.3)"
                          : "rgba(255, 255, 255, 0.1)",
                      },
                    ]}
                    onPress={() => handleAge("option3")}
                    underlayColor={"rgba(255, 255, 255, 0.4)"}
                  >
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: AdjFontSize(0.035),
                      }}
                    >
                      35-60
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.bottomContainer}>
                <TouchableHighlight
                  style={[
                    styles.buttons,
                    { backgroundColor: "rgba(255, 0, 0, 0.4)" },
                  ]}
                  onPress={() => BackHandler.exitApp()}
                  underlayColor={"rgba(255, 0, 0, 0.7)"}
                >
                  <Ionicons name="arrow-back" size={25} color={"white"} />
                </TouchableHighlight>
                <TouchableHighlight
                  style={[
                    styles.buttons,
                    { backgroundColor: "rgba(184, 218, 16, 0.4)" },
                  ]}
                  onPress={handleSubmit}
                  underlayColor={"rgba(184, 218, 16, 0.7)"}
                >
                  <Ionicons name="arrow-forward" size={25} color={"white"} />
                </TouchableHighlight>
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: windowWidth * 0.1,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.2,
    width: "100%",
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: windowWidth * 0.045,
    borderRadius: 50,
  },
  middleContainer: {
    flex: 0.6,
    width: "100%",
  },
  middleContainerText: {
    color: "white",
    fontSize: AdjFontSize(0.04),
  },
  ageContainers: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: windowWidth * 0.08,
    paddingVertical: windowHeight * 0.015,
    borderRadius: 20,
    marginVertical: windowHeight * 0.02,
  },
  bottomContainer: {
    flex: 0.2,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: windowWidth * 0.3,
    height: windowHeight * 0.07,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
});

export default SignUpPage;
