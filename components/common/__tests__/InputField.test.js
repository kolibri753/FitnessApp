import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import InputField from "../InputField";

describe("InputField", () => {
	it("renders correctly with default props", () => {
		const { getByPlaceholderText } = render(<InputField />);
		expect(getByPlaceholderText("Enter text...")).toBeTruthy();
	});

	it("renders correctly with provided props", () => {
		const { getByPlaceholderText } = render(
			<InputField
				placeholder="Custom placeholder"
				value="Test value"
				onChangeText={() => {}}
				secureTextEntry={true}
				error="Test error message"
				multiline={true}
				numberOfLines={4}
			/>
		);
		expect(getByPlaceholderText("Custom placeholder")).toBeTruthy();
	});

	it("calls onChangeText function when input value changes", () => {
		const onChangeTextMock = jest.fn();
		const { getByTestId } = render(
			<InputField onChangeText={onChangeTextMock} />
		);
		fireEvent.changeText(getByTestId("inputField"), "New value");
		expect(onChangeTextMock).toHaveBeenCalledWith("New value");
	});

	it("toggles secureTextEntry when icon is pressed", () => {
		const { getByTestId } = render(
			<InputField
				placeholder="Password"
				value="Test password"
				secureTextEntry={true}
			/>
		);
		const eyeIcon = getByTestId("eyeIcon");
		fireEvent.press(eyeIcon);
		expect(getByTestId("eyeIcon")).toBeTruthy();
	});

	it("displays error message when error prop is provided", () => {
		const { getByText } = render(
			<InputField placeholder="Text" error="Test error message" />
		);
		expect(getByText("Test error message")).toBeTruthy();
	});

  it("renders correctly", () => {
		const tree = renderer.create(<InputField />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
