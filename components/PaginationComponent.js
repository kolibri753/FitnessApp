import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

const PaginationComponent = ({
	page,
	totalPages,
	handlePrevPage,
	handleNextPage,
	setPage,
}) => {
	const getPageNumbers = () => {
		const pageNumbers = [];
		const MAX_VISIBLE_PAGES = 5;

		if (totalPages <= MAX_VISIBLE_PAGES) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(renderPageNumber(i));
			}
		} else if (page <= Math.ceil(MAX_VISIBLE_PAGES / 2)) {
			for (let i = 1; i <= MAX_VISIBLE_PAGES; i++) {
				pageNumbers.push(renderPageNumber(i));
			}
		} else if (page >= totalPages - Math.floor(MAX_VISIBLE_PAGES / 2)) {
			for (let i = totalPages - MAX_VISIBLE_PAGES + 1; i <= totalPages; i++) {
				pageNumbers.push(renderPageNumber(i));
			}
		} else {
			for (
				let i = page - Math.floor(MAX_VISIBLE_PAGES / 2);
				i <= page + Math.floor(MAX_VISIBLE_PAGES / 2);
				i++
			) {
				pageNumbers.push(renderPageNumber(i));
			}
		}

		return pageNumbers;
	};

	const renderPageNumber = (pageNumber) => (
		<TouchableOpacity
			key={pageNumber}
			style={[
				styles.paginationButton,
				page === pageNumber && styles.activePaginationButton,
			]}
			onPress={() => setPage(pageNumber)}
		>
			<Text
				style={[
					styles.paginationButtonText,
					page === pageNumber && styles.activePaginationButtonText,
				]}
			>
				{pageNumber}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.pagination}>
			<View style={styles.paginationButtons}>
				<TouchableOpacity
					style={[styles.paginationButton, page === 1 && styles.disabledButton]}
					onPress={handlePrevPage}
					disabled={page === 1}
				>
					<Text style={styles.paginationButtonText}>{"<"}</Text>
				</TouchableOpacity>
				{getPageNumbers()}
				<TouchableOpacity
					style={[
						styles.paginationButton,
						page === totalPages && styles.disabledButton,
					]}
					onPress={handleNextPage}
					disabled={page === totalPages}
				>
					<Text style={styles.paginationButtonText}>{">"}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	pagination: {
		height: 60,
		backgroundColor: colors.black,
		justifyContent: "center",
    marginBottom: 40,
	},
	paginationButtons: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	paginationButton: {
		backgroundColor: colors.white,
		padding: 10,
		marginHorizontal: 5,
		borderRadius: 5,
	},
	paginationButtonText: {
		color: colors.text,
		fontSize: 16,
	},
	activePaginationButton: {
		backgroundColor: colors.primary,
	},
	activePaginationButtonText: {
		color: colors.white,
	},
	disabledButton: {
		opacity: 0.5,
	},
});

export default PaginationComponent;
