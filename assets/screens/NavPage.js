import { View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

// Screens
import HomeScreen from "./HomeScreen";
import SignUpPage from "./SignUpPage";
import SearchScreen from "./SearchScreen";
import ProfileScreen from "./ProfileScreen";
import UnderDev from "./UnderDev";
import DetailScreen from "./DetailScreen";
import SearchResultPage from "./SearchResult";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const TabNavigator = () => {
  const route = useRoute();
  const { changeFunc } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#bdfe00",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          paddingVertical: windowHeight * 0.01,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          position: "absolute",
          height: windowHeight * 0.1,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { paddingBottom: windowHeight * 0.02 },
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen changeFunc={changeFunc} />}
      </Tab.Screen>
      <Tab.Screen name="Search">
        {() => <SearchScreen changeFunc={changeFunc} />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {() => <ProfileScreen changeFunc={changeFunc} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

function NavigationPage({ changeFunc }) {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LandingPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="LandingPage"
            component={TabNavigator}
            initialParams={{ changeFunc }}
          />
          <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            initialParams={{ changeFunc }}
          />
          <Stack.Screen
            name="Error404"
            component={UnderDev}
            initialParams={{ changeFunc }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            initialParams={{ changeFunc }}
          />
          <Stack.Screen
            name="SearchResultPage"
            component={SearchResultPage}
            initialParams={{ changeFunc }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default NavigationPage;
