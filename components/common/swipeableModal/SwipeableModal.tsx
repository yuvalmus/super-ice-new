import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface SwipeableModalProps extends PropsWithChildren {
  isVisible: boolean;
  onClose?: () => void;
}

const SwipeableModal = (props: SwipeableModalProps) => {
  return (
    <Modal
      isVisible={props.isVisible}
      onSwipeComplete={props.onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.3}
      propagateSwipe
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      onBackButtonPress={props.onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.swipeIndicator} />
        {props.children}
      </View>
    </Modal>
  );
};

export default SwipeableModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    height: "95%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  swipeIndicator: {
    position: "absolute",
    top: ScreenHeight * 0.02,
    zIndex: 2,
    width: ScreenWidth * 0.13,
    height: ScreenHeight * 0.006,
    borderRadius: 2.5,
    backgroundColor: "#001B61",
    marginBottom: 10,
  },
});
