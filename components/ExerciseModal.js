import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

const ExerciseModal = ({
  isModalVisible,
  closeModal,
  handleSaveExercise,
  exercise,
  description,
  setDescription,
  time,
  setTime,
  rest,
  setRest,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            Add |{exercise.name}| to your workout
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Time for exercise</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={time}
              onChangeText={(text) => setTime(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Rest time</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={rest}
              onChangeText={(text) => setRest(text)}
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveExercise}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
  },
  modalContent: {
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    width: "100%",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: colors.yellow,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "900",
  },
});

export default ExerciseModal;
