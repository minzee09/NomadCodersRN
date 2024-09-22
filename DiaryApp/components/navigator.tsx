import Home from "@/screens/Home";
import Write from "@/screens/Write";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tabs = createNativeStackNavigator();

const Navigator = () => (
  <Tabs.Navigator screenOptions={{ headerShown: false, presentation: "modal" }}>
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Write" component={Write} />
  </Tabs.Navigator>
);

export default Navigator;
