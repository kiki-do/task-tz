export const getCartFromLS = () => {
	const items = localStorage.getItem("items");
	return items ? JSON.parse(items) : [];
};
