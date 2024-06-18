import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ForumDisplay from "../(forum)/ForumDisplay";
import ThreadDisplay from "../(forum)/ThreadDisplay";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import ReplyDisplay from "../(thread)/ReplyDisplay";
import Report from "./Report";
import { Report as ReportType } from '../../utils/Types'

const { width, height } = Dimensions.get("window");

const Reports = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  const [reports, setReports] = useState<ReportType[]>([]);

    

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, 'reports')

    const subscriber = onSnapshot(forumRef, {
      next: (snapshot) => {
        const reports: ReportType[] = [];
        snapshot.docs.forEach(doc => {
          const data = doc.data() as ReportType; // Cast to ReportType
          const report: ReportType = {
            report: data.report,
            userName: data.userName,
            subjectId: data.subjectId,
            reportId: data.reportId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          };
          reports.push(report);
        })
        console.log("the report")
        console.log(reports)
        setReports(reports)
      }
    })
    
  }, [])
  


  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Rapporter</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {reports.length > 0
          ? reports.map((report, index) => (
              <Report report={report} key={index} />              
            ))
          : null}
      </ScrollView>

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
    fontSize: 30,
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
});

export default Reports;
