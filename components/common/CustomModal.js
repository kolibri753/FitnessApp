import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

const CustomModal = ({ isModalVisible, closeModal, title, children }) => {
	return (
		<Modal animationType="slide" transparent={true} visible={isModalVisible}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={closeModal}
						testID="closeButton"
					>
						<MaterialIcons name="close" size={24} color={colors.black} />
					</TouchableOpacity>
					<Text style={styles.modalTitle}>{title}</Text>
					{children}
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
});

export default CustomModal;
