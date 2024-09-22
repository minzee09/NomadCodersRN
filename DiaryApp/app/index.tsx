import { NavigationContainer } from "@react-navigation/native";
import Navigator from "@/components/navigator";

export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <Navigator />
    </NavigationContainer>
  );
}
