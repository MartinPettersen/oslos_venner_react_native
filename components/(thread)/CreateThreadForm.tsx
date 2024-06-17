import React, { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { User, onAuthStateChanged } from "firebase/auth";

const { width, height } = Dimensions.get("window");

export interface Forum {
  label: string;
  threads: string[];
  createdBy: string;
  updatedAt: string;
}

const CreateThreadForm = () => {
  const route = useRoute();

  const threadId = uuidv4();

  const [id, setId] = useState<string>(threadId);
  const [headline, setHeadline] = useState<string>("");
  const [userName, setUserName] = useState<string>("test_dude");
  const [content, setContent] = useState<string>("");
  const [forumLabel, setForumLabel] = useState<string>(route.params.forum);
  const [replies, setReplies] = useState<any[]>([]);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const handleAddThread = async () => {
    const today = new Date();
    setCreatedAt(today.toString());
    setUpdatedAt(today.toString());
    const doc = await addDoc(collection(FIRESTORE_DB, "threads"), {
      id: id,
      headline: headline,
      userName: user?.displayName,
      content: content,
      forumLabel: forumLabel,
      replies: replies,
      createdAt: today.toString(),
      updatedAt: today.toString(),
    });
    setHeadline("");
    setCreatedAt("");
    setUpdatedAt("");
  };

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <KeyboardAvoidingView behaviour="padding" style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.headline}>{"Opprett Ny Forum Tråd"}</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Tittel: </Text>
              <TextInput
                placeholder="Tittel"
                onChangeText={(text: string) => setHeadline(text)}
                value={headline}
                style={styles.inputField}
              />
            </View>
            <View style={styles.inputContainerArea}>
              <Text style={styles.text}>Innhold: </Text>
              <TextInput
                placeholder="Fakta om Katter..."
                onChangeText={(text: string) => setContent(text)}
                value={content}
                multiline={true}
                style={styles.inputField}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleAddThread()}
            disabled={headline === "" || content === ""}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Opprett Forum Tråd</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCD3E9",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
    height: height,
    paddingTop: 50,
  },
  headline: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#27272a",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 0,
    marginTop: 40,
  },
  display: {
    backgroundColor: "#27272a",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    marginVertical: 0,
    color: "white",
  },
  displayText: {
    fontSize: 30,
    marginVertical: 10,
    color: "white",
  },
  scrollView: {
    flexGrow: 1,
    width: width,
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: 200,
    paddingBottom: 5,
  },
  inputContainerArea: {
    flexDirection: "column",
    width: 200,
    height: 100,
    paddingBottom: 5,
  },
  inputField: {
    fontSize: 20,
    marginVertical: 10,
    textDecorationLine: "underline",
    width: "80%",
  },
  formContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
});

export default CreateThreadForm;
