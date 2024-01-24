import Toast from "react-native-root-toast";
import { colors } from "../styles/colors";

export const showSuccessToast = (message) => {
	Toast.show(message, {
		duration: Toast.durations.SHORT,
		position: 0,
		shadow: true,
		animation: true,
		hideOnPress: true,
		backgroundColor: colors.success,
		textColor: colors.white,
		delay: 0,
	});
};

export const showErrorToast = (message) => {
	Toast.show(message, {
		duration: Toast.durations.SHORT,
		position: 0,
		shadow: true,
		animation: true,
		hideOnPress: true,
		backgroundColor: colors.error,
		textColor: colors.white,
		delay: 0,
	});
};
