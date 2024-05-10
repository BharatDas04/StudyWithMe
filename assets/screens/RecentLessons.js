import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import AdjFontSize from "../backendFile/AdjFontSize";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getData, storeData } from "../backendFile/fetchSS";
import dataBack from "../backendFile/dataBack.json";
import { useIsFocused } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function RecentLessons() {
  const [showMenu, setShowMenu] = useState(false);
  const [recentData, setRecentData] = useState([]);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const isFocus = useIsFocused();
  useEffect(() => {
    async function getRecent() {
      let a = await getData("recent");
      if (a !== null) {
        const temp = dataBack.find((item) => item.id === a);
        setRecentData(temp);
      }
    }

    if (isFocus === true) {
      getRecent();
    }
  }, [isFocus]);

  return (
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
          Recent Lessons
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
              <Text style={{ color: "rgba(255, 255, 255, 0.4)" }}>Level </Text>
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
  );
}

export default RecentLessons;
