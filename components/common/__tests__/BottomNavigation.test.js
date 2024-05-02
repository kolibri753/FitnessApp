import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import BottomNavigation from "../BottomNavigation";

describe("BottomNavigation", () => {
  test("renders correctly", () => {
    const state = {
      routes: [
        { key: "Home", name: "Home" },
        { key: "Exercises", name: "Exercises" },
        { key: "Workouts", name: "Workouts" },
        { key: "Profile", name: "Profile" },
      ],
      index: 0,
    };

    const descriptors = {
      Home: { options: { title: "Home" } },
      Exercises: { options: { title: "Exercises" } },
      Workouts: { options: { title: "Workouts" } },
      Profile: { options: { title: "Profile" } },
    };

    const navigation = {
      emit: jest.fn(),
      navigate: jest.fn(),
    };

    const { getByText } = render(
      <BottomNavigation
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      />
    );

    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Exercises")).toBeTruthy();
    expect(getByText("Workouts")).toBeTruthy();
    expect(getByText("Profile")).toBeTruthy();
  });

  test("calls navigation.navigate when a tab is pressed", () => {
    const state = {
      routes: [
        { key: "Home", name: "Home" },
        { key: "Exercises", name: "Exercises" },
        { key: "Workouts", name: "Workouts" },
        { key: "Profile", name: "Profile" },
      ],
      index: 0,
    };

    const descriptors = {
      Home: { options: { title: "Home" } },
      Exercises: { options: { title: "Exercises" } },
      Workouts: { options: { title: "Workouts" } },
      Profile: { options: { title: "Profile" } },
    };

    const navigation = {
      emit: jest.fn((eventName, eventPayload) => {
        // Mocking navigation.emit to return an object with defaultPrevented property
        return {
          defaultPrevented: false,
        };
      }),
      navigate: jest.fn(),
    };

    const { getByText } = render(
      <BottomNavigation
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      />
    );

    fireEvent.press(getByText("Exercises"));
    expect(navigation.navigate).toHaveBeenCalledWith("Exercises");
  });

  it("renders correctly", () => {
    const state = {
      routes: [
        { key: "Home", name: "Home" },
        { key: "Exercises", name: "Exercises" },
        { key: "Workouts", name: "Workouts" },
        { key: "Profile", name: "Profile" },
      ],
      index: 0,
    };

    const descriptors = {
      Home: { options: { title: "Home" } },
      Exercises: { options: { title: "Exercises" } },
      Workouts: { options: { title: "Workouts" } },
      Profile: { options: { title: "Profile" } },
    };

    const navigation = {
      emit: jest.fn(),
      navigate: jest.fn(),
    };

    const tree = renderer
      .create(
        <BottomNavigation
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
