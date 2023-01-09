import { useState } from "react";
import type { FC } from "react";

import classes from "./Search.module.scss";

export const Search: FC = () => {
	return <input className={classes.wrapper} type="text" />;
};
