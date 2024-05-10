import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import AdjFontSize from "../backendFile/AdjFontSize";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import dataBack from "../backendFile/dataBack.json";
import { useIsFocused } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function DetailScreen({ route }) {
  const { itemID, changeFunc } = route.params;
  const isFocus = useIsFocused();
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  useEffect(() => {
    if (isFocus) {
      changeFunc("light");
      setItems(dataBack.find((item) => item.id === itemID));
    }
  }, [isFocus]);

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
              <Ionicons name="time" size={16} />
              <Text
                style={[
                  styles.textDetail,
                  { fontSize: AdjFontSize(0.032), marginLeft: 5 },
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
              <Ionicons name="logo-youtube" size={15} />
              <Text
                style={[
                  styles.textDetail,
                  { fontSize: AdjFontSize(0.032), marginLeft: 5 },
                ]}
              >
                {items.numberOfLessons} Lessons
              </Text>
            </View>
          </View>
        </View>
        <View>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
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
                }}
              >
                <Image
                  source={require("../images/dp.png")}
                  style={{ width: 50, height: 50 }}
                />
                <View style={{ marginLeft: 12 }}>
                  <Text
                    style={{ color: "white", fontSize: AdjFontSize(0.045) }}
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
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    paddingVertical: windowHeight * 0.1,
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
});

export default DetailScreen;
