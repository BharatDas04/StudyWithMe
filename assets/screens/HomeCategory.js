import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import AdjFontSize from "../backendFile/AdjFontSize";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import courses from "../backendFile/dataBack.json";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function HomeCategory({ changeFunc }) {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [showSub, setShowSub] = useState([]);
  const subjects = new Set();

  useEffect(() => {
    courses.forEach((course) => {
      subjects.add(course.Subject);
    });
    setShowSub(Array.from(subjects));
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
          Learn Catergory
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
            <TouchableOpacity onPress={() => console.log("Option 1")}>
              <Text>Report</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          flexWrap: "wrap",
          alignItems: "flex-start",
          flexDirection: "row",
          marginTop: "5%",
        }}
      >
        {showSub.slice(0, 6).map((course, index) => (
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              paddingVertical: "3%",
              paddingHorizontal: "5%",
              margin: "1%",
              borderRadius: 10,
            }}
            key={index}
          >
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("SearchResultPage", {
                  course: course,
                  changeFunc: changeFunc,
                });
              }}
              key={index}
              underlayColor={"transparent"}
            >
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: AdjFontSize(0.035),
                }}
              >
                {course}
              </Text>
            </TouchableHighlight>
          </View>
        ))}
      </View>
    </View>
  );
}

export default HomeCategory;
