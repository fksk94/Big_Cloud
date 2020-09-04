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
      <Image source={require("./../assets/edu2.png")} />
      <Text style={{ fontSize: 10 }}> </Text>
      <Text style={{ fontSize: 30 }}> 고운서가 </Text>
      <Text style={{ fontSize: 30 }}> </Text>
      <Button
        color="#54afe5"
        title="발표등록"
        onPress={() =>
          Alert.alert("고운서가", "발표등록하시겠습니까?", [
            {
              text: "네",
              onPress: () => this.props.navigation.navigate("register"),
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
