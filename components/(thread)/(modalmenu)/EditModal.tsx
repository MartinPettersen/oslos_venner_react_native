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
  editModalVisible: boolean;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  displayName: string | null | undefined;
  id: string;
  headline: string,
  content: string,
};

const { width, height } = Dimensions.get("window");

const EditModal = ({
  editModalVisible,
  setEditModalVisible,
  id,
  displayName,
  headline, content
}: Props) => {
  const [newContent, setNewContent] = useState<string>(content);
  const [newHeadline, setNewHeadline] = useState<string>(headline);

  const handleEditThread = async () => {
    const today = new Date();

    try {
        const q = query(collection(FIRESTORE_DB, "threads"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            content: newContent,
            headline: newHeadline,
            updatedAt: today.toString(),
          });
        });
  
        setNewContent("");
        setNewHeadline("");
        closeEditModal();
      } catch (error) {
        console.error("Error updating thread: ", error);
      }
  };

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={closeEditModal}
      style={{ height: "30%" }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
        <TouchableOpacity style={styles.close} onPress={closeEditModal}>
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.headline}>Oppdater innholdet</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Tittel: </Text>
            <TextInput
              placeholder=""
              onChangeText={(text: string) => setNewHeadline(text)}
              value={newHeadline}
              style={styles.inputField}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>innhold: </Text>
            <TextInput
              placeholder=""
              onChangeText={(text: string) => setNewContent(text)}
              value={newContent}
              style={styles.inputField}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleEditThread()}
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

export default EditModal;
