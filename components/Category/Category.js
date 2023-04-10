import React from "react";
import CategoryController from "./CategoryController";
import CategoryModel from "./CategoryModel";
import CategoryView from "./CategoryView";

const Category = ({ category, handleCategoryPress, icons }) => {
	const model = new CategoryModel(category, icons);
	const controller = new CategoryController(model, handleCategoryPress);

	return (
		<CategoryView
			model={model}
			handleCategoryPress={controller.handlePress.bind(controller)}
		/>
	);
};

export default Category;
