import { View, Text, Dimensions } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import AdjFontSize from "../backendFile/AdjFontSize";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Ytsuggesion() {
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
            marginBottom: "10%",
          }}
        >
          Featured Video 2024
        </Text>
      </View>

      <YoutubeIframe height={300} play={false} videoId={"vQPgEm9jAJI"} />
    </View>
  );
}

export default Ytsuggesion;
