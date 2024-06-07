import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";



type Props = {
  forum: string;
  navigation: any;
};

const ForumDisplay = ({ forum }: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.display}
      onPress={() => navigation.navigate("Forum", { forum })}
    >
      <Text style={styles.displayText}>{forum}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  display: {
    backgroundColor: "#27272a",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 30,
    marginVertical: 10,
    color: "white",
  },
});

export default ForumDisplay;
