import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Alert,
  Button,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 10 }}> </Text>
      <Text style={{ fontSize: 30 }}> 발표등록 창입니다. </Text>
      <Text style={{ fontSize: 30 }}> </Text>
      <Button
        color="#54afe5"
        title="돌아가기"
        onPress={() =>
          Alert.alert("고운서가", "돌아가시겠습니까?", [
            {
              text: "네",
              onPress: () => console.log("yes!"),
            },
            { text: "아니오", onPress: () => console.log("아니오") },
          ])
        }
      ></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bfdaea",
    alignItems: "center",
    justifyContent: "center",
  },
});
