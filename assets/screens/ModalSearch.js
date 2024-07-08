import Modal from "react-native-modal";
import AdjFontSize from "../backendFile/AdjFontSize";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";
import dataBack from "../backendFile/dataBack.json";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useBackHandler } from "@react-native-community/hooks";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function ModalSearch({ isModalVisible, toggleModal }) {
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const searchComponent = (query) => {
    const filteredResults = dataBack.filter(
      (item) =>
        item.Name.toLowerCase().includes(query.toLowerCase()) ||
        item.Subject.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleInputChange = (query) => {
    searchComponent(query);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      onBackdropPress={toggleModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View>
          <Text
            style={{
              fontSize: AdjFontSize(0.055),
              fontWeight: "bold",
              marginHorizontal: windowWidth * 0.02,
              marginTop: windowHeight * 0.1,
            }}
          >
            Search Here
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#090808",
            paddingVertical: windowHeight * 0.02,
            paddingHorizontal: windowWidth * 0.07,
            borderRadius: 50,
            marginTop: windowHeight * 0.03,
          }}
        >
          <TextInput
            placeholder="Type your prefer Learn"
            placeholderTextColor={"grey"}
            fontSize={AdjFontSize(0.03)}
            onChangeText={handleInputChange}
            color={"white"}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {searchResults.slice(0, 6).map((item) => (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() => {
                toggleModal();
                navigation.push("Detail", {
                  itemID: item.id,
                });
              }}
            >
              <View>
                <View
                  style={{
                    paddingHorizontal: windowWidth * 0.06,
                    paddingVertical: windowHeight * 0.02,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
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
        <TouchableOpacity onPress={toggleModal} style={styles.button}>
          <Text style={styles.buttonText}>Hide Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-start",
  },
  modalContent: {
    height: windowHeight,
    backgroundColor: "rgba(189, 254, 0, 0.9)",
    paddingHorizontal: windowWidth * 0.07,
    paddingBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
    borderRadius: 20,
    paddingVertical: windowHeight * 0.02,
    marginTop: "auto",
  },
  buttonText: {
    color: "white",
  },
});

export default ModalSearch;
