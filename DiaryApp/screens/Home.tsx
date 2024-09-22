import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Home = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Title>My Journal</Title>
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </View>
  );
};

const View = styled.View`
  flex: 1;
  padding: 0 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
`;
const BtnText = styled.Text`
  color: white;
`;

export default Home;
