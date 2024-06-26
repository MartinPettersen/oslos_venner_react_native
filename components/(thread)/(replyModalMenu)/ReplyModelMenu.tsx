import { User } from "firebase/auth";
import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import DeleteReplyModal from "./DeleteReplyModal";
import EditReplyModal from "./EditReplyModal";
import ReportReplyModal from "./ReportReplyModal";
import { Replie } from "../../../utils/Types";

const { width, height } = Dimensions.get("window");

type Props = {
  user: User | null;
  reply: Replie;
  replyMenuModalVisible: boolean;
  setReplyMenuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReplyModalMenu = ({
  user,
  reply,
  replyMenuModalVisible,
  setReplyMenuModalVisible,
}: Props) => {
  const [replyReportModalVisible, setReplyReportModalVisible] = useState(false);
  const [replyDeleteModalVisible, setReplyDeleteModalVisible] =
    useState<boolean>(false);
  const [replyEditModalVisible, setReplyEditModalVisible] = useState(false);

  const openReplyMenuModal = () => {
    setReplyMenuModalVisible(true);
  };

  const closeReplyMenuModal = () => {
    setReplyMenuModalVisible(false);
  };

  const closeReplyDeleteModal = () => {
    setReplyMenuModalVisible(false);
  };

  const closeReplyEditModal = () => {
    setReplyMenuModalVisible(false);
  };
  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        visible={replyMenuModalVisible}
        onRequestClose={closeReplyMenuModal}
        style={{ height: "30%" }}
      >
        <View style={styles.menuModalContainer}>
          <View style={styles.menuModalContentContainer}>
            <TouchableOpacity
              style={styles.close}
              onPress={closeReplyMenuModal}
            >
              <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setReplyReportModalVisible(true);
                closeReplyMenuModal();
              }}
            >
              <Text style={styles.buttonText}>Report</Text>
            </TouchableOpacity>
            {user ? (
              user?.displayName == reply.userName ? (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setReplyEditModalVisible(true);
                      closeReplyEditModal();
                    }}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setReplyDeleteModalVisible(true);
                      closeReplyDeleteModal();
                    }}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </>
              ) : null
            ) : null}
          </View>
        </View>
      </Modal>
      <EditReplyModal
        editReplyModalVisible={replyEditModalVisible}
        setEditReplyModalVisible={setReplyEditModalVisible}
        id={reply.postId}
        displayName={user?.displayName}
        reply={reply.reply}
      />
      <ReportReplyModal
        reportReplyModalVisible={replyReportModalVisible}
        setReportReplyModalVisible={setReplyReportModalVisible}
        id={reply.postId}
        displayName={user?.displayName}
      />
      <DeleteReplyModal
        deleteReplyModalVisible={replyDeleteModalVisible}
        setDeleteReplyModalVisible={setReplyDeleteModalVisible}
        id={reply.postId}
        displayName={user?.displayName}
      />
    </>
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
    position: "relative",
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
    marginBottom: 40,
    marginTop: 0,
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

export default ReplyModalMenu;
