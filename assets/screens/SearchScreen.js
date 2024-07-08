import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import dataBack from "../backendFile/dataBack.json";
import AdjFontSize from "../backendFile/AdjFontSize";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function SearchScreen({ changeFunc }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (isFocus === true) {
      changeFunc("light");
    }
  }, [isFocus]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const searchComponent = (query) => {
    const filteredResults = dataBack.filter(
      (item) =>
        item.Name.toLowerCase().includes(query.toLowerCase()) ||
        item.Subject.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleInputChange = (query) => {
    setSearchQuery(query);
    searchComponent(query);
  };

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
          <View style={{ flex: 1 }}>
            <View>
              <Text style={{ fontSize: AdjFontSize(0.06), color: "white" }}>
                Search
              </Text>
              <View
                style={{
                  paddingHorizontal: windowWidth * 0.08,
                  paddingVertical: windowHeight * 0.02,
                  backgroundColor: "rgba(255, 255, 255 ,0.3)",
                  borderRadius: 30,
                  marginTop: windowHeight * 0.05,
                  height: windowHeight * 0.07,
                }}
              >
                <TextInput
                  placeholder="Search.."
                  placeholderTextColor={"rgba(255, 255, 255 ,0.8)"}
                  fontSize={AdjFontSize(0.04)}
                  onChangeText={handleInputChange}
                  color={"white"}
                />
              </View>
            </View>
            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {searchResults.slice(0, 6).map((item) => (
                  <TouchableWithoutFeedback
                    key={item.id}
                    onPress={() => {
                      navigation.navigate("Detail", {
                        itemID: item.id,
                      });
                    }}
                  >
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
                        <View>
                          <Text
                            style={{
                              color: "white",
                              fontSize: AdjFontSize(0.035),
                            }}
                          >
                            {item.Name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
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
    paddingHorizontal: windowWidth * 0.07,
    paddingVertical: windowHeight * 0.1,
  },
});

export default SearchScreen;
