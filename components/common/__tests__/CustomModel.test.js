import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import { Text } from "react-native";
import CustomModal from "../CustomModal";

describe("CustomModal", () => {
	const onCloseModal = jest.fn();
	const title = "Test Modal";
	const children = <Text>Test Content</Text>;

	it("renders correctly", () => {
		const { getByText } = render(
			<CustomModal isModalVisible={true} closeModal={onCloseModal} title={title}>
				{children}
			</CustomModal>
		);

		expect(getByText(title)).toBeTruthy();
		expect(getByText("Test Content")).toBeTruthy();
	});

	it("calls closeModal function when close button is pressed", () => {
		const { getByTestId } = render(
			<CustomModal isModalVisible={true} closeModal={onCloseModal} title={title}>
				{children}
			</CustomModal>
		);

		fireEvent.press(getByTestId("closeButton"));
		expect(onCloseModal).toHaveBeenCalledTimes(1);
	});

	it("renders correctly", () => {
		const tree = renderer.create(<CustomModal />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
