import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  Modal,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

type Props = {
  replyModalVisible: boolean;
  setReplyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  displayName: string | null | undefined;
  id: string;
};

const { width, height } = Dimensions.get("window");

const ReplyModal = ({
  replyModalVisible,
  setReplyModalVisible,
  id,
  displayName,
}: Props) => {
  const [reply, setReply] = useState<string>("");

  const handleAddReply = async () => {
    const threadId = uuidv4();

    const today = new Date();
    const doc = await addDoc(collection(FIRESTORE_DB, "replies"), {
      postId: uuidv4(),
      reply: reply,
      userName: displayName,
      parentId: id,
      createdAt: today.toString(),
      updatedAt: today.toString(),
      children: [],
    });
    setReply("");
    closeReplyModal();
  };

  const openReplyModal = () => {
    setReplyModalVisible(true);
  };

  const closeReplyModal = () => {
    setReplyModalVisible(false);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={replyModalVisible}
      onRequestClose={closeReplyModal}
      style={{ height: "30%" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
          <TouchableOpacity style={styles.close} onPress={closeReplyModal}>
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.headline}>Skriv en kommentar</Text>

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Svar: </Text>
              <TextInput
                placeholder="Svar"
                onChangeText={(text: string) => setReply(text)}
                value={reply}
                multiline={true}
                style={styles.inputField}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => handleAddReply()}
            disabled={reply === ""}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Svar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
    paddingTop: 50,
  },
  menuModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
    paddingTop: 200,
  },
  modalContentContainer: {
    backgroundColor: "#FCD3E9",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "80%",
    height: "60%",
    paddingTop: 50,
    borderWidth: 2,
  },
  menuModalContentContainer: {
    backgroundColor: "#FCD3E9",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "80%",
    paddingTop: 50,
    borderWidth: 2,
  },
  headline: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  thread: {
    backgroundColor: "#27272a",
    width: "90%",
    padding: 8,
    height: "40%",
    justifyContent: "space-between",
    marginBottom: 40,
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
  threadText: {
    fontSize: 20,
    marginVertical: 10,
    color: "white",
  },
  displayText: {
    fontSize: 30,
    marginVertical: 10,
    color: "white",
  },
  scrollView: {
    width: width,
    alignItems: "center",
    paddingVertical: -0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputField: {
    fontSize: 20,
    marginVertical: 10,
    textDecorationLine: "underline",
    width: "80%",
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
    marginBottom: 40,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: "row",
    width: 200,
    paddingBottom: 5,
  },
  dots: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  close: {
    backgroundColor: "#27272a",
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    position: "absolute",
    top: 10,
    right: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
  },
});

export default ReplyModal;
