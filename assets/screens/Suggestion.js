import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import AdjFontSize from "../backendFile/AdjFontSize";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import dataBack from "../backendFile/dataBack.json";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Suggestion() {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [randomItems, setRandomItems] = useState([]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  function getRandomItems(data, numItems) {
    return data.sort(() => Math.random() - 0.5).slice(0, numItems);
  }

  useEffect(() => {
    const selectedItems = getRandomItems(dataBack, 3);
    setRandomItems(selectedItems);
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: windowWidth * 0.07,
        }}
      >
        <Text
          style={{
            fontSize: AdjFontSize(0.045),
            color: "white",
          }}
        >
          Suggestions For You
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
          marginTop: "5%",
          flexDirection: "row",
          gap: 18,
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {randomItems.map((item, index) => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Detail", { itemID: item.id });
              }}
              key={index}
            >
              <View
                style={{
                  marginTop: windowHeight * 0.02,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 20,
                  paddingVertical: windowHeight * 0.03,
                  paddingHorizontal: windowWidth * 0.06,
                  marginHorizontal: windowWidth * 0.03,
                }}
                key={index}
              >
                <View style={{ flex: 0.6 }}>
                  <View>
                    <Text style={{ color: "#bdfe00" }}>{item.Subject}</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginTop: windowHeight * 0.01,
                        fontSize: AdjFontSize(0.035),
                      }}
                      numberOfLines={2}
                    >
                      {item.Name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: windowHeight * 0.01,
                      }}
                    >
                      <Text style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                        Level
                      </Text>
                      <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        &nbsp;{item.Level}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: windowHeight * 0.01,
                    }}
                  >
                    <Ionicons name="star" color="yellow" size={15} />
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        marginLeft: windowHeight * 0.01,
                      }}
                    >
                      {item.ratings}
                    </Text>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        marginLeft: windowHeight * 0.02,
                      }}
                    >
                      ({item.NoOfRatings} Ratings)
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 0.4, marginTop: windowHeight * 0.02 }}>
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
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default Suggestion;
