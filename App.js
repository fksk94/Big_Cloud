import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  Button,
  TextInput,
  SectionList,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { WebView } from "react-native-webview";

var num = 0;
var info1, info2, info3;

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

var DATA = [
  {
    title: "example",
    data: ["example", "example", "ex"],
  },
];

var firebaseConfig = {
  apiKey: "AIzaSyAZqdmP-IuB-QHbYt0jMHCcp2diDN9Ip-Q",
  authDomain: "bigclouddb.firebaseapp.com",
  databaseURL: "https://bigclouddb.firebaseio.com",
  projectId: "bigclouddb",
  storageBucket: "bigclouddb.appspot.com",
  messagingSenderId: "157247939105",
  appId: "1:157247939105:web:4ce9270c598882805d7960",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
/*
function removeData(rNum) {
  return firebase
    .database()
    .ref("prList/" + rNum + "/")
    .remove();
}
*/

function getDataInit() {
  firebase
    .database()
    .ref("keyNum/realKey")
    .on("value", (snapshot) => {
      var fakeKey = snapshot.val();
      num = fakeKey;
    });
}

function getData(i) {
  firebase
    .database()
    .ref("prList/" + i + "/책제목")
    .on("value", (snapshot) => {
      info1 = snapshot.val();
    }),
    firebase
      .database()
      .ref("prList/" + i + "/발표자")
      .on("value", (snapshot) => {
        info2 = snapshot.val();
      }),
    firebase
      .database()
      .ref("prList/" + i + "/발표날짜")
      .on("value", (snapshot) => {
        info3 = snapshot.val();
      });
}

/*
function setData() {
  firebase.database().ref("0/").set({
    title: { title },
    presenter: "fucku",
  });
}
*/

function Result({ navigation }) {
  getDataInit();
  //getData();
  //setData();

  for (var i = 0; i < num; i++) {
    getData(i);
    DATA[i] = {
      title: "번호 : " + i,
      data: [info1, info2, info3],
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 20 }}>발표현황</Text>
        <Text style={{ fontSize: 15 }}>
          {" "}
          　　　　　　　　　　　　　　　　　　　　　　　　　　　
        </Text>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <Text style={{ fontSize: 15 }}> </Text>
        <Button
          color="#54afe5"
          title="돌아가기"
          onPress={() => navigation.navigate("Home")}
        ></Button>
      </ScrollView>
    </SafeAreaView>
  );

  /*
    <WebView
      source={{ uri: "https://bigclouddb.firebaseio.com/prList.json" }}
      style={{ marginTop: 20 }}
    />
    */
  /*<SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 10 }}> </Text>
      <Text style={{ fontSize: 30 }}> 발표현황 만드는 중 </Text>
      <Text style={{ fontSize: 30 }}> </Text>

      <Button
        color="#54afe5"
        title="돌아가기"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </SafeAreaView>*/
}

