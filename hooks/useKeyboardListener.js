import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboardListener = () => {
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setIsKeyboardOpen(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setIsKeyboardOpen(false);
			}
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	return isKeyboardOpen;
};

export default useKeyboardListener;
