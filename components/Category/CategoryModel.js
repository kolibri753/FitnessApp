class CategoryModel {
	constructor(category, icons) {
		this.category = category;
		this.icons = icons;
		this.isHovered = false;
	}

	getCategory() {
		return this.category;
	}

	setCategory(category) {
		this.category = category;
	}

	getIcons() {
		return this.icons;
	}

	getIcon() {
		return this.icons.find((element) => element.title === this.category);
	}

	getIsHovered() {
		return this.isHovered;
	}

	setIsHovered(isHovered) {
		this.isHovered = isHovered;
	}
}

export default CategoryModel;
