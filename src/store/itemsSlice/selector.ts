import { RootState } from "./../store";

export const itemsSelector = (state: RootState) => state.items;

export const searchSelector = (state: RootState) => state.items.search;
