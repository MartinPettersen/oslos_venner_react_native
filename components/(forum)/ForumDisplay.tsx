import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ForumScreenParams } from "../../utils/ForumScreenParams";

type Props = {
  forum: string;
  threads: string[];
  navigation: any;
};

const ForumDisplay = ({ forum, threads }: Props) => {
  const navigation = useNavigation();
  console.log(forum)
  return (
    <View>
      { forum ?  
      <TouchableOpacity
        style={styles.display}
        onPress={() =>
          navigation.navigate("Forum", { forum, threads } as ForumScreenParams)
        }
      >
        <Text style={styles.displayText}>{forum}</Text>
      </TouchableOpacity>
      :null}
    </View>
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
