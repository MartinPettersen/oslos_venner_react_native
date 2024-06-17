import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import axios from 'axios';


const { width, height } = Dimensions.get("window");

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;


  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      if (email === 'admin2@gmail.com') {
        await axios.post('http://localhost:3000/setAdminRole', { email });
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
        <Text style={styles.headline}>Opprett Bruker</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Bruker Navn: </Text>
            <TextInput
              placeholder="Bruker Navn"
              onChangeText={(text: string) => setUserName(text)}
              value={userName}
              autoCapitalize="none"
              style={styles.inputField}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Epost: </Text>
            <TextInput
              placeholder="Email"
              onChangeText={(text: string) => setEmail(text)}
              value={email}
              autoCapitalize="none"
              style={styles.inputField}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Passord: </Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Passord"
              onChangeText={(text: string) => setPassword(text)}
              value={password}
              style={styles.inputField}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Gjenta Passord: </Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Gjenta Passord"
              onChangeText={(text: string) => setRepeatPassword(text)}
              value={repeatPassword}
              style={styles.inputField}
            />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <TouchableOpacity
            onPress={() => handleSignUp()}
            disabled={
              email === "" || email === "" || password != repeatPassword
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Opprett Bruker</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
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

export default CreateUser;
