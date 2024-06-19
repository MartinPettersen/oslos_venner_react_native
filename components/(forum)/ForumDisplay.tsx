import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ForumScreenParams } from "../../utils/ForumScreenParams";
import { RootStackParamList } from "../../utils/Types";

type Props = {
  forum: string;
  threads: string[];
  navigation: any;
};

const { width, height } = Dimensions.get("window");


const ForumDisplay = ({ forum, threads }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
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
  container: {
    width: width,
    alignItems: "center",
  },
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
