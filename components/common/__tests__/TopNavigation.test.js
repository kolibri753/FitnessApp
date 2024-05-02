import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";
import TopNavigation from '../TopNavigation';

describe('TopNavigation', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<TopNavigation title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders back button and calls navigation.goBack when navigation prop is provided', () => {
    const mockNavigation = { goBack: jest.fn() };
    const { getByTestId } = render(
      <TopNavigation title="Test Title" navigation={mockNavigation} />
    );
    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it("renders correctly", () => {
		const tree = renderer.create(<TopNavigation />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
