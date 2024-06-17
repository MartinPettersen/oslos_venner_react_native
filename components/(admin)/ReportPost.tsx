import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

type Props = {
  reply: Replie;
};

const ReportPost = ({ reply }: Props) => {




  return (
    <View style={{borderWidth: 2, borderColor: "pink", padding: 14,}}>
      <Text style={styles.displayText}>{reply.userName}</Text>
      <Text style={styles.displayText}>{reply.reply}</Text>
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
        fontSize: 10,
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
})

export default ReportPost;
