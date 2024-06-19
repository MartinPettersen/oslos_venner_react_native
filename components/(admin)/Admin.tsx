import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { User, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/Types";

const { width, height } = Dimensions.get("window");

const Admin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);

      if (user) {
        const idTokenResult = await getIdTokenResult(user);
        setIsAdmin(!!idTokenResult.claims.admin);
        setLoading(false);
      } else {
        setIsAdmin(false);
        navigation.navigate("Forum");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    if (!isAdmin && !loading) {
      navigation.navigate("Forum");
    }
  }, [isAdmin, loading]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Admin Side</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AdminReportPage")}
      >
        <Text style={styles.buttonText}>Rapporter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateForum")}
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
  buttonText: {
    fontSize: 20,
    marginVertical: 0,
    color: "white",
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
  borderline: {
    width: "90%",
    borderLeftWidth: 2,
    borderLeftColor: "black",
  },
  headline: {
    fontSize: 30,
    marginBottom: 20,
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
  displayText: {
    fontSize: 30,
    marginVertical: 10,
    color: "white",
  },
  scrollView: {
    flexGrow: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingContainer: {
    justifyContent: "center",
  },
});

export default Admin;
