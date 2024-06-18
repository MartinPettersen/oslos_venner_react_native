import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Animated, useWindowDimensions } from "react-native";
import ForumDisplay from "./ForumDisplay";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot } from "@firebase/firestore";

const Forums = ({ navigation }: any) => {
  const [forums, setForums] = useState<Forum[]>([]);
  const { width, height } = useWindowDimensions();
  const [backgroundColorAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, 'forums');
    const subscriber = onSnapshot(forumRef, {
      next: (snapshot) => {
        const forums: Forum[] = [];
        snapshot.docs.forEach(doc => {
          forums.push({
            label: doc.data().label,
            threads: doc.data().threads,
            createdBy: doc.data().createdBy,
            updatedAt: doc.data().updatedAt,
          });
        });
        setForums(forums);
      }
    });

    // Cleanup function
    return () => subscriber();
  }, []);

  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: 1,
      duration: 300, // Adjust duration as needed
      useNativeDriver: false,
    }).start();
  }, [width, height]);

  const interpolatedBackgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FCD3E9", "#FCD3E9"], // Adjust to your desired background color
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: interpolatedBackgroundColor }]}>
      <Text style={styles.headline}>Forums</Text>
      <ScrollView
        contentContainerStyle={[styles.scrollView, { minHeight: height - 120 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {forums.map((forum, index) => (
          <ForumDisplay key={index} forum={forum.label} threads={forum.threads} navigation={navigation} />
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  headline: {
    fontSize: 30,
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Forums;
