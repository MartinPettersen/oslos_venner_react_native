import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import React, { useState } from "react";
  import {
    Modal,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Dimensions,
  } from "react-native";
  import { FIRESTORE_DB } from "../../firebaseConfig";
  
  type Props = {
    deleteThreadModalVisible: boolean;
    setDeleteThreadModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    reportId: string;
    id: string;
  };
  
  const { width, height } = Dimensions.get("window");
  
  const AdminDeleteThread = ({
    deleteThreadModalVisible,
    setDeleteThreadModalVisible,
    id,
    reportId,
  }: Props) => {
    const [report, setReport] = useState<string>("");
  
    const handleDeleteReport = async () => {
      console.log("handleDeleteReport gets called")
      const q = query(
        collection(FIRESTORE_DB, "reports"),
        where("reportId", "==", reportId)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log("No matching documents for report.");
        return;
      }
  
      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(FIRESTORE_DB, "reports", document.id))
      );
  
      await Promise.all(deletePromises);
      console.log("Reports deleted successfully.");
  
      await closeDeleteModal();
    };
  
    const handleDelete = async () => {
      const q = query(
        collection(FIRESTORE_DB, "threads"),
        where("id", "==", id)
      );
      console.log(`id: ${id} reportId:${reportId}`)
      const querySnapshot = await getDocs(q);
  
      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(FIRESTORE_DB, "threads", document.id))
      );
  
      await Promise.all(deletePromises);
  
      await handleDeleteReport();
    };
  
    const openDeleteModal = () => {
      setDeleteThreadModalVisible(true);
    };
  
    const closeDeleteModal = () => {
      setDeleteThreadModalVisible(false);
    };
  
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={deleteThreadModalVisible}
        onRequestClose={closeDeleteModal}
        style={{ height: "30%" }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <Text style={styles.headline}>Sikker på at du ønsker å slette?</Text>
  
            <TouchableOpacity
              onPress={() => handleDelete()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Ja</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.button} onPress={closeDeleteModal}>
              <Text style={styles.buttonText}>Nei</Text>
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
  });
  
  export default AdminDeleteThread;
  