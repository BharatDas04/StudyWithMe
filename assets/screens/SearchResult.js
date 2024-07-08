import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import dataBack from "../backendFile/dataBack.json";
import AdjFontSize from "../backendFile/AdjFontSize";
import { Ionicons } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function SearchResult() {
  const route = useRoute();
  const navigation = useNavigation();
  const { course, changeFunc } = route.params;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    changeFunc("light");
    const filteredResults = dataBack.filter((item) =>
      item.Subject.toLowerCase().includes(course.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../images/background.png")}
        style={styles.background}
        blurRadius={100}
      >
        <View>
          <Text
            style={{
              fontSize: AdjFontSize(0.06),
              color: "white",
              marginVertical: windowHeight * 0.03,
              marginHorizontal: windowWidth * 0.01,
            }}
          >
            Results
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {searchResults.map((item, index) => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Detail", {
                  itemID: item.id,
                });
              }}
              key={index}
            >
              <View>
                <View>
                  <View
                    style={{
                      paddingHorizontal: windowWidth * 0.06,
                      paddingVertical: windowHeight * 0.02,
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      borderRadius: 20,
                      marginTop: windowHeight * 0.01,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: windowHeight * 0.004,
                      }}
                    >
                      <Text
                        style={{
                          color: "rgba(189, 254, 0,1)",
                          fontSize: AdjFontSize(0.027),
                        }}
                      >
                        {item.Subject}
                      </Text>
                      <Text
                        style={{
                          color: "gold",
                          fontSize: AdjFontSize(0.03),
                        }}
                      >
                        <Ionicons name="star" color={"gold"} size={10} />
                        {item.ratings}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 0.6,
                        borderColor: "rgba(255 ,255, 255, 0.2)",
                        paddingBottom: windowHeight * 0.01,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: AdjFontSize(0.035),
                        }}
                      >
                        {item.Name}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingVertical: windowHeight * 0.01,
                      }}
                    >
                      <Text
                        style={{ color: "white", fontSize: AdjFontSize(0.027) }}
                      >
                        {item.Description}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    paddingVertical: windowHeight * 0.1,
    paddingHorizontal: windowWidth * 0.05,
  },
});

export default SearchResult;
