import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { getData, clearData } from "../backendFile/fetchSS";
import AdjFontSize from "../backendFile/AdjFontSize";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function ProfileScreen({ changeFunc }) {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [userData, setUserData] = useState(null);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [changePass, setChangePass] = useState(false);

  useEffect(() => {
    if (isFocus === true) {
      changeFunc("light");
    }
    async function userDataGet() {
      setUserData(await getData("credentials"));
    }
    userDataGet();
  }, [isFocus]);

  useEffect(() => {
    if (userData !== null) {
      const parsedData = JSON.parse(userData);
      setusername(parsedData.username);
      setpassword(parsedData.password);
    }
  }, [userData]);
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    setChangePass(true);
    inputRef.current.focus();
  };
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
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 0.2,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: windowWidth * 0.03,
                paddingRight: windowWidth * 0.05,
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  flex: 0.4,
                }}
              >
                <Image
                  source={require("../images/dp.png")}
                  style={{ width: 115, height: 115, opacity: 0.9 }}
                />
              </View>
              <View style={{ flex: 0.6 }}>
                <Text style={{ color: "white", fontSize: AdjFontSize(0.05) }}>
                  {username}
                </Text>
                <TextInput
                  value={password}
                  placeholder="Enter A New Password"
                  secureTextEntry={true}
                  fontSize={AdjFontSize(0.04)}
                  color={"white"}
                  onChangeText={(text) => setpassword(text)}
                  keyboardType="numeric"
                  editable={changePass}
                  ref={inputRef}
                ></TextInput>
                <TouchableWithoutFeedback
                  style={{
                    marginLeft: "auto",
                  }}
                  onPress={handleButtonClick}
                >
                  <Text style={{ color: "white", fontSize: AdjFontSize(0.03) }}>
                    Edit
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={{ flex: 0.8 }}>
              <View style={styles.item}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.push("Error404");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.itemText}>Favourites</Text>
                    <Ionicons
                      name="archive-outline"
                      size={AdjFontSize(0.04)}
                      color={"white"}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.item}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.push("Error404");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.itemText}>Notifications</Text>
                    <Ionicons
                      name="notifications-outline"
                      size={AdjFontSize(0.04)}
                      color={"white"}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.item}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.push("Error404");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.itemText}>Recents</Text>
                    <Ionicons
                      name="refresh"
                      size={AdjFontSize(0.04)}
                      color={"white"}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.item}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    clearData("credentials");
                    clearData("recent");
                    navigation.navigate("Home");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={[styles.itemText, { color: "red" }]}>
                      Delete Account
                    </Text>
                    <Ionicons
                      name="trash-outline"
                      size={AdjFontSize(0.04)}
                      color={"red"}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
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
  item: {
    marginTop: windowHeight * 0.03,
    backgroundColor: "rgba(255, 255, 255 ,0.2)",
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.06,
    borderRadius: 20,
  },
  itemText: {
    color: "white",
    fontSize: AdjFontSize(0.04),
  },
});

export default ProfileScreen;
