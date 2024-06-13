import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ReplyDisplay from "./ReplyDisplay";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { useNavigation, useRoute } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { User, onAuthStateChanged } from "firebase/auth";
import ModalMenu from "./ModalMenu";

const { width, height } = Dimensions.get("window");

const REPLIES = [
  {
    message: "Robotics are cool",
    author: "Human",
    date: "10/10/2020",
    replies: "40",
  },
  {
    message: "Robots are better",
    author: "NotaRobot",
    date: "12/10/2022",
    replies: "10",
  },
  {
    message: "Evil robot Overlords",
    author: "Subterfuge",
    date: "10/09/2008",
    replies: "1",
  },
];

const Thread = () => {
  const [thread, setThread] = useState(null);

  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const openReplyModal = () => {
    setReplyModalVisible(true);
  };

  const closeReplyModal = () => {
    setReplyModalVisible(false);
  };

  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const openMenuModal = () => {
    setMenuModalVisible(true);
  };

  const closeMenuModal = () => {
    setMenuModalVisible(false);
  };

  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "threads");

    const subscriber = onSnapshot(query(forumRef, where("id", "==", id)), {
      next: (snapshot) => {
        const threads: any[] = [];
        snapshot.docs.forEach((doc) => {
          threads.push({
            id: doc.data().id,
            headline: doc.data().headline,
            userName: doc.data().userName,
            content: doc.data().content,
            forumLabel: doc.data().forumLabel,
            replies: doc.data().replies,
            createdBy: doc.data().createdBy,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
          });
        });
        setThread(threads[0]);
      },
    });
  }, []);

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "replies");

    const subscriber = onSnapshot(
      query(forumRef, where("parentId", "==", id)),
      {
        next: (snapshot) => {
          const replies: any[] = [];
          snapshot.docs.forEach((doc) => {
            replies.push({
              postId: doc.data().postId,
              parentId: doc.data().parentId,
              userName: doc.data().userName,
              reply: doc.data().reply,
              children: doc.data().children,
              createdAt: doc.data().createdAt,
              updatedAt: doc.data().updatedAt,
            });
          });
          setReplies(replies);
        },
      }
    );
  }, []);

  const [user, setUser] = useState<User | null>(null);
  const [postId, setPostId] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const [userName, setUserName] = useState<string>("test_dude");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [parentId, setParentId] = useState<string>(id);
  const [children, setChildren] = useState<string[]>([]);

  const handleAddReply = async () => {
    const threadId = uuidv4();

    const today = new Date();
    setCreatedAt(today.toString());
    setUpdatedAt(today.toString());
    const doc = await addDoc(collection(FIRESTORE_DB, "replies"), {
      postId: uuidv4(),
      reply: reply,
      userName: user?.displayName,
      parentId: id,
      createdAt: today.toString(),
      updatedAt: today.toString(),
      children: [],
    });
    setReply("");
    setCreatedAt("");
    setUpdatedAt("");
    closeReplyModal();
  };

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  if (!thread) {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.thread}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.threadText}>{thread.headline}</Text>
          <TouchableOpacity onPress={() => openMenuModal()}>
            <Text style={styles.dots}>{"\u2022\u2022\u2022"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.threadText}>{thread.userName}</Text>
        <Text style={styles.threadText}>{thread.content}</Text>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              user ? openReplyModal() : navigation.navigate("Login")
            }
          >
            <Text style={styles.threadText}>Svar</Text>
          </TouchableOpacity>
          <Text style={styles.threadText}>#{replies.length}</Text>
          <View>
            {thread.createdAt != thread.updatedAt ? (
              <Text style={styles.threadText}>Edited</Text>
            ) : null}
          </View>
          <Text
            style={styles.threadText}
          >{`${thread.createdAt.slice(8, 10)}.${thread.createdAt.slice(4, 7)}.${thread.createdAt.slice(11, 15)}`}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {replies.map((reply, index) => (
          <ReplyDisplay key={index} reply={reply} />
        ))}
      </ScrollView>
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
                onChangeText={(text: string) => setReply(text)}
                value={reply}
                style={styles.inputField}
              />
            </View>

            <TouchableOpacity
              onPress={() => handleAddReply()}
              disabled={reply === ""}
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
      <Modal
        animationType="none"
        transparent={true}
        visible={menuModalVisible}
        onRequestClose={closeMenuModal}
        style={{ height: "30%" }}
      >
        <View style={styles.menuModalContainer}>
          <View style={styles.menuModalContentContainer}>
            <TouchableOpacity style={styles.button} onPress={closeMenuModal}>
              <Text style={styles.buttonText}>Report</Text>
            </TouchableOpacity>
            {user ? (
                
                user?.displayName == thread.userName ? (
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={closeMenuModal}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={closeMenuModal}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  null
                )
            ) : (
              null
            )}
            <TouchableOpacity style={styles.button} onPress={closeMenuModal}>
              <Text style={styles.buttonText}>Lukk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ModalMenu user={user} thread={thread} menuModalVisible={menuModalVisible} setMenuModalVisible={setMenuModalVisible}/>
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
    paddingTop: 50,
  },
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
    width: "40%",
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
  dots: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
});

export default Thread;
