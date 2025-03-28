import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";

const StartDistributionLine = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>התחל קו חלוקה</Text>
      {/* TODO: <Text>
        ליצור מודל שמאפשר לבחור קו חלוקה אחד, ואז אני אשתמש בו גם פה וגם בדף של
        ההזמנה בשביל לשייך את ההזמנה לקו חלוקה אחר שהוא לא הנוכחי
        ולאפשר מתוך הדף של קו חלוקה, אם הוא של הנהג הנוכחי- להתחיל אותו מיד אם אין קו חלוקה פעיל
      </Text> */}
    </TouchableOpacity>
  );
};

export default StartDistributionLine;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth * 0.85,
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    marginTop: ScreenHeight * 0.02,
    alignItems: "center",
    paddingVertical: ScreenHeight * 0.015,
    alignSelf: "center",
    borderColor: "#21a7fd",
    borderWidth: 3,
    borderStyle: "dotted",
    marginBottom: ScreenHeight * 0.02,
  },
  title: {
    fontSize: ScreenWidth * 0.05,
    fontWeight: "bold",
    color: "#001B61",
  },
});
