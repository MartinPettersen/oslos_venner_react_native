import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import RepliesContainer from "./RepliesContainer";
import ReplyModalMenu from "./(replyModalMenu)/ReplyModelMenu";

type Props = {
  reply: Replie;
};

const { width, height } = Dimensions.get("window");

const ReplyDisplay = ({ reply }: Props) => {
  console.log(reply);

  const navigation = useNavigation();

  const [newReply, setNewReply] = useState<string>("");

  const [replyMenuModalVisible, setReplyMenuModalVisible] = useState(false);

  const openReplyMenuModal = () => {
    setReplyMenuModalVisible(true);
  };

  const closeReplyMenuModal = () => {
    setReplyMenuModalVisible(false);
  };

  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const openReplyModal = () => {
    setReplyModalVisible(true);
  };

  const closeReplyModal = () => {
    setReplyModalVisible(false);
  };

  const handleAddReply = async () => {
    const threadId = uuidv4();

    const today = new Date();
    const doc = await addDoc(collection(FIRESTORE_DB, "replies"), {
      postId: uuidv4(),
      reply: newReply,
      userName: reply.userName,
      parentId: reply.postId,
      createdAt: today.toString(),
      updatedAt: today.toString(),
      children: [],
    });
    setNewReply("");

    closeReplyModal();
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <View
      style={{
        width: width,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 0,
      }}
    >
      <View style={styles.display}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.displayText}>{reply.userName}</Text>
          <TouchableOpacity onPress={() => openReplyMenuModal()}>
            <Text style={styles.dots}>{"\u2022\u2022\u2022"}</Text>
          </TouchableOpacity>
          <ReplyModalMenu user={user} reply={reply} replyMenuModalVisible={replyMenuModalVisible} setReplyMenuModalVisible={setReplyMenuModalVisible}/>

        </View>
        <Text style={styles.displayText}>{reply.reply}</Text>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              user ? openReplyModal() : navigation.navigate("Login")
            }
          >
            <Text style={styles.displayText}>Svar</Text>
          </TouchableOpacity>
          <Text style={styles.displayText}>
            {reply.createdAt !== reply.updatedAt ? "Edited" : null}
          </Text>

          <Text
            style={styles.displayText}
          >{`${reply.createdAt.slice(8, 10)}.${reply.createdAt.slice(4, 7)}.${reply.createdAt.slice(11, 15)}`}</Text>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={replyModalVisible}
          onRequestClose={closeReplyModal}
          style={{ height: "30%" }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContentContainer}>
              <Text style={styles.headline}>Skriv en kommentar</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.text}>Svar: </Text>
                <TextInput
                  placeholder="Svar"
                  onChangeText={(text: string) => setNewReply(text)}
                  value={newReply}
                  style={styles.inputField}
                />
              </View>

              <TouchableOpacity
                onPress={() => handleAddReply()}
                disabled={newReply === ""}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Svar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeReplyModal}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {reply.reply.length > 0 ? (
        <RepliesContainer parentId={reply.postId} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    backgroundColor: "#27272a",
    width: "90%",
    height: "20%",
    flexDirection: "column",
    flex: 1,
  },
  displayText: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 6,

    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
    paddingTop: 50,
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
  headline: {
    fontSize: 40,
    fontWeight: "bold",
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
  button: {
    backgroundColor: "#27272a",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 0,
    marginTop: 40,
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
  dots: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});

export default ReplyDisplay;
