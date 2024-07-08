import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Linking,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import AdjFontSize from "../backendFile/AdjFontSize";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import dataBack from "../backendFile/dataBack.json";
import { useIsFocused } from "@react-navigation/native";
import { storeData } from "../backendFile/fetchSS";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function DetailScreen({ route }) {
  const { itemID, changeFunc } = route.params;
  const isFocus = useIsFocused();
  const [items, setItems] = useState([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (isFocus) {
      changeFunc("light");
      setItems(dataBack.find((item) => item.id === itemID));
    }
  }, [isFocus]);

  useEffect(() => {
    if (isFocus && !initialRender) {
      changeFunc("light");
    }
    setInitialRender(false);
  }, [isFocus, initialRender, changeFunc]);

  useEffect(() => {
    storeData("recent", itemID);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../images/background.png")}
        style={styles.background}
        blurRadius={100}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: windowWidth * 0.07,
          }}
        >
          <View style={styles.iconBackground}>
            <Ionicons name="apps-outline" size={25} color={"white"} />
          </View>
          <Text style={{ color: "white", fontSize: AdjFontSize(0.05) }}>
            Lesson
          </Text>
          <View style={styles.iconBackground}>
            <Ionicons name="notifications-outline" size={25} color={"white"} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "rgba(189, 254, 0,1)",
            marginTop: 30,
            borderRadius: 20,
            paddingVertical: windowHeight * 0.03,
            paddingHorizontal: windowWidth * 0.09,
          }}
        >
          <View style={{}}>
            <Text style={[styles.textDetail, { fontSize: AdjFontSize(0.035) }]}>
              {items.Subject}
            </Text>
            <Text
              style={[
                styles.textDetail,
                { fontSize: AdjFontSize(0.05), fontWeight: "bold" },
              ]}
            >
              {items.Name}
            </Text>
          </View>
          <View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Ionicons name="time" size={16} color={"rgba(0, 0, 0, 0.4)"} />
              <Text
                style={[
                  styles.textDetail,
                  {
                    fontSize: AdjFontSize(0.032),
                    marginLeft: 5,
                    color: "rgba(0, 0, 0, 0.4)",
                    fontWeight: "bold",
                  },
                ]}
              >
                {items.minutes} Minutes
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons
                name="logo-youtube"
                size={15}
                color={"rgba(0, 0, 0, 0.4)"}
              />
              <Text
                style={[
                  styles.textDetail,
                  {
                    fontSize: AdjFontSize(0.032),
                    marginLeft: 5,
                    color: "rgba(0, 0, 0, 0.4)",
                    fontWeight: "bold",
                  },
                ]}
              >
                {items.numberOfLessons} Lessons
              </Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View>
            <View
              style={{
                paddingHorizontal: windowWidth * 0.07,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                paddingVertical: windowHeight * 0.03,
                marginTop: 30,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../images/dp.png")}
                    style={{ width: 50, height: 50 }}
                  />
                  <View style={{ marginLeft: 12 }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: AdjFontSize(0.045),
                      }}
                    >
                      {items.Mentor}
                    </Text>
                    <Text
                      style={{ color: "white", fontSize: AdjFontSize(0.032) }}
                    >
                      Mentor
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "white", marginRight: 10 }}>
                    {items.ratings}
                  </Text>
                  <Ionicons name="star" size={15} color={"yellow"} />
                </View>
              </View>
              <View style={{ paddingHorizontal: windowWidth * 0.02 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: AdjFontSize(0.03),
                    letterSpacing: 1,
                    marginTop: 15,
                  }}
                >
                  {items.Description}
                </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  paddingHorizontal: windowWidth * 0.07,
                  paddingVertical: windowHeight * 0.03,
                }}
              >
                <Text style={{ fontSize: AdjFontSize(0.05), color: "white" }}>
                  Lessons
                </Text>
              </View>
              <View>
                <View style={styles.lessonItems}>
                  <View style={styles.lessonNo}>
                    <Text
                      style={{ color: "white", fontSize: AdjFontSize(0.04) }}
                    >
                      01
                    </Text>
                  </View>
                  <View style={styles.lessonTitle}>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: AdjFontSize(0.05),
                      }}
                    >
                      Intro
                    </Text>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.4)",
                        fontSize: AdjFontSize(0.03),
                      }}
                    >
                      Introduction to the course
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Linking.openURL(items.main);
                    }}
                    underlayColor={"rgba(0,0,0,0)"}
                  >
                    <View style={styles.lessonPlay}>
                      <Ionicons
                        name="play"
                        size={20}
                        color={"rgba(189, 254, 0,1)"}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <View style={{ paddingVertical: windowHeight * 0.03 }}>
              <View>
                <View style={styles.lessonItems}>
                  <View style={styles.lessonNo}>
                    <Text
                      style={{ color: "white", fontSize: AdjFontSize(0.04) }}
                    >
                      02
                    </Text>
                  </View>
                  <View style={styles.lessonTitle}>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: AdjFontSize(0.045),
                        maxWidth: windowHeight * 0.24,
                      }}
                    >
                      {items.Name}
                    </Text>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.4)",
                        fontSize: AdjFontSize(0.03),
                      }}
                    >
                      Includes detailed course
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Linking.openURL(items.intro);
                    }}
                    underlayColor={"rgba(0,0,0,0)"}
                  >
                    <View style={styles.lessonPlay}>
                      <Ionicons
                        name="play"
                        size={20}
                        color={"rgba(189, 254, 0,1)"}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View style={styles.lessonItems}>
                  <View style={styles.lessonNo}>
                    <Text
                      style={{ color: "white", fontSize: AdjFontSize(0.04) }}
                    >
                      03
                    </Text>
                  </View>
                  <View style={styles.lessonTitle}>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: AdjFontSize(0.05),
                        maxWidth: windowHeight * 0.26,
                      }}
                    >
                      Test
                    </Text>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.4)",
                        fontSize: AdjFontSize(0.03),
                      }}
                    >
                      Take the final test
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Linking.openURL(
                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      ).catch((error) => console.log(error));
                    }}
                    underlayColor={"rgba(0,0,0,0)"}
                  >
                    <View style={styles.lessonPlay}>
                      <Ionicons
                        name="send"
                        size={20}
                        color={"rgba(189, 254, 0,1)"}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 40 }}></View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: windowHeight * 0.1,
  },
  iconBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.02,
    borderRadius: 40,
  },
  textDetail: {
    paddingVertical: windowHeight * 0.003,
  },
  lessonItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * 0.07,
  },
  lessonNo: {
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    borderRadius: (windowWidth * 0.2) / 2,
    borderWidth: 1,
    borderColor: "rgba(189, 254, 0,1)",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonTitle: {
    marginRight: "auto",
    marginLeft: windowWidth * 0.08,
  },
  lessonPlay: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(189, 254, 0,1)",
    padding: windowWidth * 0.04,
  },
});

export default DetailScreen;
