import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

export interface Forum {
    label: string;
    threads: string[];
    createdBy: string;
    updatedAt: string;
}

const CreateForumForm = () => {

    
const [label, setLabel] = useState("")
const [threads, setThreads] = useState([])
const [createdBy, setCreatedBy] = useState("TestAdmin")
const [createdAt, setCreatedAt] = useState("")
const [updatedAt, setUpdated] = useState("")


  const handleAddForum = async() => {
    console.log("trying to Add Forum");
    const today = new Date()
    setCreatedAt(today.toString())
    setUpdated(today.toString())
    console.log(today)
    const doc = await addDoc(collection(FIRESTORE_DB, 'forums'), { label: label, threads: threads, createdBy: createdBy, createdAt: today.toString(), updatedAt: today.toString()} )
    setLabel("")
    setCreatedAt("")
    setUpdated("")
    
    };

  useEffect(() => {
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Opprett Nytt Forum</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Tittel: </Text>
          <TextInput
            placeholder="Tittel"
            onChangeText={(text: string) => setLabel(text)}
            value={label}
            style={styles.inputField}
          />
        </View>

      </View>
        <TouchableOpacity
          onPress={() => handleAddForum()}
          disabled={label === ""}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Opprett Forum</Text>
        </TouchableOpacity>
    </View>
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
    fontSize: 40,
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
  inputField: {
    fontSize: 20,
    marginVertical: 10,
    textDecorationLine: "underline",
    width: "40%",
  },
  formContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateForumForm;
