import React from "react";
import { render } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import Logo from "../Logo";

// Mock the SVG component
jest.mock("../../../assets/logo.svg", () => "SvgMock");

describe("Logo", () => {
	it("renders correctly", () => {
		const { getByText, getByTestId } = render(<Logo />);

		// Check if "Gym" text is rendered
		expect(getByText("Gym")).toBeTruthy();

		// Check if SVG logo is rendered
		const logoSvg = getByTestId("logoSVG");
		expect(logoSvg).toBeTruthy();

		// Check if "Rat" text is rendered
		expect(getByText("Rat")).toBeTruthy();
	});

	it("renders correctly", () => {
		const tree = renderer.create(<Logo />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
