export const getItemsFromLS = () => {
	const items = localStorage.getItem("items");
	return items ? JSON.parse(items) : [];
};
