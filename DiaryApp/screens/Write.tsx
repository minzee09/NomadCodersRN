import { colors } from "@/constants/Colors";
import { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";

const Write = () => {
  const [selectedEmotion, setEmotion] = useState(null);
  const [feelings, setFeelings] = useState("");
  const onChangeText = (text) => setFeelings(text);
  const onEmotionPress = (face) => setEmotion(face);
  const onSubmit = () => {
    if (feelings === "" || selectedEmotion == null) {
      return Alert.alert("Please complete form.");
    }
  };
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotion)}
            key={index}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyLabel="Save"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="Write your feelings..."
      ></TextInput>
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  );
};

const View = styled.View`
  flex: 1;
  padding: 0 30px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  margin: 50px 0;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  color: ${colors.textColor};
`;

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Emotion = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  elevation: 3;
  overflow: hidden;
  border: ${(props) => (props.selected ? "2px" : "0px")};
  border-color: rgba(0, 0, 0, 0.5);
`;

const EmotionText = styled.Text`
  font-size: 20px;
`;

const emotions = ["😆", "😣", "😡", "🥱", "😎", "😘", "😭"];

const TextInput = styled.TextInput`
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 18px;
  background-color: white;
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
  background-color: ${colors.btnColor};
`;

const BtnText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

export default Write;
