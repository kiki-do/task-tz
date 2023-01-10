import type { FC } from "react";
import classes from "./Skeleton.module.scss";

export interface SkeletonProps {}

import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = (props: any) => (
	<ContentLoader
		speed={2}
		width={368}
		height={158}
		viewBox="0 0 368 158"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="95" cy="54" r="49" />
		<rect x="238" y="15" rx="10" ry="10" width="93" height="20" />
		<rect x="238" y="55" rx="9" ry="9" width="95" height="20" />
		<rect x="213" y="106" rx="4" ry="4" width="57" height="28" />
		<rect x="289" y="106" rx="6" ry="6" width="79" height="29" />
		<rect x="63" y="110" rx="10" ry="10" width="64" height="22" />
	</ContentLoader>
);