function RemoveScreen({ navigation }) {
  getDataInit();
  const [Number, setNumber] = useState("0");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 3 }}> </Text>
      <Text style={{ fontSize: 25 }}> 발표삭제 </Text>
      <Text style={{ fontSize: 20 }}> </Text>
      <Text style={{ fontSize: 12 }}> 발표현황을 보시고 번호를 </Text>
      <Text style={{ fontSize: 12 }}> 찾아 삭제하시면 됩니다. </Text>
      <Text style={{ fontSize: 20 }}> </Text>
      <Text style={{ fontSize: 13 }}> 고유번호 입력 </Text>
      <Text style={{ fontSize: 5 }}> </Text>
      <TextInput
        style={styles.input}
        placeholder="     ex) 1     "
        onChangeText={(val) => setNumber(val)}
      />
      <Text style={{ fontSize: 17 }}> </Text>
      <Text style={{ fontSize: 10 }}> 고유번호 : {Number} </Text>
      <Text style={{ fontSize: 17 }}> </Text>
      <Button
        color="#54afe5"
        title="삭제하기"
        onPress={() =>
          Alert.alert("고운서가", "삭제하시겠습니까?", [
            {
              text: "네",
              onPress: () => {
                firebase
                  .database()
                  .ref("prList/" + Number + "/")
                  .remove(),
                  Alert.alert("고운서가", "삭제완료", [
                    {
                      text: "돌아가기",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
              },
            },
            { text: "아니오", onPress: () => console.log("아니오") },
          ])
        }
      ></Button>
      <Text style={{ fontSize: 15 }}> </Text>

      <Button
        color="#54afe5"
        title="돌아가기"
        onPress={() =>
          Alert.alert("고운서가", "돌아가시겠습니까?", [
            {
              text: "네",
              onPress: () => navigation.navigate("Home"),
            },
            { text: "아니오", onPress: () => console.log("아니오") },
          ])
        }
      ></Button>
    </SafeAreaView>
  );
}

function DetailsScreen({ navigation }) {
  getDataInit();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 3 }}> </Text>
      <Text style={{ fontSize: 25 }}> 발표등록 </Text>
      <Text style={{ fontSize: 10 }}> </Text>
      <Text style={{ fontSize: 13 }}> 책 제목 </Text>
      <Text style={{ fontSize: 5 }}> </Text>
      <TextInput
        style={styles.input}
        placeholder="  책제목을 입력하세요. ex) 그릿  "
        onChangeText={(val) => setTitle(val)}
      />
      <Text style={{ fontSize: 8 }}> </Text>
      <Text style={{ fontSize: 13 }}> 발표자 </Text>
      <Text style={{ fontSize: 5 }}> </Text>
      <TextInput
        style={styles.input}
        placeholder="  이름을 입력하세요. ex) 구태완  "
        onChangeText={(val) => setName(val)}
      />
      <Text style={{ fontSize: 8 }}> </Text>
      <Text style={{ fontSize: 13 }}> 발표날짜 </Text>
      <Text style={{ fontSize: 5 }}> </Text>
      <TextInput
        style={styles.input}
        placeholder="  날짜를 입력하세요. ex) 08.17  "
        onChangeText={(val) => setDate(val)}
      />
      <Text style={{ fontSize: 17 }}> </Text>
      <Text style={{ fontSize: 10 }}>책 제목 : {title} </Text>
      <Text style={{ fontSize: 10 }}>발표자 : {name} </Text>
      <Text style={{ fontSize: 10 }}>발표날짜 : {date} </Text>
      <Text style={{ fontSize: 17 }}> </Text>
      <Button
        color="#54afe5"
        title="등록하기"
        onPress={() =>
          Alert.alert("고운서가", "등록하시겠습니까?", [
            {
              text: "네",
              onPress: () => {
                firebase
                  .database()
                  .ref("keyNum/realKey")
                  .on("value", (snapshot) => {
                    var key = snapshot.val();
                    num = key;
                  }),
                  firebase
                    .database()
                    .ref("prList/" + num + "/")
                    .set({
                      책제목: title,
                      발표자: name,
                      발표날짜: date,
                    }),
                  firebase
                    .database()
                    .ref("keyNum/")
                    .set({
                      realKey: num + 1,
                    }),
                  Alert.alert("고운서가", "등록완료", [
                    {
                      text: "돌아가기",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
              },
            },
            { text: "아니오", onPress: () => console.log("아니오") },
          ])
        }
      ></Button>
      <Text style={{ fontSize: 15 }}> </Text>
      <Button
        color="#54afe5"
        title="돌아가기"
        onPress={() =>
          Alert.alert("고운서가", "돌아가시겠습니까?", [
            {
              text: "네",
              onPress: () => navigation.navigate("Home"),
            },
            { text: "아니오", onPress: () => console.log("아니오") },
          ])
        }
      ></Button>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }) {
  getDataInit();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/edu2.png")} />
      <Text style={{ fontSize: 30 }}> 고운서가 </Text>
      <Text style={{ fontSize: 30 }}> </Text>
      <Button
        color="#54afe5"
        title="등록현황"
        onPress={() => navigation.navigate("List")}
      ></Button>
      <Text style={{ fontSize: 15 }}> </Text>

      <Button
        color="#54afe5"
        title="발표등록"
        onPress={() =>
          Alert.alert("고운서가", "발표등록하시겠습니까?", [
            {
              text: "네",
              onPress: () => navigation.navigate("Register"),
            },
            { text: "아니오", onPress: () => console.log("아니오") },
          ])
        }
      ></Button>

      <Text style={{ fontSize: 15 }}> </Text>

      <Button
        color="#54afe5"
        title="발표삭제"
        onPress={() =>
          Alert.alert("고운서가", "발표삭제하시겠습니까?", [
            {
              text: "네",
              onPress: () => navigation.navigate("Remove"),
            },
            { text: "아니오", onPress: () => console.log("아니오") },
          ])
        }
      ></Button>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={DetailsScreen} />
        <Stack.Screen name="List" component={Result} />
        <Stack.Screen name="Remove" component={RemoveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bfdaea",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 30,
    borderColor: "#777777",
    borderWidth: 2,
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 3,
  },
  header: {
    fontSize: 12,
    marginTop: 10,
    backgroundColor: "#bfdaea",
  },
  title: {
    fontSize: 12,
  },
});

export default App;
