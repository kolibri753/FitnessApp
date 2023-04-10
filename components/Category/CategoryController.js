class CategoryController {
	constructor(model, handleCategoryPress) {
		this.model = model;
		this.handleCategoryPress = handleCategoryPress;
	}

	getCategory() {
		return this.model.getCategory();
	}

	setCategory(category) {
		this.model.setCategory(category);
	}

	handlePress() {
		this.handleCategoryPress(this.model.getCategory());
	}

	handleShowUnderlay() {
		this.model.setIsHovered(true);
	}

	handleHideUnderlay() {
		this.model.setIsHovered(false);
	}
}

export default CategoryController;
