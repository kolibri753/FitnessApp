import React from "react";
import { render } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import TargetMusclePieChart from "../TargetMusclePieChart";

jest.mock("react-native-pie-chart", () => "PieChartMock");

describe("TargetMusclePieChart", () => {
	it("renders title correctly", () => {
		const { getByText } = render(<TargetMusclePieChart targets={[]} />);
		const title = getByText("Target Muscles");
		expect(title).toBeTruthy();
	});

	it("renders 'Add exercises' text when no data is provided", () => {
		const { getByText } = render(<TargetMusclePieChart targets={[]} />);
		const noDataText = getByText("Add exercises to this workout!");
		expect(noDataText).toBeTruthy();
	});

	it("renders legend items correctly", () => {
		const targets = ["Legs", "Arms", "Back"];
		const { getByText } = render(<TargetMusclePieChart targets={targets} />);

		targets.forEach((target) => {
			const legendText = getByText(target);
			expect(legendText).toBeTruthy();
		});
	});

  it("renders correctly", () => {
		const tree = renderer.create(<TargetMusclePieChart />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
