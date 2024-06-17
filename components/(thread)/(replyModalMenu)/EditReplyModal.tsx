import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  Modal,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

type Props = {
  editReplyModalVisible: boolean;
  setEditReplyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  displayName: string | null | undefined;
  id: string;
  reply: string;
};

const { width, height } = Dimensions.get("window");

const EditReplyModal = ({
  editReplyModalVisible,
  setEditReplyModalVisible,
  id,
  displayName,
  reply,
}: Props) => {
  const [newReply, setNewReply] = useState<string>(reply);

  const handleEditReply = async () => {
    const today = new Date();

    try {
      const q = query(
        collection(FIRESTORE_DB, "replies"),
        where("postId", "==", id)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          reply: newReply,
          updatedAt: today.toString(),
        });
      });

      setNewReply("");
      closeEditReplyModal();
    } catch (error) {
      console.error("Error updating thread: ", error);
    }
  };

  const openEditReplyModal = () => {
    setEditReplyModalVisible(true);
  };

  const closeEditReplyModal = () => {
    setEditReplyModalVisible(false);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={editReplyModalVisible}
      onRequestClose={closeEditReplyModal}
      style={{ height: "30%" }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
        <TouchableOpacity style={styles.close} onPress={closeEditReplyModal}>
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.headline}>Oppdater innholdet</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Svar: </Text>
            <TextInput
              placeholder=""
              onChangeText={(text: string) => setNewReply(text)}
              value={newReply}
              style={styles.inputField}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleEditReply()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Oppdater</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default EditReplyModal;
