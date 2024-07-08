import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import dataBack from "../backendFile/dataBack.json";
import { useState, useEffect } from "react";
import AdjFontSize from "../backendFile/AdjFontSize";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Featured() {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [recentData, setRecentData] = useState([]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isFocus = useIsFocused();

  useEffect(() => {
    async function getRandomItems() {
      const temp = dataBack.find((item) => item.id === "2");
      setRecentData(temp);
    }

    if (isFocus === true) {
      getRandomItems();
    }
  }, [isFocus]);

  useEffect(() => {
    console.log(recentData);
  }, [recentData]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Detail", { itemID: recentData.id });
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: AdjFontSize(0.045),
              color: "white",
            }}
          >
            Featured Course
          </Text>
          <Ionicons
            name="ellipsis-horizontal"
            color={"white"}
            size={25}
            onPress={toggleMenu}
          />
          {showMenu && (
            <View
              style={{
                position: "absolute",
                top: windowHeight * 0.02,
                right: windowWidth * 0.05,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  storeData("recent", "1");
                }}
              >
                <Text>Report</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: "5%",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 20,
            paddingVertical: windowHeight * 0.03,
            paddingHorizontal: windowWidth * 0.06,
          }}
        >
          <View style={{ flex: 0.6 }}>
            <View>
              <Text style={{ color: "#bdfe00" }}>{recentData.Subject}</Text>
            </View>
            <View>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginTop: "4%",
                  fontSize: AdjFontSize(0.035),
                }}
              >
                {recentData.Name}
              </Text>
              <View style={{ flexDirection: "row", marginTop: "2%" }}>
                <Text style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                  Level{" "}
                </Text>
                <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {recentData.Level}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: "4%",
              }}
            >
              <Ionicons name="star" color="yellow" size={15} />
              <Text
                style={{ color: "rgba(255, 255, 255, 0.7)", marginLeft: "1%" }}
              >
                {recentData.ratings}
              </Text>
              <Text
                style={{ color: "rgba(255, 255, 255, 0.7)", marginLeft: "1%" }}
              >
                ({recentData.NoOfRatings} Ratings)
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.4 }}>
            <Image
              source={require("../images/recent.jpg")}
              style={{
                borderRadius: 20,
                width: "100%",
                height: 100,
                resizeMode: "cover",
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Featured;
