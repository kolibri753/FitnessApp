import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Pagination
        page={1}
        totalPages={5}
        handlePrevPage={() => {}}
        handleNextPage={() => {}}
        scrollToTop={() => {}}
        setPage={() => {}}
      />
    );
    expect(getByText('<')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('>')).toBeTruthy();
  });

  it('calls handlePrevPage when prev button is pressed', () => {
    const handlePrevPageMock = jest.fn();
    const { getByText } = render(
      <Pagination
        page={2}
        totalPages={5}
        handlePrevPage={handlePrevPageMock}
        handleNextPage={() => {}}
        scrollToTop={() => {}}
        setPage={() => {}}
      />
    );
    fireEvent.press(getByText('<'));
    expect(handlePrevPageMock).toHaveBeenCalledTimes(1);
  });

  it('calls handleNextPage when next button is pressed', () => {
    const handleNextPageMock = jest.fn();
    const { getByText } = render(
      <Pagination
        page={2}
        totalPages={5}
        handlePrevPage={() => {}}
        handleNextPage={handleNextPageMock}
        scrollToTop={() => {}}
        setPage={() => {}}
      />
    );
    fireEvent.press(getByText('>'));
    expect(handleNextPageMock).toHaveBeenCalledTimes(1);
  });

  it('calls setPage with correct page number when a pagination button is pressed', () => {
    const setPageMock = jest.fn();
    const { getByText } = render(
      <Pagination
        page={2}
        totalPages={5}
        handlePrevPage={() => {}}
        handleNextPage={() => {}}
        scrollToTop={() => {}}
        setPage={setPageMock}
      />
    );
    fireEvent.press(getByText('3'));
    expect(setPageMock).toHaveBeenCalledWith(3);
  });

  it("renders correctly", () => {
		const tree = renderer.create(<Pagination />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
