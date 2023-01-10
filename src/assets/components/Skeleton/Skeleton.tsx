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
		<circle cx="73" cy="58" r="58" />
		<rect x="238" y="15" rx="10" ry="10" width="93" height="20" />
		<rect x="238" y="55" rx="9" ry="9" width="95" height="20" />
		<rect x="223" y="95" rx="4" ry="4" width="58" height="26" />
		<rect x="296" y="95" rx="6" ry="6" width="69" height="27" />
		<rect x="42" y="126" rx="10" ry="10" width="64" height="22" />
	</ContentLoader>
);
