import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ForumDisplay from "./ForumDisplay";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot } from "@firebase/firestore";

const { width, height } = Dimensions.get("window");

const FORUMS = ["Robotics", "Books", "Sport"];

export interface Forum {
  label: string;
  threads: string[];
  createdBy: string;
  updatedAt: string;
}

const Forums = ({ navigation }: any) => {

  const [forums, setForums] = useState<Forum[]>([])

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, 'forums')

    const subscriber = onSnapshot(forumRef, {
      next: (snapshot) => {
        const forums: Forum[] = [];
        snapshot.docs.forEach(doc => {
          forums.push({
            label: doc.data().label,
            threads: doc.data().threads,
            createdBy: doc.data().createdBy,
            updatedAt: doc.data().updatedAt,
          })
        })
        setForums(forums)
      }
    })
    
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Forums</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {forums.map((forum, index) => (
          
          <ForumDisplay key={index} forum={forum.label} threads={forum.threads} navigation={navigation}/>
        ))}
      </ScrollView>
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
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Forums;
