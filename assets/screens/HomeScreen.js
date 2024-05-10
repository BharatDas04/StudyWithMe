import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { getData } from "../backendFile/fetchSS";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AdjFontSize from "../backendFile/AdjFontSize";

// Screens
import HomeCategory from "../screens/HomeCategory";
import RecentLessons from "../screens/RecentLessons";
import Suggestion from "../screens/Suggestion";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function HomeScreen({ changeFunc }) {
  const [userData, setUserData] = useState([]);
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function signUpValid() {
      const check = await getData("credentials");
      if (isFocus === true) {
        if (check === null) {
          navigation.navigate("SignUpPage");
        } else {
          const data = check;
          setUserData(JSON.parse(data));
        }
      }
    }
    signUpValid();
    changeFunc("dark");
  }, [isFocus]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    changeFunc("light");
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
          <View style={[styles.mainContainer, { marginBottom: "20%" }]}>
            <View
              style={{
                flex: 0.3,
                borderRadius: 30,
                backgroundColor: "rgba(189, 254, 0, 0.9)",
                paddingHorizontal: windowWidth * 0.06,
                paddingVertical: windowHeight * 0.03,
                elevation: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 0.7,
                  marginTop: windowHeight * 0.03,
                }}
              >
                <Image
                  source={require("../images/dp.png")}
                  style={{ width: 115, height: 115, opacity: 0.9 }}
                />
                <View>
                  <Text
                    style={{
                      color: "black",
                      fontSize: AdjFontSize(0.07),
                      fontWeight: "bold",
                    }}
                  >
                    Hi, {userData.username}
                  </Text>
                  <Text style={{ color: "black", fontSize: AdjFontSize(0.07) }}>
                    Nice To Meet You
                  </Text>
                </View>
              </View>
              <View style={{ flex: 0.3 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#090808",
                    paddingVertical: windowHeight * 0.02,
                    paddingHorizontal: windowWidth * 0.07,
                    borderRadius: 50,
                    marginTop: "auto",
                  }}
                >
                  <TextInput
                    placeholder="Type your prefer Learn"
                    placeholderTextColor={"grey"}
                    fontSize={AdjFontSize(0.03)}
                  />
                  <TouchableHighlight>
                    <Ionicons name="search" color="grey" size={23} />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.7 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.items}>
                  <HomeCategory />
                </View>
                <View style={styles.items}>
                  <RecentLessons />
                </View>
                <View style={styles.itemsEx}>
                  <Suggestion />
                </View>
                <View style={styles.itemsEx}></View>
              </ScrollView>
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
  },
  mainContainer: {
    flex: 1,
  },
  items: {
    paddingHorizontal: windowWidth * 0.07,
    paddingTop: windowHeight * 0.04,
  },
  itemsEx: {
    paddingTop: windowHeight * 0.04,
  },
});

export default HomeScreen;
